import { Link } from "react-router-dom";
import useMyClasses from "../../../../hooks/useMyClasses";
import Button from "../../../../components/Button/Button";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import useScroll from "../../../../hooks/useScroll";

const MyClasses = () => {
    const [myClasses] = useMyClasses();
    // default scroll stop
    useScroll(location.pathname);
    const tableHead = ["Image", "Class Name", "Price", "Status", "Total Enrolled", "Feedback", "Actions"];
    return (
        <div className="py-32 md:py-16 w-full">
            {
                myClasses.length > 0 ?
                    <>
                        <h1 className="text-center text-2xl font-bold text-emerald-500 mb-8">My Classes</h1>
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
                                        myClasses.map((myClass) => <tr
                                            key={myClass._id}
                                            className="border-b border-neutral-200 dark:border-neutral-700/50">
                                            <th scope="row" className="p-4 font-medium whitespace-nowrap">
                                                <div className="shrink-0 h-12 w-12 rounded-full">
                                                    <LazyLoadImage effect='blur' className="w-12 h-12 object-cover rounded-full" src={myClass.classPhoto} alt="user photo" />
                                                </div>
                                            </th>
                                            <td className="p-4 whitespace-nowrap">
                                                {myClass.className}
                                            </td>
                                            <td className="p-4 whitespace-nowrap">
                                                ${myClass.price}
                                            </td>
                                            <td className={`p-4 whitespace-nowrap`}>
                                                <span className={`text-xs text-white px-2 py-1 rounded-full ${myClass.status === "approved" && "bg-emerald-500" || myClass.status === "pending" && "bg-yellow-500" || myClass.status === "denied" && "bg-red-500"}`}>{myClass.status}</span>
                                            </td>
                                            <td className="p-4 whitespace-nowrap text-center">
                                                {myClass.totalStudent}
                                            </td>
                                            <td className="p-4 whitespace-nowrap">
                                                {myClass.feedback ? myClass.feedback : "No feedback here!"}
                                            </td>
                                            <td className="pr-4 whitespace-nowrap">
                                                <button className="text-xs px-4 py-1 rounded-full text-white bg-emerald-500">
                                                    Update
                                                </button>
                                            </td>
                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>
                    </>
                    :
                    <>
                        <div className="flex flex-col items-center pt-8">
                            <h1 className="text-center text-2xl font-bold text-emerald-500 mb-8">You haven&apos;t added any classes yet!</h1>
                            <Link to="/dashboard/instructor/add-class">
                                <Button size="sm">Add a class</Button>
                            </Link>
                        </div>
                    </>
            }
        </div>
    );
};

export default MyClasses;