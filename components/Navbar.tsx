'use client'
import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const Navbar = () => {

    const navBar = useRef(null)
    
    const [menuClicked, setMenuClicked] = useState(false)
    const [showMenu, setShowMenu] = useState(false)

    const {contextSafe} = useGSAP();
    
    useGSAP(()=>{
        const tl = gsap.timeline()
        tl.from(navBar.current,{
            scale:0,
            backgroundColor:'white',
            duration:0.5,
            delay:0.3
        })
        tl.from('.icons',{
            y:-30,
            opacity:0,
            duration:1,
            delay:0.5,
        })
        tl.from('.elements',{
            y:30,
            opacity:0,
            duration:0.5,
            stagger:0.2
        })
    })

    useEffect(() => {
    //   setMenuClicked(menuClicked)
    }, [menuClicked])
    

    const handleClick = contextSafe(() =>{
        
        console.log(menuClicked)
        if(menuClicked){
            
            gsap.to('.menuElements', {
                x: 80,
                opacity: 0,
                stagger: -0.3,
                onComplete: () => {
                    gsap.to('.navMenu', {
                        y: -300,
                        scale: 0,
                        opacity: 0,
                        onComplete: () => setMenuClicked(false)
                    });
                }
            });
        }else{
            setMenuClicked(true)
            gsap.fromTo('.navMenu', {y: -300,
                scale: 0,
                opacity: 0,
                },{
                y: 0,
                scale: 1,
                opacity: 1,
                // duration:0.3,
                onComplete:()=>{
                    gsap.fromTo('.menuElements',{x:80, opacity:0}, {
                        x: 0,
                        opacity: 1,
                        stagger: 0.3,
                        // duration:0.5,
                        
                    });
                }
            });
        }
    })


  return (
    <div ref={navBar} className='top-3 rounded-lg absolute w-full z-50'>
        <div className='w-[90%] bg-white bg-opacity-40  backdrop-filter backdrop-blur-md  mx-auto rounded-full flex font-bold text-xl tracking-wide items-center justify-around h-12'>
            <div className="icons">Logo</div>
            <div className='pages md:flex hidden gap-10'>
                <div className='elements font-normal'>Products</div>
                <div className='elements font-normal'>Categories</div>
                <div className='elements font-normal'>Cart</div>
                <div className='elements font-normal'>Ask Ai</div>
            </div>
            <div className="icons flex items-center gap-3">
                <div>UserLogo</div>
                <div onClick={handleClick} className="burgerMenu cursor-pointer md:hidden flex flex-col gap-1 justify-center">
                    <div className="lines w-6 h-1 rounded-full bg-black"></div>
                    <div className="lines w-4 h-1 rounded-full bg-black"></div>
                    <div className="lines w-2 h-1 rounded-full bg-black"></div>
                </div>
            </div>
        </div>
        <div className={`navMenu min-h-[80vh] ${menuClicked? `flex ` : `hidden`} flex-col items-center justify-evenly m-5 rounded-[16px]  bg-green-300 bg-opacity-30  backdrop-filter backdrop-blur-md shadow-xl`}>
            <div className='menuElements font-bold text-3xl hover:text-blue-500 transition-colors duration-700'>Products</div>
            <div className='menuElements font-bold text-3xl hover:text-blue-500 transition-colors duration-700'>Categories</div>
            <div className='menuElements font-bold text-3xl hover:text-blue-500 transition-colors duration-700'>Cart</div>
            <div className='menuElements font-bold text-3xl hover:text-blue-500 transition-colors duration-700'>Ask Ai</div>
        </div>
    </div>
  )
}

export default Navbar


// Thanks for the update! It seems that the issue might be due to how the timelines and the state are being managed. Let's simplify the approach to ensure the menu opens and closes correctly with the animations.

// ### Updated Solution:
// Here’s a revised approach without using `useEffect` for animation control:

// ```javascript
// import { useState } from 'react';
// import { gsap } from 'gsap';

// const MenuComponent = () => {
//     const [menuClicked, setMenuClicked] = useState(false);

//     const handleClick = () => {
//         if (menuClicked) {
//             // Close the menu
            // gsap.to('.menuElements', {
            //     x: 80,
            //     opacity: 0,
            //     stagger: -0.3,
            //     onComplete: () => {
            //         gsap.to('.navMenu', {
            //             y: -300,
            //             scale: 0,
            //             opacity: 0,
            //             onComplete: () => setMenuClicked(false)
            //         });
            //     }
            // });
//         } else {
//             // Open the menu
            // gsap.fromTo('.navMenu', 
            //     { y: -300, scale: 0, opacity: 0 },
            //     { y: 0, scale: 1, opacity: 1, duration: 0.5 }
            // );
            // gsap.fromTo('.menuElements', 
            //     { x: 80, opacity: 0 },
            //     { x: 0, opacity: 1, stagger: 0.3, duration: 0.5, onComplete: () => setMenuClicked(true) }
            // );
//         }
//     };

//     return (
//         <button onClick={handleClick}>
//             {/* Hamburger Icon */}
//         </button>
//     );
// };

// export default MenuComponent;
// ```

// ### Explanation:
// 1. **State Management:** We’re using a simple `boolean` state (`menuClicked`) to track whether the menu is open or closed.
// 2. **Conditional Animations:** We’re checking the state directly within the `handleClick` function and applying the corresponding animations.
// 3. **GSAP fromTo Method:** We use `fromTo` for the opening animation to ensure the initial and final states are explicitly defined.

// ### How It Works:
// - When `menuClicked` is `false`, clicking the button will trigger the opening animation, and the state is set to `true`.
// - When `menuClicked` is `true`, clicking the button will trigger the closing animation, and the state is set back to `false`.

// This approach should ensure the menu opens and closes properly each time you click the button.


// import { useState } from 'react';
// import { gsap } from 'gsap';

// const MenuComponent = () => {
//     const [menuClicked, setMenuClicked] = useState(false);

//     const handleClick = () => {
//         if (menuClicked) {
//             // Close the menu
//             gsap.to('.menuElements', {
//                 x: 80,
//                 opacity: 0,
//                 stagger: -0.3,
//                 onComplete: () => {
//                     gsap.to('.navMenu', {
//                         y: -300,
//                         scale: 0,
//                         opacity: 0,
//                         onComplete: () => setMenuClicked(false)
//                     });
//                 }
//             });
//         } else {
//             // Open the menu with animation
            // gsap.to('.navMenu', {
            //     y: 0,
            //     scale: 1,
            //     opacity: 1,
            //     duration: 0.5,
            //     onStart: () => {
            //         document.querySelector('.navMenu').style.display = 'flex';
            //     }
            // });
            // gsap.from('.menuElements', {
            //     x: 80,
            //     opacity: 0,
            //     stagger: 0.3,
            //     duration: 0.5,
            //     onComplete: () => setMenuClicked(true)
            // });
//         }
//     };

//     return (
//         <button onClick={handleClick}>
//             {/* Hamburger Icon */}
//         </button>
//     );
// };

// export default MenuComponent;