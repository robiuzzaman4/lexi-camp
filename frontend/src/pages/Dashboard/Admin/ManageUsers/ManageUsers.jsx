import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useManageUsers from "../../../../hooks/useManageUsers";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import useScroll from "../../../../hooks/useScroll";

const ManageUsers = () => {
    const [users, refetch] = useManageUsers();
    const { axiosSecure } = useAxiosSecure();

    // default scroll stop
    useScroll(location.pathname);

    const tableHead = ["Image", "Name", "Email", "Current Role", "Actions"];

    // make instructor function
    const handleMakeInstructor = (email) => {
        axiosSecure.patch(`/admin/manage-users/make-instructor/${email}`)
            .then((res) => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    toast.success(`${email} - Make Instructor Successfull!`);
                    refetch();
                }
            })
    }

    // make admin function
    const handleMakeAdmin = (email) => {
        axiosSecure.patch(`/admin/manage-users/make-admin/${email}`)
            .then((res) => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    toast.success(`${email} - Make Admin Successfull!`);
                    refetch();
                }
            })
    }

    return (
        <div className="py-32 md:py-16 w-full">
            <h1 className="text-center text-2xl font-bold text-emerald-500 mb-8">Manage Users</h1>

            <div className="relative overflow-x-auto shadow-md rounded-lg w-full">
                <table className="min-w-full text-sm text-left text-neutral-500">
                    <thead className="text-xs uppercase bg-neutral-100 dark:bg-neutral-800 text-neutral-600  dark:text-neutral-400">
                        <tr>
                            {
                                tableHead.map((head) => <th
                                    key={head}
                                    className="p-4">{head}</th>)
                            }
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {
                            users.map((user) => <tr
                                key={user._id}
                                className="border-b border-neutral-200 dark:border-neutral-700/50">
                                <th scope="row" className="p-4 font-medium whitespace-nowrap">
                                    <div className="shrink-0 h-12 w-12 rounded-full">
                                        <LazyLoadImage effect='blur' className="w-12 h-12 object-cover rounded-full" src={user.photo} alt="user photo" />
                                    </div>
                                </th>
                                <td className="p-4 whitespace-nowrap">
                                    {user.name}
                                </td>
                                <td className="p-4 whitespace-nowrap">
                                    {user.email}
                                </td>
                                <td className="p-4 whitespace-nowrap">
                                    {user.role}
                                </td>
                                <td className="pr-4 whitespace-nowrap">
                                    <div className="flex items-center justify-start gap-2">
                                        <button onClick={() => handleMakeInstructor(user.email)} disabled={user.role === "instructor" || user.role === "admin"} className={`shrink-0 text-xs px-4 py-1 rounded-full text-white bg-yellow-500 ${(user.role === "instructor" || user.role === "admin") && "opacity-25"}`}>
                                            Make Instructor
                                        </button>
                                        <button onClick={() => handleMakeAdmin(user.email)} disabled={user.role === "admin"} className={`shrink-0 text-xs px-4 py-1 rounded-full text-white bg-emerald-500  ${user.role === "admin" && "opacity-25"}`}>
                                            Make Admin
                                        </button>
                                    </div>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default ManageUsers;