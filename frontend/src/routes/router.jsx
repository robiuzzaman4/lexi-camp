import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main/Main";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import PrivetRoute from "./PrivetRoute";
import DashboardLayout from "../layout/DashboardLayout/DashboardLayout";
import AdminRoute from "./AdminRoute";
import InstructorRoute from "./InstructorRoute";
import AddClass from "../pages/Dashboard/Instructor/AddClass/AddClass";
import MyClasses from "../pages/Dashboard/Instructor/MyClasses/MyClasses";
import ManageClasses from "../pages/Dashboard/Admin/ManageClasses/ManageClasses";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers/ManageUsers";
import Classes from "../pages/Classes/Classes";
import Instructors from "../pages/Instructors/Instructors";
import MySelectedClasses from "../pages/Dashboard/Student/MySelectedClasses/MySelectedClasses";
import StudentRoute from "./StudentRoute";
import Payment from "../pages/Dashboard/Student/Payment/Payment";
import MyEnrolledClasses from "../pages/Dashboard/Student/MyEnrolledClasses/MyEnrolledClasses";
import MyPaymentHistory from "../pages/Dashboard/Student/MyPaymentHistory/MyPaymentHistory";
import Feedback from "../pages/Dashboard/Admin/ManageClasses/Feedback";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/instructors",
                element: <Instructors />
            },
            {
                path: "/classes",
                element: <Classes />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/login",
                element: <Login />
            }
        ]
    },
    {
        path: "/dashboard",
        element: <PrivetRoute> <DashboardLayout /> </PrivetRoute>,
        errorElement: <ErrorPage/>,
        children: [
            // students routes
            {
                path: "/dashboard/student/selected-classes",
                element: <StudentRoute> <MySelectedClasses /> </StudentRoute>
            },
            {
                path: "/dashboard/student/payment/:id",
                element: <StudentRoute> <Payment/> </StudentRoute>
            },
            {
                path: "/dashboard/student/enrolled-classes",
                element: <StudentRoute> <MyEnrolledClasses/> </StudentRoute>
            },
            {
                path: "/dashboard/student/payment-history",
                element: <StudentRoute> <MyPaymentHistory/> </StudentRoute>
            },
            // instructors routes
            {
                path: "/dashboard/instructor/add-class",
                element: <InstructorRoute> <AddClass /> </InstructorRoute>
            },
            {
                path: "/dashboard/instructor/my-classes",
                element: <InstructorRoute> <MyClasses /> </InstructorRoute>
            },
            // admin routes
            {
                path: "/dashboard/admin/manage-classes",
                element: <AdminRoute> <ManageClasses /> </AdminRoute>,
            },
            {
                path: "/dashboard/admin/give-feedback/:id",
                element: <AdminRoute> <Feedback/> </AdminRoute>,
            },
            {
                path: "/dashboard/admin/manage-users",
                element: <AdminRoute> <ManageUsers /> </AdminRoute>,
            },
        ]
    }
]);

export default router