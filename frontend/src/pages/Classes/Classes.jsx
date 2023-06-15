import { useState } from "react";
import Container from "../../components/Container/Container";
import axios from "axios";
import ClassCard from "./ClassCard";
import useScroll from "../../hooks/useScroll";

const Classes = () => {
    const [allClasses, setAllClasses] = useState([]);
    axios.get("https://lexi-camp-server.vercel.app/allApproved-classes")
        .then((res) => {
            setAllClasses(res.data);
        })

    // default scroll stop
    useScroll(location.pathname);

    return (
        <div className="relative py-32 w-full">
            <Container>
                <div className="grid gap-8">
                    <div className="py-4">
                        <h1 className="text-center text-2xl font-bold text-emerald-500">Our All Classes</h1>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {
                            allClasses.map((singleClass) => <ClassCard
                                key={singleClass._id}
                                singleClass={singleClass}></ClassCard>)
                        }
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Classes;