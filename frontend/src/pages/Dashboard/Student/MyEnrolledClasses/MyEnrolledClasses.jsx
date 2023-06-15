import { Link } from "react-router-dom";
import useMyEnrolledClasses from "../../../../hooks/useMyEnrolledClasses";
import Button from "../../../../components/Button/Button";
import MyEnrolledClassesCard from "./MyEnrolledClassesCard";
import useScroll from "../../../../hooks/useScroll";

const MyEnrolledClasses = () => {
    const [myEnrolledClasses] = useMyEnrolledClasses();
    // default scroll stop
    useScroll(location.pathname);
    return (
        <div className="py-32 md:py-16 w-full">
            {
                myEnrolledClasses?.length > 0 ?
                    <>
                        <h3 className="text-center text-2xl font-bold text-emerald-500 mb-8">My Enrolled Classes</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {
                                myEnrolledClasses.map((myEnrolledClass) => <MyEnrolledClassesCard
                                    key={myEnrolledClass._id}
                                    myEnrolledClass={myEnrolledClass}
                                ></MyEnrolledClassesCard>)
                            }
                        </div>
                    </>
                    :
                    <>
                        <div className="flex flex-col items-center pt-8">
                            <h3 className="text-center text-2xl font-bold text-emerald-500 mb-8">You haven&apos;t enrolled any calsses yet!</h3>
                            <Link to="/classes">
                                <Button size="sm">Explores Classes</Button>
                            </Link>
                        </div>
                    </>
            }
        </div>
    );
};

export default MyEnrolledClasses;