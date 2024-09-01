'use client'
import Image from 'next/image'
import React, { FunctionComponent, useEffect, useRef, useState } from 'react'

interface ArrayOfImages {
  arrayOfImages:string[];
  imageHeight: string;
}

const SlideShow:FunctionComponent<ArrayOfImages> = ({arrayOfImages, imageHeight}) => {
    
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
              prevIndex === arrayOfImages.length - 1 ? 0 : prevIndex + 1
            ),
          2500
        );
        return () => {resetTimeout();};
      }, [index]);

  return (
    <div className="slideshow overflow-hidden w-full max-h-fit  mx-auto my-0">
      <div className={`slideshowSlider whitespace-nowrap  [transition:ease_1000ms]`} style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
        {arrayOfImages.map((img, index) => (
            <div className={`slide h-${imageHeight} w-full inline-block space-x-2`} key={index}>
                <Image src={img} alt='noImg found' className='rounded-[12px]' width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%', objectFit:'cover'}}/>
            </div>
        ))}
      </div>
      <div className="slideshowDots text-center">
        {arrayOfImages.map((_, idx) => (
          <div  key={idx} onClick={() => {
            setIndex(idx);
          }} className={`slideshowDot ${index === idx ? "bg-[rebeccapurple]" : ""} inline-block h-5 w-5 cursor-pointer bg-[#c4c4c4] mt-[15px] mb-0 mx-[7px] rounded-[50%]`}></div>
        ))}
      </div>
      <div className="hidden h-[80vh]"></div>
    </div>
  )
}

export default SlideShow