import React, { useState } from 'react';
import '../css/ImageSlider.css';

interface ImageSliderProps {
    images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className="image-slider">
            <button onClick={prevSlide}>&lt;</button>
            <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} />
            <button onClick={nextSlide}>&gt;</button>
        </div>
    );
};

export default ImageSlider;
