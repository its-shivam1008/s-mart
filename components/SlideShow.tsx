'use client'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

const SlideShow = () => {
    const images = ['/categoryImages/imageSlider1.jpg', '/categoryImages/imageSlider2.jpg', '/categoryImages/imageSlider3.jpg',  '/categoryImages/imageSlider4.jpg', '/categoryImages/imageSlider5.jpg', '/categoryImages/imageSlider6.jpg']
    const [index, setIndex] = useState(0);
    const timeoutRef = useRef<any>();

    function resetTimeout() {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      }

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
          () =>
            setIndex((prevIndex) =>
              prevIndex === images.length - 1 ? 0 : prevIndex + 1
            ),
          2500
        );
        return () => {resetTimeout();};
      }, [index]);

  return (
    <div className="slideshow overflow-hidden w-full max-h-fit  mx-auto my-0">
      <div className={`slideshowSlider whitespace-nowrap  [transition:ease_1000ms]`} style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
        {images.map((img, index) => (
            <div className="slide h-[80vh] w-full inline-block rounded-[40px]" key={index}>
                <Image src={img} alt='noImg found' width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%', objectFit:'cover'}}/>
            </div>
        ))}
      </div>
      <div className="slideshowDots text-center">
        {images.map((_, idx) => (
          <div  key={idx} onClick={() => {
            setIndex(idx);
          }} className={`slideshowDot ${index === idx ? "bg-[rebeccapurple]" : ""} inline-block h-5 w-5 cursor-pointer bg-[#c4c4c4] mt-[15px] mb-0 mx-[7px] rounded-[50%]`}></div>
        ))}
      </div>
    </div>
  )
}

export default SlideShow