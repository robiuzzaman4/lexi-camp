import { Link } from "react-router-dom";
import useMyPaymentHistory from "../../../../hooks/useMyPaymentHistory";
import Button from "../../../../components/Button/Button";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import useScroll from "../../../../hooks/useScroll";

const MyPaymentHistory = () => {
    const [myPaymentHistory] = useMyPaymentHistory();
    // default scroll stop
    useScroll(location.pathname);

    const tableHead = ["Class Photo", "Class Name", "Price", "Trans ID"];
    return (
        <div className="py-32 md:py-16 w-full">
            {
                myPaymentHistory.length > 0 ?
                    <>
                        <h1 className="text-center text-2xl font-bold text-emerald-500 mb-8">My Payment History</h1>
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
                                        myPaymentHistory.map((singleHistory) => <tr
                                            key={singleHistory._id}
                                            className="border-b border-neutral-200 dark:border-neutral-700/50">
                                            <th scope="row" className="p-4 font-medium whitespace-nowrap">
                                                <div className="shrink-0 h-12 w-12 rounded-full">
                                                    <LazyLoadImage effect='blur' className="w-12 h-12 object-cover rounded-full" src={singleHistory.classPhoto} alt="user photo" />
                                                </div>
                                            </th>
                                            <td className="p-4 whitespace-nowrap">
                                                {singleHistory.className}
                                            </td>
                                            <td className="p-4 whitespace-nowrap">
                                                ${singleHistory.price}
                                            </td>
                                            <td className="p-4 whitespace-nowrap">
                                                {singleHistory.transactionID}
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
                            <h1 className="text-center text-2xl font-bold text-emerald-500 mb-8">You haven&apos;t payment any classes yet!</h1>
                            <Link to="/dashboard/student/selected-classes">
                                <Button size="sm">Pay Selected Classes</Button>
                            </Link>
                        </div>
                    </>
            }
        </div>
    );
};

export default MyPaymentHistory;