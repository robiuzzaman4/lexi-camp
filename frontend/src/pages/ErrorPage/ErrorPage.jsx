import { Link } from "react-router-dom";
import img from "../../assets/img/errorPage.jpg"
import Button from "../../components/Button/Button";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

const ErrorPage = () => {
    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex flex-col items-center justify-center">
            <LazyLoadImage effect="blur" className="w-full md:w-1/3 mx-auto" src={img} alt="" />
            <Link to="/">
                <Button size="sm">
                    Back to Home
                </Button>
            </Link>
        </div>
    );
};

export default ErrorPage;