import { useForm } from "react-hook-form";
import Button from "../../../../components/Button/Button";
import useAuth from "../../../../hooks/useAuth";
import axios from "axios";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import useScroll from "../../../../hooks/useScroll";

const AddClass = () => {
    const { user } = useAuth();
    const { axiosSecure } = useAxiosSecure();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // default scroll stop
    useScroll(location.pathname);

    const onSubmit = data => {
        const className = data.className;
        const instructorName = data.instructorName;
        const instructorEmail = data.instructorEmail;
        const availableSeats = Number(data.availableSeats);
        const price = Number(data.price);

        const photo = data.photo[0];
        const formData = new FormData();
        formData.append("image", photo);

        const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_API_KEY}`;

        axios.post(url, formData)
            .then((res) => {
                const classPhoto = res.data.data.display_url;
                const newClass = {
                    className,
                    classPhoto,
                    instructorName,
                    instructorEmail,
                    availableSeats,
                    price,
                    status: "pending",
                    totalStudent: 0,
                    feedback: ""
                }

                axiosSecure.post("/instructor/add-classes", newClass)
                    .then((res) => {
                        if (res.data.insertedId) {
                            toast.success("Successfully Added New Class");
                            reset();
                        }
                    })
            })
    };

    return (
        <div className="py-32 md:py-16 w-full">
            <h1 className="text-center text-2xl font-bold text-emerald-500 mb-8">Add a Class</h1>

            <div className="w-full">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full grid gap-4">
                    {/* class name and picture */}
                    <div className="grid lg:grid-cols-2 gap-4">
                        <label className="grid gap-1">
                            <span className="text-sm text-neutral-900 dark:text-neutral-50 font-medium">Class Name:</span>
                            <input type="text" placeholder="Learn English Language" className="w-full px-4 py-2 text-sm border border-neutral-200 dark:border-neutral-700 focus:border-emerald-500 dark:focus:border-emerald-500 focus:outline-none rounded-lg bg-white dark:bg-neutral-800/50"
                                {...register("className", { required: true })} />
                            {errors.className?.type === 'required' && <p role="alert" className="text-sm text-red-500">Class Name is required</p>}
                        </label>
                        <label className="grid gap-1 relative">
                            <span className="text-sm text-neutral-900 dark:text-neutral-50 font-medium">Class Picture:</span>
                            <div className="border border-neutral-200 dark:border-neutral-700 focus:border-emerald-500 dark:focus:border-emerald-500  px-4 py-2 rounded-lg text-xs bg-white dark:bg-neutral-800/50">
                                <input type="file" className="file:outline-none file:border-none file:rounded-lg file:text-xs file:bg-gray-200"  {...register("photo", { required: true })} accept="image/*" />
                                {errors.photo?.type === 'required' && <p role="alert" className="text-sm text-red-500">Photo is required</p>}
                            </div>
                        </label>
                    </div>
                    {/* instructor name and email */}
                    <div className="grid lg:grid-cols-2 gap-4">
                        <label className="grid gap-1">
                            <span className="text-sm text-neutral-900 dark:text-neutral-50 font-medium">Instructor Name:</span>
                            <input type="text" defaultValue={user?.displayName} className="w-full px-4 py-2 text-sm border border-neutral-200 dark:border-neutral-700 focus:border-emerald-500 dark:focus:border-emerald-500 focus:outline-none rounded-lg bg-white dark:bg-neutral-800/50"
                                {...register("instructorName", { required: true })} readOnly />
                        </label>
                        <label className="grid gap-1 relative">
                            <span className="text-sm text-neutral-900 dark:text-neutral-50 font-medium">Instructor Email:</span>
                            <input type="text" defaultValue={user?.email} className="w-full px-4 py-2 text-sm border border-neutral-200 dark:border-neutral-700 focus:border-emerald-500 dark:focus:border-emerald-500 focus:outline-none rounded-lg bg-white dark:bg-neutral-800/50"
                                {...register("instructorEmail", { required: true })} readOnly />
                        </label>
                    </div>
                    {/* available seats and price */}
                    <div className="grid lg:grid-cols-2 gap-4">
                        <label className="grid gap-1">
                            <span className="text-sm text-neutral-900 dark:text-neutral-50 font-medium">Available Seats:</span>
                            <input type="number" placeholder="20" className="w-full px-4 py-2 text-sm border border-neutral-200 dark:border-neutral-700 focus:border-emerald-500 dark:focus:border-emerald-500 focus:outline-none rounded-lg bg-white dark:bg-neutral-800/50"
                                {...register("availableSeats", { required: true })} />
                            {errors.availableSeats?.type === 'required' && <p role="alert" className="text-sm text-red-500">Available Seats is required</p>}
                        </label>
                        <label className="grid gap-1 relative">
                            <span className="text-sm text-gray-800 font-medium">Price:</span>
                            <input type="number" placeholder="$90" className="w-full px-4 py-2 text-sm border border-neutral-200 dark:border-neutral-700 focus:border-emerald-500 dark:focus:border-emerald-500 focus:outline-none rounded-lg bg-white dark:bg-neutral-800/50"
                                {...register("price", { required: true })} />
                            {errors.price?.type === 'required' && <p role="alert" className="text-sm text-red-500">price is required</p>}
                        </label>
                    </div>
                    <Button type="submit">Add Now</Button>
                </form>
            </div>
        </div>
    );
};

export default AddClass;