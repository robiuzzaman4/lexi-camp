import { useForm } from "react-hook-form";
import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import saveUser from "../../utilities/saveUser";
import useScroll from "../../hooks/useScroll";


const Register = () => {
    const { userRegister, updateUser } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    // default scroll stop
    useScroll(location.pathname);

    const onSubmit = data => {
        const name = data.name;
        const email = data.email;
        const password = data.password;
        const confirmPassword = data.confirmPassword;
        const photoUrl = data.photoUrl;

        if (password !== confirmPassword) {
            toast.error("Password and Confirm Password should be same!");
            return;
        } else {
            userRegister(email, password)
                .then((result) => {
                    const user = result.user;
                    updateUser(user, name, photoUrl)
                        .then(() => {
                            saveUser(user);
                            toast.success("Register Successfull!");
                            navigate("/");
                        })
                        .catch((error) => { console.log(error.message); })
                })
                .catch((error) => {
                    console.log(error.message);
                })
        }

        // console.log(name, email, password, confirmPassword, photoUrl);
    };

    return (
        <section className="pt-32 pb-16">
            <Container>
                <div className="grid gap-8">
                    <div className="md:w-[360px] mx-auto p-8 bg-white dark:bg-neutral-800/50 rounded-lg shadow grid gap-4">
                        <h1 className="text-center text-2xl font-bold text-emerald-500">Join with us!</h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="w-full grid gap-4">
                            <label className="grid gap-1">
                                <span className="text-sm text-neutral-900 dark:text-neutral-50 font-medium">Name:</span>
                                <input type="text" className="w-full px-4 py-2 text-sm border border-neutral-200 dark:border-neutral-700 focus:border-emerald-500 dark:focus:border-emerald-500 focus:outline-none rounded-lg bg-white dark:bg-neutral-800/50"
                                    {...register("name", { required: true })} />
                                {errors.name?.type === 'required' && <p role="alert" className="text-sm text-red-500">Name is required</p>}
                            </label>
                            <label className="grid gap-1">
                                <span className="text-sm text-neutral-900 dark:text-neutral-50 font-medium">Email:</span>
                                <input type="email" className="w-full px-4 py-2 text-sm border border-neutral-200 dark:border-neutral-700 focus:border-emerald-500 dark:focus:border-emerald-500 focus:outline-none rounded-lg bg-white dark:bg-neutral-800/50"
                                    {...register("email", { required: true })} />
                                {errors.email?.type === 'required' && <p role="alert" className="text-sm text-red-500">Email is required</p>}
                            </label>
                            <label className="grid gap-1">
                                <span className="text-sm text-neutral-900 dark:text-neutral-50 font-medium">Password:</span>
                                <input type="password" className="w-full px-4 py-2 text-sm border border-neutral-200 dark:border-neutral-700 focus:border-emerald-500 dark:focus:border-emerald-500 focus:outline-none rounded-lg bg-white dark:bg-neutral-800/50"
                                    {...register("password", {
                                        required: true,
                                        minLength: 6,
                                        pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/
                                    })} />
                                {errors.password?.type === 'required' && <p role="alert" className="text-sm text-red-500">Password is required</p>}
                                {errors.password?.type === 'minLength' && <p role="alert" className="text-sm text-red-500">Password must be 6 characters</p>}
                                {errors.password?.type === 'pattern' && <p role="alert" className="text-sm text-red-500">Password must have one uppercase and one special character.</p>}
                            </label>
                            <label className="grid gap-1">
                                <span className="text-sm text-neutral-900 dark:text-neutral-50 font-medium">Confirm Password:</span>
                                <input type="password" className="w-full px-4 py-2 text-sm border border-neutral-200 dark:border-neutral-700 focus:border-emerald-500 dark:focus:border-emerald-500 focus:outline-none rounded-lg bg-white dark:bg-neutral-800/50"
                                    {...register("confirmPassword", { required: true })} />
                                {errors.confirmPassword?.type === 'required' && <p role="alert" className="text-sm text-red-500">Confirm Password is required</p>}
                            </label>
                            <label className="grid gap-1">
                                <span className="text-sm text-neutral-900 dark:text-neutral-50 font-medium">Photo Url:</span>
                                <input type="text" className="w-full px-4 py-2 text-sm border border-neutral-200 dark:border-neutral-700 focus:border-emerald-500 dark:focus:border-emerald-500 focus:outline-none rounded-lg bg-white dark:bg-neutral-800/50"
                                    {...register("photoUrl", { required: true })} />
                                {errors.photoUrl?.type === 'required' && <p role="alert" className="text-sm text-red-500">Photo Url is required</p>}
                            </label>
                            <Button type="submit">Register Now</Button>
                        </form>
                        <p className="text-sm font-medium text-neutral-500">Already have an account? <Link to="/login" className="text-emerald-500">Login Now</Link> </p>
                        <p className="text-sm text-center font-medium text-neutral-500">- Or -</p>
                        <SocialLogin />
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Register;