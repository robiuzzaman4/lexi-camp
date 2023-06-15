import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { TbFidgetSpinner } from "react-icons/tb"
import useStudent from "../hooks/useStudent";

const StudentRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isStudent, isStudentLoading] = useStudent();
    const location = useLocation();

    if (loading || isStudentLoading) {
        return <div className="min-h-screen  bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-50 grid place-items-center">
            <TbFidgetSpinner className="text-emerald-500 animate-spin" size={24} />
        </div>
    }

    if (user && isStudent) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>
};

export default StudentRoute;