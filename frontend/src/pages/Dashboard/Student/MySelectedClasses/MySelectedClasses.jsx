import { Link } from "react-router-dom";
import useMySelectedClasses from "../../../../hooks/useMySelectedClasses";
import MySelectedClassesCard from "./MySelectedClassesCard";
import Button from "../../../../components/Button/Button";
import useScroll from "../../../../hooks/useScroll";

const MySelectedClasses = () => {
    const [mySelectedClasses] = useMySelectedClasses();
    // default scroll stop
    useScroll(location.pathname);
    return (
        <div className="py-32 md:py-16 w-full">
            {
                mySelectedClasses.length > 0 ?
                    <>
                        <h1 className="text-center text-2xl font-bold text-emerald-500 mb-8">My Selected Classes</h1>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {
                                mySelectedClasses.map((mySelectedClass) => <MySelectedClassesCard
                                    key={mySelectedClass._id}
                                    mySelectedClass={mySelectedClass}
                                ></MySelectedClassesCard>)
                            }
                        </div>
                    </>
                    :
                    <>
                        <div className="flex flex-col items-center pt-8">
                            <h1 className="text-center text-2xl font-bold text-emerald-500 mb-8">No selected classes available!</h1>
                            <Link to="/classes">
                                <Button size="sm">Explores Classes</Button>
                            </Link>
                        </div>
                    </>
            }
        </div>
    );
};

export default MySelectedClasses;