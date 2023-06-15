import { Outlet } from "react-router-dom";
import Header from "../../blocks/Header/Header";
import Footer from "../../blocks/Footer/Footer";

const Main = () => {
    return (
        <>
            <Header />
            <div className="min-h-screen">
                <Outlet />
            </div>
            <Footer />
        </>
    );
};

export default Main;