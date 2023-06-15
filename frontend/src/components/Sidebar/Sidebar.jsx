import { useState } from "react";
import { HiDotsHorizontal, HiX, HiUserGroup, HiCreditCard, HiCollection, HiCursorClick, HiVideoCamera, HiPlusCircle } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAdmin from "../../hooks/useAdmin";
import useInstructor from "../../hooks/useInstructor";

const Sidebar = () => {
    const { user } = useAuth();
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <>
            {/* mobile nav */}
            <div className="z-10 flex items-center justify-between gap-2 md:hidden -ml-4 py-4 fixed top-20 w-full bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700/50">
                <button onClick={() => setShowSidebar(!showSidebar)} className="ml-4 text-xl h-9 w-9 grid place-items-center bg-neutral-100 dark:bg-neutral-700/50 hover:bg-neutral-200  dark:hover:bg-neutral-700/90 text-neutral-500 dark:text-neutral-400 rounded-lg">
                    <HiDotsHorizontal />
                </button>
            </div>
            {/* desktop nav */}
            <div className={`z-50 fixed inset-y-0 left-0 md:left-auto md:mt-[85px] w-64 bg-neutral-50 dark:bg-neutral-800 md:bg-transparent dark:md:bg-transparent overflow-x-hidden transform md:translate-x-0 ${!showSidebar && "-translate-x-full"} transition duration-200 ease-in-out border-r border-neutral-200 dark:border-neutral-700/50`}>
                <div className="p-4 flex flex-col items-center justify-center gap-4 my-4">
                    <div className="w-16 h-16 rounded-full">
                        <img className="w-full h-full object-cover rounded-full" src={user?.photoURL} alt="user avatar" />
                    </div>
                    <h1 className="text-xl text-center font-medium">{user?.displayName}</h1>
                </div>
                <hr className="border border-neutral-200 dark:border-neutral-700/50 mb-4 mx-4" />
                <div className="grid gap-4 p-4">
                    {
                        isAdmin &&
                        <>
                            <NavLink to="/dashboard/admin/manage-classes"
                                className={({ isActive }) => `px-4 py-2 bg-neutral-100 dark:bg-neutral-700/50 hover:bg-neutral-200  dark:hover:bg-neutral-700/90 transition-all text-center text-sm font-medium rounded-lg cursor-pointer flex items-center gap-1 justify-center ${isActive ? "text-emerald-500" : "text-neutral-600 dark:text-neutral-400"}`
                                }>
                                <HiVideoCamera />
                                <span>Manage Classes</span>
                            </NavLink>
                            <NavLink to="/dashboard/admin/manage-users"
                                className={({ isActive }) => `px-4 py-2 bg-neutral-100 dark:bg-neutral-700/50 hover:bg-neutral-200  dark:hover:bg-neutral-700/90 transition-all text-center text-sm font-medium rounded-lg cursor-pointer flex items-center gap-1 justify-center ${isActive ? "text-emerald-500" : "text-neutral-600 dark:text-neutral-400"}`
                                }>
                                <HiUserGroup />
                                <span>Manage Users</span>
                            </NavLink>
                        </>
                        ||
                        isInstructor &&
                        <>
                            <NavLink to="/dashboard/instructor/add-class"
                                className={({ isActive }) => `px-4 py-2 bg-neutral-100 dark:bg-neutral-700/50 hover:bg-neutral-200  dark:hover:bg-neutral-700/90 transition-all text-center text-sm font-medium rounded-lg cursor-pointer flex items-center gap-1 justify-center ${isActive ? "text-emerald-500" : "text-neutral-600 dark:text-neutral-400"}`
                                }>
                                <HiPlusCircle />
                                <span>Add a Class</span>
                            </NavLink>

                            <NavLink to="/dashboard/instructor/my-classes"
                                className={({ isActive }) => `px-4 py-2 bg-neutral-100 dark:bg-neutral-700/50 hover:bg-neutral-200  dark:hover:bg-neutral-700/90 transition-all text-center text-sm font-medium rounded-lg cursor-pointer flex items-center gap-1 justify-center ${isActive ? "text-emerald-500" : "text-neutral-600 dark:text-neutral-400"}`
                                }>
                                <HiVideoCamera />
                                <span>My Classes</span>
                            </NavLink>
                        </>
                        || !isAdmin && !isInstructor &&
                        <>
                            <NavLink to="/dashboard/student/selected-classes"
                                className={({ isActive }) => `px-4 py-2 bg-neutral-100 dark:bg-neutral-700/50 hover:bg-neutral-200  dark:hover:bg-neutral-700/90 transition-all text-center text-sm font-medium rounded-lg cursor-pointer flex items-center gap-1 justify-center ${isActive ? "text-emerald-500" : "text-neutral-600 dark:text-neutral-400"}`
                                }>
                                <HiCursorClick />
                                <span>My Selected Classes</span>
                            </NavLink>

                            <NavLink to="/dashboard/student/enrolled-classes"
                                className={({ isActive }) => `px-4 py-2 bg-neutral-100 dark:bg-neutral-700/50 hover:bg-neutral-200  dark:hover:bg-neutral-700/90 transition-all text-center text-sm font-medium rounded-lg cursor-pointer flex items-center gap-1 justify-center ${isActive ? "text-emerald-500" : "text-neutral-600 dark:text-neutral-400"}`
                                }>
                                <HiCollection />
                                <span>My Enrolled Classes</span>
                            </NavLink>
                            <NavLink to="/dashboard/student/payment-history"
                                className={({ isActive }) => `px-4 py-2 bg-neutral-100 dark:bg-neutral-700/50 hover:bg-neutral-200  dark:hover:bg-neutral-700/90 transition-all text-center text-sm font-medium rounded-lg cursor-pointer flex items-center gap-1 justify-center ${isActive ? "text-emerald-500" : "text-neutral-600 dark:text-neutral-400"}`
                                }>
                                <HiCreditCard />
                                <span>My Payment History</span>
                            </NavLink>
                        </>

                    }
                </div>
                {/* cros button */}
                <button onClick={() => setShowSidebar(!showSidebar)} className="ml-4 text-xl h-9 w-9 grid place-items-center bg-neutral-100 dark:bg-neutral-700/50 hover:bg-neutral-200  dark:hover:bg-neutral-700/90 text-neutral-500 dark:text-neutral-400 rounded-lg absolute top-4 right-4 md:hidden">
                    <HiX />
                </button>
            </div>
        </>
    );
};

export default Sidebar;