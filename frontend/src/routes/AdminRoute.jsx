import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";
import { TbFidgetSpinner } from "react-icons/tb"

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [ isAdmin, isAdminLoading ] = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <div className="min-h-screen  bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-50 grid place-items-center">
            <TbFidgetSpinner className="text-emerald-500 animate-spin" size={24} />
        </div>
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>
};

export default AdminRoute;