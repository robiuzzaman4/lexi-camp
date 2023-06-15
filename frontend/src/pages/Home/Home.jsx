import AboutUs from "../../blocks/AboutUs/AboutUs";
import Hero from "../../blocks/Hero/Hero";
import TopClasses from "../../blocks/TopClasses/TopClasses";
import TopInstructors from "../../blocks/TopInstructors/TopInstructors";

const Home = () => {
    return (
        <>
            <Hero />
            <AboutUs/>
            <TopClasses />
            <TopInstructors />
        </>
    );
};

export default Home;