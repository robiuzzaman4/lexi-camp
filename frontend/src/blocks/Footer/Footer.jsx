import Container from "../../components/Container/Container";
import { HiOutlineTranslate } from "react-icons/hi";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
const Footer = () => {
    return (
        <footer className="border-t border-neutral-200 dark:border-neutral-700/50">
            <Container>
                <div className="py-10 flex flex-col md:flex-row items-start justify-between gap-8">
                    {/* logo and social */}
                    <div className="grid gap-4">
                        {/* logo */}
                        <div className='flex items-center'>
                            <div className="font-semibold flex items-center gap-2">
                                <span className='h-6 w-6 grid place-items-center rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-400'>
                                    <HiOutlineTranslate className="text-white text-sm" />
                                </span>
                                <span>Lexi Camp</span>
                            </div>
                        </div>
                        {/* social */}
                        <div className="flex items-center gap-2">
                            <button className="text-sm h-7 w-7 grid place-items-center bg-neutral-100 dark:bg-neutral-700/50 hover:bg-neutral-200  dark:hover:bg-neutral-700/90 text-neutral-500 dark:text-neutral-400 rounded-full">
                                <FaFacebook />
                            </button>
                            <button className="text-sm h-7 w-7 grid place-items-center bg-neutral-100 dark:bg-neutral-700/50 hover:bg-neutral-200  dark:hover:bg-neutral-700/90 text-neutral-500 dark:text-neutral-400 rounded-full">
                                <FaTwitter />
                            </button>
                            <button className="text-sm h-7 w-7 grid place-items-center bg-neutral-100 dark:bg-neutral-700/50 hover:bg-neutral-200  dark:hover:bg-neutral-700/90 text-neutral-500 dark:text-neutral-400 rounded-full">
                                <FaInstagram />
                            </button>
                            <button className="text-sm h-7 w-7 grid place-items-center bg-neutral-100 dark:bg-neutral-700/50 hover:bg-neutral-200  dark:hover:bg-neutral-700/90 text-neutral-500 dark:text-neutral-400 rounded-full">
                                <FaLinkedin />
                            </button>
                        </div>
                    </div>
                    {/* navigate */}
                    <div className="grid gap-2 text-sm font-medium text-neutral-600 dark:text-neutral-400">
                        <p>Navigate:</p>
                        <Link to="/instructors">
                            Instructors
                        </Link>
                        <Link to="/classes">
                            Classes
                        </Link>
                    </div>
                    {/* contact */}
                    <div className="text-sm font-medium text-neutral-600 dark:text-neutral-400 grid gap-1">
                        <p>Contact:</p>
                        <p>Email: lexicamp@mail.com</p>
                        <p>Phone: ++801000007004</p>
                    </div>
                </div>
                {/* copyright */}
                <div className="text-xs font-medium text-neutral-600 dark:text-neutral-400 text-center py-4">
                    All right reserved Lexi Camp. Copyright & © 2023.
                </div>
            </Container>
        </footer>
    );
};

export default Footer;