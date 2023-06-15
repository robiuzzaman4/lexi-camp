import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useInstructor from "../hooks/useInstructor";
import { TbFidgetSpinner } from "react-icons/tb"

const InstructorRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isInstructor, isInstructorLoading] = useInstructor();
    const location = useLocation();

    if (loading || isInstructorLoading) {
        return <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-50 grid place-items-center">
            <TbFidgetSpinner className="text-emerald-500 animate-spin" size={24} />
        </div>
    }

    if (user && isInstructor) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>
};

export default InstructorRoute;