import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import Container from "../../components/Container/Container";
import { HiOutlineTranslate, HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import Button from "../../components/Button/Button";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import useAdmin from "../../hooks/useAdmin";
import useInstructor from "../../hooks/useInstructor";
import ThemeButton from "../../components/ThemeButton/ThemeButton";


const Header = () => {
    const { user, userLogout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const [ isAdmin ] = useAdmin();
    const [ isInstructor ] = useInstructor();
    const navigate = useNavigate();
    const handleLogout = () => {
        userLogout()
            .then(() => {
                toast.success("Logout Successfull!");
                navigate("/");
            })
            .catch((error) => {
                console.log(error.message);
            })
    }

    return (
        <header className="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700/50 fixed top-0 w-full z-50">
            <Container>
                <nav className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 relative">
                    <div className='flex items-center'>
                        <Link to='/'>
                            <div className="text-xl font-semibold flex items-center gap-2">
                                <span className='h-9 w-9 grid place-items-center rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-400'>
                                    <HiOutlineTranslate className="text-neutral-50 " />
                                </span>
                                <span>Lexi Camp</span>
                            </div>
                        </Link>
                    </div>
                    <div className={`md:flex flex-col md:flex-row md:items-center gap-4 font-medium text-sm text-neutral-500 ${!menuOpen ? 'hidden' : 'flex'}`}>
                        <NavLink
                            to='/'
                            className={({ isActive }) =>
                                isActive ? 'text-emerald-500' : ''
                            }>
                            Home
                        </NavLink>
                        <NavLink
                            to='/instructors'
                            className={({ isActive }) =>
                                isActive ? 'text-emerald-500' : ''
                            }>
                            Instructors
                        </NavLink>
                        <NavLink
                            to='/classes'
                            className={({ isActive }) =>
                                isActive ? 'text-emerald-500' : ''
                            }>
                            Classes
                        </NavLink>
                        {
                            user ?
                                <>
                                    <>
                                        {
                                            isAdmin && <NavLink
                                                to="/dashboard/admin/manage-classes"
                                                className={({ isActive }) =>
                                                    isActive ? 'text-emerald-500' : ''
                                                }>
                                                Dashboard
                                            </NavLink>
                                            ||
                                            isInstructor && <NavLink
                                                to="/dashboard/instructor/add-class"
                                                className={({ isActive }) =>
                                                    isActive ? 'text-emerald-500' : ''
                                                }>
                                                Dashboard
                                            </NavLink>
                                            || !isAdmin && !isInstructor && <NavLink
                                                to="/dashboard/student/selected-classes"
                                                className={({ isActive }) =>
                                                    isActive ? 'text-emerald-500' : ''
                                                }>
                                                Dashboard
                                            </NavLink>
                                        }
                                    </>
                                    <div className="w-9 h-9 rounded-full">
                                        <img className="w-full h-full object-cover rounded-full" src={user?.photoURL} alt="" />
                                    </div>
                                    <div className="mt-2 md:mt-0">
                                        <Button onClick={handleLogout} fullwidth color="red" size="sm">Log Out</Button>
                                    </div>
                                </>
                                :
                                <>
                                    <Link to="/login" className="mt-2 md:mt-0">
                                        <Button fullwidth>Login</Button>
                                    </Link>

                                </>
                        }


                    </div>
                    <div onClick={() => setMenuOpen(!menuOpen)} className="md:hidden absolute top-6 right-4 text-xl cursor-pointer h-9 w-9 grid place-items-center bg-neutral-100 dark:bg-neutral-700/50 hover:bg-neutral-200  dark:hover:bg-neutral-700/90 text-neutral-500 dark:text-neutral-400 rounded-lg">
                        {
                            !menuOpen ? <HiOutlineMenu /> : <HiOutlineX />
                        }
                    </div>

                    {/* theme button */}
                    <div className="absolute md:static top-6 right-16 ">
                        <ThemeButton className="h-full w-full"/>
                    </div>
                </nav>
            </Container>
        </header>
    );
};

export default Header;