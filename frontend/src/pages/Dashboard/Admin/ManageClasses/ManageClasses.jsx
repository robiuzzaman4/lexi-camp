import useManageClasses from "../../../../hooks/useManageClasses";
import useScroll from "../../../../hooks/useScroll";
import ManageClasssesCard from "./ManageClasssesCard";

const ManageClasses = () => {
    const [classes] = useManageClasses();

    // default scroll stop
    useScroll(location.pathname);

    return (
        <div className="relative">
            <div className="py-32 md:py-16 w-full">
                <h1 className="text-center text-2xl font-bold text-emerald-500 mb-8">Manage Classes</h1>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {
                        classes.map((singleClass) => <ManageClasssesCard
                            key={singleClass._id}
                            singleClass={singleClass}></ManageClasssesCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default ManageClasses;