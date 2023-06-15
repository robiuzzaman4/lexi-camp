import Button from "../../../../components/Button/Button";
import { useForm } from "react-hook-form";
import { HiX } from "react-icons/hi";
import { Link, useParams } from "react-router-dom";
import useManageClasses from "../../../../hooks/useManageClasses";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

const Feedback = () => {
    const { id } = useParams();
    const [classes] = useManageClasses();
    const { axiosSecure } = useAxiosSecure();
    const feedbackClass = classes.find((selectedClass) => selectedClass._id === id);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const feedbackMessage = data.feedback;
        const instructorEmail = feedbackClass.instructorEmail

        axiosSecure.patch(`/admin/manage-classes/give-feedback/${id}/${instructorEmail}`, { feedbackMessage })
            .then((res) => {
                if (res.data.modifiedCount > 0) {
                    toast.success("Thank you for giving feedback");
                    reset();
                }
            })
    }

    return (
        <section className="pt-16 pb-32">
            <motion.div
                animate={{
                    x: 0,
                    y: 50,
                    scale: 1,
                    rotate: 0,
                }}
                className="md:w-[360px] mx-auto p-8 bg-white dark:bg-neutral-800/50 rounded-lg shadow grid gap-4 relative">
                <h1 className="text-center text-2xl font-bold text-emerald-500">Write Feedback</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full grid gap-4">
                    <label className="grid gap-1">
                        <span className="text-sm text-neutral-900 dark:text-neutral-50 font-medium">Message:</span>
                        <textarea placeholder="Too much price! Please decrease this." type="text" className="w-full px-4 py-2 text-sm border border-neutral-200 dark:border-neutral-700 focus:border-emerald-500 dark:focus:border-emerald-500 focus:outline-none rounded-lg bg-white dark:bg-neutral-800/50"
                            {...register("feedback", { required: true })} />
                        {errors.feedback?.type === 'required' && <p role="alert" className="text-sm text-red-500">Feedback message is required</p>}
                    </label>
                    <Button size="sm" type="submit">Give Feedback</Button>
                </form>

                {/* close button */}
                <Link to="/dashboard/admin/manage-classes">
                    <button className="absolute top-4 right-4 p-2 rounded-full bg-neutral-100 dark:bg-neutral-700/50 hover:bg-neutral-200  dark:hover:bg-neutral-700/90 text-neutral-500 dark:text-neutral-400 w-fit">
                        <HiX size={16} />
                    </button>
                </Link>
            </motion.div >
        </section>
    );
};

export default Feedback;