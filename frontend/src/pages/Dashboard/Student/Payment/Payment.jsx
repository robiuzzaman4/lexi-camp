import { Link, useParams } from "react-router-dom";
import useMySelectedClasses from "../../../../hooks/useMySelectedClasses";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useState } from "react";
import Button from "../../../../components/Button/Button";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import useScroll from "../../../../hooks/useScroll";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GETWAY_PK);

const Payment = () => {
    const [mySelectedClasses] = useMySelectedClasses();
    const { id } = useParams();
    const paymentClass = mySelectedClasses.find((selectedClass) => selectedClass._id === id);
    const price = Number(paymentClass?.price.toFixed(2));
    const [paymetStatus, setPaymentStatus] = useState(false);

    // default scroll stop
    useScroll(location.pathname);


    return (
        <div className="py-32 md:py-16 w-full">
            {
                paymetStatus ?
                    <>
                        <div className="flex flex-col items-center pt-8">
                            <h1 className="text-center text-2xl font-bold text-emerald-500 mb-8">Your payment is successfull!</h1>
                            <Link to="/dashboard/student/payment-history">
                                <Button size="sm">See Payment History</Button>
                            </Link>
                        </div>
                    </>
                    :
                    <>
                        <div className="py-32 md:py-16 w-full" >
                            {/* class info */}
                            <div className="bg-white dark:bg-neutral-800/50 p-4 rounded-lg shadow max-w-sm mx-auto flex flex-col md:flex-row md:justify-between gap-2" >
                                <LazyLoadImage effect='blur' className="w-32 rounded-lg" src={paymentClass?.classPhoto} alt="" />
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-neutral-900 dark:text-neutral-50 font-medium">{paymentClass?.className}</h3>
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Price:
                                        <span className="text-emerald-500 "> ${paymentClass?.price} </span></p>
                                </div>
                            </div>

                            {/* payment info */}
                            <div className="max-w-sm mx-auto mt-20 p-4 bg-white dark:bg-neutral-800/50 shadow rounded-lg" >
                                <Elements stripe={stripePromise}>
                                    <CheckoutForm price={price} paymentClass={paymentClass}
                                        setPaymentStatus={setPaymentStatus}></CheckoutForm>
                                </Elements>
                            </div>
                        </div >
                    </>
            }
        </div>
    );
};

export default Payment;

// {
//      "skdfj" : 'sdofjlskd'
// }