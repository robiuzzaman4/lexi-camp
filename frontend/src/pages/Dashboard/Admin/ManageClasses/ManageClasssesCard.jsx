import { useEffect, useState } from "react";
import Button from "../../../../components/Button/Button";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useManageClasses from "../../../../hooks/useManageClasses";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { motion } from "framer-motion";

const ManageClasssesCard = ({ singleClass }) => {
    const [disable, setDisable] = useState(false);
    const [, refetch] = useManageClasses();
    const { axiosSecure } = useAxiosSecure();
    const { _id, className, classPhoto, instructorName, instructorEmail, availableSeats, price, status } = singleClass;

    const handleApprove = (_id) => {
        axiosSecure.patch(`/admin/manage-classes/approved/${_id}`)
            .then((res) => {
                if (res.data.modifiedCount > 0) {
                    toast.success("Approved this class successfully!");
                    refetch();
                    setDisable(true);
                }
            })
    }

    const handleDeny = (_id) => {
        axiosSecure.patch(`/admin/manage-classes/denied/${_id}`)
            .then((res) => {
                if (res.data.modifiedCount > 0) {
                    toast.success("Denied this class successfully!");
                    refetch();
                    setDisable(true);
                }
            })
    }

    useEffect(() => {
        if (status === "approved" || status === "denied") {
            setDisable(true);
        }
    }, [status]);

    return (
        <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
            className="bg-white dark:bg-neutral-800/50  p-4 rounded-lg grid gap-4 shadow">
            <LazyLoadImage effect='blur' className="rounded-lg" src={classPhoto} alt="" />
            <div className="grid gap-1.5 text-neutral-600 dark:text-neutral-400">
                <h3 className="font-medium text-neutral-900 dark:text-neutral-50">{className}</h3>
                <p className="text-sm">Instructor Name: {instructorName}</p>
                <p className="text-sm">Instructor Email: {instructorEmail}</p>
                <p className="text-sm">Available Seats: {availableSeats}</p>
                <p className="text-sm">Price: ${price}</p>
                <div className="text-sm flex items-center gap-2">
                    <span>Status:</span>
                    <button className={`text-xs px-2 py-1 rounded-full text-white ${status === "pending" && "bg-yellow-500" ||
                        status === "approved" && "bg-emerald-500" ||
                        status === "denied" && "bg-red-500"
                        }`}>{status}</button>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <span>Actions:</span>
                    <div className="flex items-center gap-2">
                        <button onClick={() => handleApprove(_id)} disabled={disable} className={`text-xs px-2 py-1 rounded-full text-white bg-emerald-500 ${disable && "opacity-25"}`}>
                            Approve
                        </button>
                        <button onClick={() => handleDeny(_id)} disabled={disable} className={`text-xs px-2 py-1 rounded-full text-white bg-red-500 ${disable && "opacity-25"}`}>
                            Deny
                        </button>
                    </div>
                </div>
                <Link to={`/dashboard/admin/give-feedback/${_id}`} className="mt-4">
                    <Button size="sm">
                        Send Feedback
                    </Button>
                </Link>
            </div>
        </motion.div>
    );
};

export default ManageClasssesCard;