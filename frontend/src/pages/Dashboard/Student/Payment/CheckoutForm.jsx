import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useState } from "react";
import useAuth from "../../../../hooks/useAuth";

const CheckoutForm = ({ price, paymentClass, setPaymentStatus }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const { axiosSecure } = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState("");
    const [processing, setProcessing] = useState(false)

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post("/create-payment-intent", { price })
                .then((res) => {
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [price, axiosSecure]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card
        })

        if (error) {
            console.log('[error]', error);
            toast.error(error.message);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }

        setProcessing(true);

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || "anonymous",
                        email: user?.email || "unknown"
                    },
                },
            },
        );

        if (confirmError) {
            console.log(confirmError);
        }

        console.log('[PaymentIntent]', paymentIntent);

        setProcessing(false);

        if (paymentIntent.status === "succeeded") {
            const payment = {
                email: user?.email,
                transactionID: paymentIntent.id,
                price,
                className: paymentClass.className,
                classPhoto: paymentClass.classPhoto,
                createdAt: new Date()
            }

            // save payment data
            axiosSecure.post("/payments", payment)
                .then((res) => {
                    console.log("payments data: ", res.data);

                    // update payment status
                    axiosSecure.patch(`/users/my-selected-classes/${user?.email}`)
                        .then((res) => {
                            console.log("payment status update: ", res.data);

                            // update available seats and total enrolled
                            const updatedSeats = paymentClass?.availableSeats - 1;
                            const updatedEnroll = paymentClass?.totalStudent + 1;
                            const updatedClassInfo = {
                                availableSeats: updatedSeats,
                                totalStudent: updatedEnroll
                            }
                            // for classCOllection
                            axiosSecure.put(`/users/update-class/${paymentClass?.classId}`, updatedClassInfo)
                                .then((res) => {
                                    console.log("update seat and total enroll", res.data);
                                })
                            // for selectedClassCOllection
                            axiosSecure.put(`/users/update-my-selectedClass/${paymentClass?._id}`, updatedClassInfo)
                                .then((res) => {
                                    console.log("update seat and total enroll", res.data);
                                })

                            toast.success(`Payment Successfull`);
                            setPaymentStatus(true);
                        })
                })
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#fafafa',
                            '::placeholder': {
                                color: '#737373',
                            },
                        },
                        invalid: {
                            color: '#ef4444',
                        },
                    },
                }}
            />
            <button className="px-2 py-1 rounded-lg bg-emerald-500 text-white mt-4 w-full" type="submit" disabled={!stripe || !clientSecret || processing}>
                Pay
            </button>
        </form>
    );
};

export default CheckoutForm;