import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Container from "../../components/Container/Container";
import Header from "../../blocks/Header/Header";
import Footer from "../../blocks/Footer/Footer";

const DashboardLayout = () => {
    return (
        // <div className="">
        //     <Header />
        //     <div className="min-h-screen md:flex">
        //         <div className="w-full md:ml-64">
        //             <Container>
        //             <Sidebar />
        //                 <Outlet />
        //             </Container>
        //         </div>
        //     </div>
        // </div>
        <div className="min-h-screen">
            <Header />
            <Container>
                <Sidebar />
                <div className="min-h-screen md:ml-64 pl-0 md:pl-4 pt-12 relative">
                    <Outlet />
                    <div className="bottom-0">
                        <Footer />
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default DashboardLayout;