import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import saveUser from "../../utilities/saveUser";

const SocialLogin = () => {
    const { googleLogin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleGoogleLogin = () => {
        googleLogin()
            .then((result) => {
                const user = result.user;
                saveUser(user);
                toast.success("Login Successfull!");
                navigate(from, { replace: true });
            })
            .catch((error) => {
                console.log(error);
            })
    }
    return (
        <button onClick={handleGoogleLogin} className="w-full px-4 py-2 rounded-lg bg-white dark:bg-neutral-800 shadow flex items-center justify-center gap-2">
            <img className="w-5 h-5" src="/google.svg" alt="google svg logo" />
            <span>Login with Google</span>
        </button>
    );
};

export default SocialLogin;