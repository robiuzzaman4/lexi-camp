import axios from "axios";
import { useEffect, useState } from "react";
import TopClassCard from "./TopClassCard";
import Container from "../../components/Container/Container";

const TopClasses = () => {
    const [topClasses, setTopClasse] = useState([]);

    useEffect(() => {
        axios.get("https://lexi-camp-server.vercel.app/top-classes")
            .then((res) => {
                setTopClasse(res.data);
            })
    })

    return (
        <div className="py-12">
            <Container>
                <div>
                    <h1 className="text-center text-2xl font-bold text-emerald-500 mb-8">Lexi Camp Top Classes</h1>
                    <div className="grid md:grid-cols-3 gap-4">
                        {
                            topClasses.map((topClass) => <TopClassCard
                                key={topClass._id}
                                topClass={topClass}></TopClassCard>)
                        }
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default TopClasses;