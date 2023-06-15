import axios from "axios";
import { useEffect, useState } from "react";
import Container from "../../components/Container/Container";
import InstructorCard from "./InstructorCard";
import useScroll from "../../hooks/useScroll";

const Instructors = () => {
    const [instructors, setInstructors] = useState([]);
    
    // default scroll stop
    useScroll(location.pathname);

    useEffect(() => {
        axios.get("https://lexi-camp-server.vercel.app/instructors")
            .then((res) => {
                setInstructors(res.data);
            })
    }, []);

    return (
        <div className="py-32 w-full">
            <Container>
                <div className="py-4">
                    <h1 className="text-center text-2xl font-bold text-emerald-500 mb-8">Our All Instructors</h1>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {
                        instructors.map((instructor) => <InstructorCard
                        key={instructor._id}
                        instructor={instructor}></InstructorCard>)
                    }
                </div>
            </Container>
        </div>
    );
};

export default Instructors;