import { TbFidgetSpinner } from 'react-icons/tb';
import ThemeButton from '../ThemeButton/ThemeButton';

const Spinner = () => {
    return (
        <div className="min-h-screen w-full bg-white dark:bg-neutral-900 grid place-items-center">
            <TbFidgetSpinner className="text-emerald-500 animate-spin" size={24} />

            <div className='hidden'>
            <ThemeButton/>
            </div>
        </div>
    );
};

export default Spinner;