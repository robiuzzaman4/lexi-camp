import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { motion } from "framer-motion";

const MyEnrolledClassesCard = ({ myEnrolledClass }) => {
    const { className, classPhoto, instructorName, price } = myEnrolledClass;
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-neutral-800/50 p-4 rounded-lg grid gap-4 shadow">
            <LazyLoadImage effect='blur' className="rounded-lg" src={classPhoto} alt="" />
            <div className="grid gap-1.5 text-neutral-600 dark:text-neutral-400">
                <h3 className="font-medium text-neutral-900 dark:text-neutral-50">{className}</h3>
                <p className="text-sm">Instructor Name: {instructorName}</p>
                <p className="text-sm">Price: ${price}</p>
            </div>
        </motion.div>
    );
};

export default MyEnrolledClassesCard;