import Container from "../../components/Container/Container";
import aboutPic from "../../assets/img/aboutPic.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import {  motion } from "framer-motion";

const AboutUs = () => {
    return (
        <div className="py-12 overflow-hidden">
            <Container>
                <h1 className="text-center text-2xl font-bold text-emerald-500 mb-8">Know About Us</h1>
                <div className="grid md:grid-cols-2 gap-4">
                    <motion.div
                        initial={{ opacity: 0, translateX: 60 }}
                        whileInView={{ opacity: 1, translateX: 0 }}>
                        <LazyLoadImage effect="blur" className="bg-cover rounded-lg" src={aboutPic} alt="" />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, translateX: -60 }}
                        whileInView={{ opacity: 1, translateX: 0 }}
                        className="flex flex-col justify-center gap-4">
                        <h3 className="text-2xl font-bold">
                            Welcome to Lexi Camp, your ultimate language learning destination!
                        </h3>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm font-medium">
                            At Lexi Camp, we believe that learning a new language opens up a world of opportunities and enriches your personal and professional life. Our passion for languages and dedication to providing an immersive and engaging learning experience sets us apart as a leading language learning center.
                        </p>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm font-medium">
                            At Lexi Camp, we offer a diverse range of language programs tailored to meet the needs of learners of all ages and levels. Whether you are a beginner or looking to enhance your fluency.
                        </p>
                    </motion.div>
                </div>
            </Container>
        </div>
    );
};

export default AboutUs;