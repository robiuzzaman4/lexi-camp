import { Link } from "react-router-dom";
import Button from "../../../../components/Button/Button";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useMySelectedClasses from "../../../../hooks/useMySelectedClasses";
import { toast } from "react-hot-toast"
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { motion } from "framer-motion";

const MySelectedClassesCard = ({ mySelectedClass }) => {
    const { user } = useAuth();
    const { axiosSecure } = useAxiosSecure();
    const [, refetch] = useMySelectedClasses();
    const { _id, className, classPhoto, instructorName, price } = mySelectedClass;

    const handleDelete = (_id) => {
        axiosSecure.delete(`/users/my-selected-classes/${_id}/${user?.email}`)
            .then((res) => {
                console.log(res.data);
                refetch();
                toast.success("Successfully deleted from selected classes!");
            })
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: .5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-neutral-800/50 p-4 rounded-lg grid gap-4 shadow">
            <LazyLoadImage effect='blur' className="rounded-lg" src={classPhoto} alt="" />
            <div className="grid gap-1.5 text-neutral-600 dark:text-neutral-400">
                <h3 className="font-medium text-neutral-900 dark:text-neutral-50">{className}</h3>
                <p className="text-sm">Instructor Name: {instructorName}</p>
                <p className="text-sm">Price: ${price}</p>
                <div className="grid grid-cols-2 gap-2">
                    <Button onClick={() => handleDelete(_id)} size="sm" color="red" fullwidth={true}>Delete</Button>
                    <Link to={`/dashboard/student/payment/${_id}`}>
                        <Button size="sm" fullwidth={true}>
                            Pay Now
                        </Button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default MySelectedClassesCard;