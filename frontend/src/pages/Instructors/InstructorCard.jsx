import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { motion } from "framer-motion";

const InstructorCard = ({ instructor }) => {
    const { name, email, photo } = instructor;
    return (
        <motion.div
            initial={{ opacity: 0, scale: .5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-neutral-800/50 grid place-items-center gap-4 p-8 shadow group rounded-lg">
            <div className="overflow-hidden shadow rounded-tl-2xl rounded-br-2xl">
                <div className="group-hover:scale-110 transition-transform duration-300">
                    <LazyLoadImage effect='blur' className="w-32 h-32 object-cover rounded-tl-2xl rounded-br-2xl" src={photo} alt="" />
                </div>
            </div>
            <div className="grid gap-2 text-sm ">
                <h3 className="text-neutral-900 dark:text-neutral-50">{name}</h3>
                <h3 className="text-neutral-600 dark:text-neutral-400">Email: {email}</h3>
            </div>
        </motion.div>
    );
};

export default InstructorCard;