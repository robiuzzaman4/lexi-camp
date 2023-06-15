import { useState } from "react";
import sliderImg1 from "../../assets/img/sliderImg1.jpg"
import sliderImg2 from "../../assets/img/sliderImg2.jpg"
import sliderImg3 from "../../assets/img/sliderImg3.jpg"
import { motion } from "framer-motion";
import Container from "../../components/Container/Container";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi";

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderData = [
        {
            title: "Achieving fluency in your preferred language.",
            img: sliderImg1
        },
        {
            title: "Learn with world best Instructors.",
            img: sliderImg2
        },
        {
            title: "Be prepared for your corporate life.",
            img: sliderImg3
        }
    ];

    const { title, img } = sliderData[currentSlide];

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % sliderData.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) =>
            prevSlide === 0 ? sliderData.length - 1 : prevSlide - 1
        );
    };

    return (
        <div className="pt-24 pb-12">
            <Container>
                <div className="relative w-full">
                    <motion.img
                        src={img}
                        alt={title}
                        className="w-full h-80 md:h-[420px] object-cover rounded-lg"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5 }}
                        key={currentSlide}
                    />
                    <div className="absolute inset-0 py-4 px-8 rounded-lg grid place-items-center h-full w-full bg-black/60">
                        <div className="md:max-w-lg">
                            <h1 className="text-neutral-50 text-3xl md:text-5xl font-bold text-center">{title}</h1>
                        </div>
                    </div>
                    <button
                        className="absolute left-0 md:left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-neutral-800 text-neutral-50"
                        onClick={prevSlide}
                    >
                        <HiChevronLeft />
                    </button>
                    <button
                        className="absolute right-0 md:right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-neutral-800 text-neutral-50"
                        onClick={nextSlide}
                    >
                        <HiChevronRight />
                    </button>
                </div>
            </Container>
        </div>
    );
};

export default Hero;