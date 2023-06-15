import { useEffect, useState } from "react";
import Container from "../../components/Container/Container";
import axios from "axios";
import InstructorCard from "../../pages/Instructors/InstructorCard";

const TopInstructors = () => {
    const [instructors, setInstructors] = useState([])

    useEffect(() => {
        axios.get("https://lexi-camp-server.vercel.app/instructors")
            .then((res) => {
                setInstructors(res.data);
            })
    }, []);

    return (
        <div className="py-12">
            <Container>
                <div>
                    <h1 className="text-center text-2xl font-bold text-emerald-500 mb-8">Lexi Camp Top Instructors</h1>
                    <div className="grid md:grid-cols-3 gap-4">
                        {
                            instructors.slice(0, 6).map((instructor) => <InstructorCard
                                key={instructor._id}
                                instructor={instructor}></InstructorCard>)
                        }
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default TopInstructors;