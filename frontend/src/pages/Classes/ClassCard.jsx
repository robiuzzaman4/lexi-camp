import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { motion } from "framer-motion";

const ClassCard = ({ singleClass }) => {
    const [disabled, setDisabled] = useState(false);
    const [users, setUsers] = useState([]);
    const { user } = useAuth();
    const { axiosSecure } = useAxiosSecure();
    const navigate = useNavigate();

    // get all users
    useEffect(() => {
        axios.get("https://lexi-camp-server.vercel.app/users")
            .then((res) => {
                setUsers(res.data);
            })
    }, []);
    const admin = users.find((currentUser) => currentUser.email === user?.email && currentUser.role === "admin");
    const instructor = users.find((currentUser) => currentUser.email === user?.email && currentUser.role === "instructor");

    const { _id, className, classPhoto, instructorName, instructorEmail, availableSeats, price, totalStudent } = singleClass;

    // disable enroll btn conditionally
    useEffect(() => {
        if (admin || instructor || availableSeats === 0) {
            setDisabled(true);
        }
    }, [admin, instructor, availableSeats]);


    const handleAddToEnroll = (_id) => {
        if (user && user?.email) {
            const selectedClass = {
                classId: _id,
                className,
                classPhoto,
                instructorName,
                instructorEmail,
                availableSeats,
                price,
                totalStudent,
                studentEmail: user?.email,
                studentName: user?.displayName,
                paymentStatus: "pending"
            }
            axiosSecure.post(`https://lexi-camp-server.vercel.app/users/my-selected-classes/${user?.email}`, selectedClass)
                .then((res) => {
                    console.log(res.data);
                    if (res.data.insertedId) {
                        toast.success("Successfully added to enroll.");
                    }
                    if (res.data.message === "You can't enroll multiple time in one class!") {
                        toast.error("You can't enroll multiple time in one class!");
                    }
                })
        } else {
            toast.error("You need to Login first!");
            navigate("/login");
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={`bg-white dark:bg-neutral-800/50 p-4 rounded-lg grid gap-4 shadow ${availableSeats === 0 && "bg-red-400"}`}>
            <LazyLoadImage effect='blur' className="rounded-lg" src={classPhoto} alt="" />
            <div className="grid gap-1.5 text-neutral-600 dark:text-neutral-400">
                <h3 className="font-medium text-neutral-900 dark:text-neutral-50">{className}</h3>
                <p className="text-sm">Instructor Name: {instructorName}</p>
                <p className="text-sm">Instructor Email: {instructorEmail}</p>
                <p className="text-sm">Total Enrolled: {totalStudent}</p>
                <p className="text-sm">Available Seats: {availableSeats}</p>
                <p className="text-sm">Price: ${price}</p>
                <Button size="sm" disabled={disabled} onClick={() => handleAddToEnroll(_id)}>
                    Enroll Now
                </Button>
            </div>
        </motion.div>
    );
};

export default ClassCard;