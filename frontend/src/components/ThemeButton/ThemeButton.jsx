import { useEffect } from "react";
import { useState } from "react";
import { HiSun, HiMoon } from "react-icons/hi";

const ThemeButton = () => {
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem('darkMode') === 'true'
    );

    useEffect(() => {
        localStorage.setItem("darkMode", darkMode);
        const html = document.querySelector('html');
        if (darkMode) {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    }

    return (
        <button onClick={toggleDarkMode}
        className="h-9 w-9 grid place-items-center bg-neutral-100 dark:bg-neutral-700/50 hover:bg-neutral-200  dark:hover:bg-neutral-700/90 text-neutral-500 dark:text-neutral-400 rounded-lg">
            {darkMode
                ? <HiSun />
                : <HiMoon />}
        </button>
    );
};

export default ThemeButton;