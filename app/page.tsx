"use client"
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState , useRef} from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { Zenitho, Novatrix } from "uvcanvas"
import {useGSAP} from '@gsap/react';
// import './css/locomotive-scroll.css';
// import LocomotiveScroll from "locomotive-scroll";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {

  const {contextSafe} = useGSAP();
  const mainRef = useRef(null);
  const cursorRef = useRef(null);
  const viewItemRef = useRef(null);
  const [cursorText, setCursorText] = useState('')

  let scrollContainer = useRef(null);

  
  

  //page 5 image viewer
  useGSAP(() =>{
    const tl5 = gsap.timeline({
      scrollTrigger:{
        trigger:'.part-7',
        start:"50% 50%",
        end:'800% 50%', // we have to change this 840% if we want to add orr remove an image from the list
        pin:true,
        scrub:1,
      }
    });
    tl5.to('.demo',{
      bottom:7,
    })
    tl5.to('.our-work-txt-div',{
      height:"60vh",
    }, 'height')
    tl5.to('.our-work-txt',{
      height:"60vh",
    }, 'height')
    tl5.to('.Popular',{
      left:"0%",
    }, 'height')
    tl5.to('.Things',{
      right:"0%"
    }, 'height')
    tl5.to('.scroll-img',{
      marginTop:'-800%' // we have to change this 800% if we want to add or remove an image from the list
    })
  }, {scope:viewItemRef})

  // page 3 loading animation code refatoring for better performance
  useGSAP(() =>{
    const parentProducts = gsap.utils.toArray('.parentProduct')
    parentProducts.forEach((parentProduct:any)=>{
      let productTitle = parentProduct.querySelector('.productTitle')
      let productCards = parentProduct.querySelector('.productCards')
      
      let tl6 = gsap.timeline({
        scrollTrigger:{
          trigger:parentProduct,
          start:'top 80%',
          end:'top 40%',
          scrub:3
        }
      })
      tl6.from(parentProduct,{
        opacity:0,
        x:-50
      })
      tl6.from(productTitle,{
        x:-30,
        opacity:0,
        rotate:360,
      })
      tl6.from(productCards,{
        opacity:0,
        scale:0,
        stagger:0.3
      })
    })
  })

  //changing the mouse cursor on ntering and leaving a product
  const mouseEnterProduct = contextSafe((e: React.MouseEvent)=>{
    gsap.set('.product',{
      cursor:"none"
    })
    setCursorText('View item 🤩')
    gsap.to(cursorRef.current, {
      delay:0.3,
      height:"fit-content",
      width:"fit-content",
      padding:"4px",
      // zIndex:'9',
      outlineColor:'rebeccapurple',
      outlineStyle:'solid',
      outlineWidth:'thin',
      border:'2px solid white',
      borderRadius:"16px",
      backgroundColor:"rebeccapurple",
      color:'white'
    });
  })
  const mouseLeaveProduct = contextSafe((e: React.MouseEvent)=>{
    gsap.set(cursorRef.current, {
      cursor:'auto'
    })
    setCursorText('');
    gsap.to(cursorRef.current,{
      delay:0.3,
      width:'28px',
      height:'28px',
      borderRadius:'9999px',
      backgroundColor:'white',
      outline:'none',
      border:'none'
    })

  })

  //changing the color of mouse follower on entering and leaving the page 3
  const mouseEnterPage3 = contextSafe((e: React.MouseEvent)=>{
    gsap.to(cursorRef.current,{
      backgroundColor:'#f1f5f9',
      delay:0.3,
    })
  })
  const mouseLeavePage3 = contextSafe((e: React.MouseEvent)=>{
    gsap.to(cursorRef.current,{
      backgroundColor:'#a855f7', 
      delay:0.3,
    })
  })


  //page3 animation using scrollTrigger and its pin property
  useGSAP(()=>{
    const tl3 = gsap.timeline()
    tl3.to('.page4 h1',{
      transform:"translatex(-450%)", // you have to change this for according to the text length
      scrollTrigger:{
        trigger:'.page4',
        pin:true,
        scrub:2,
        start:'top 0%',
        end:'top -150%',
        scroller:'body'
        
      }
    })
  })


  //page2 animation on scroll( with scrolltrigger)
  useGSAP(()=>{
    const tl2 = gsap.timeline();
    tl2.from('.page2 .categories',{
      opacity:0,
      x:-50,
      duration:2,
      stagger:0.3,
      scrollTrigger:{
        trigger:'.page2 .categories',
        start:'top 70%',
        scrub:2,
        end:"top 40%",
      }
    })
    tl2.from('.category1',{
      opacity:0,
      x:-50,
      duration:2,
      scrollTrigger:{
        trigger:'.category1',
        // markers:true,
        start:'top 50%',
        end:'top 10%',
        scrub:2,
      }
    })
    tl2.from('.category2',{
      opacity:0,
      x:50,
      duration:2,
      scrollTrigger:{
        trigger:'.category1',
        // markers:true,
        start:'top 50%',
        end:'top 10%',
        scrub:2,
      }
    })
  })
  

  // mouse follower in the hero section 
  const mouseMove = contextSafe((e: React.MouseEvent)=>{
    gsap.to(cursorRef.current,{
      x:e.clientX+15,
      y:e.clientY+15,
      ease:'back.out',
    })
  })

  // scalinng the cursor on mouse enter and mouse leave
  const mouseEnter = contextSafe((e: React.MouseEvent)=>{
    gsap.to(cursorRef.current,{
      scale:2.3,
      delay:0.2,
      duration:0.2
    })
  })
  const mouseLeave = contextSafe((e: React.MouseEvent)=>{
    gsap.to(cursorRef.current,{
      scale:1,
      delay:0.2,
      duration:0.2
    })
  })


  
  // text reveal animantion in the hero section 
  useGSAP(() => {
    const tl = gsap.timeline()
    tl.from('.buy-text', {
      duration:0.5,
      x:-30,
      opacity:0,
      delay:4
    })
    tl.from('.hero .headings',{
      duration:1,
      scale:0,
      opacity:0,
    })
  })

  const router = useRouter()
  const [flag, setFlag] = useState(false)
  const { data: session, status } = useSession()
  useEffect(() => {
    const checkPass = async () =>{
      // alert('useeffect')
      if(session && !flag){
        // console.log(session)
        const res = await axios.get(`/api/isVerified?email=${session.user.email}`);
        // console.log(res.data.isVerified)
        setFlag(true)
        if(!res.data.isVerified){
          router.push('/verify')
        }
      }
    }
    checkPass();
  }, [session, flag]) //You get undefined because the session hasn't been fetched yet. You can solve it by using useEffect and adding "session" to its dependencies
  
  
  return (
    <div>
      <main data-scroll onMouseMove={mouseMove} ref={mainRef} className="parent-with-no-height-width-for-locomotivejs">
        <div className="h-5 w-5 rounded-full bg-[rebeccapurple] fixed z-10" ref={cursorRef}>{cursorText}</div>
        <div data-scroll data-scroll-speed={5} data-scroll-direction='horizontal' className="home h-screen w-full  flex justify-center items-center">
        <Novatrix />
            <div className="text-Black absolute flex flex-col gap-3">
              <div className="buy-text tracking-wider font-bold text-xl">Buy Anything</div>
              <div onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} className="hero text-5xl flex gap-5 font-extrabold tracking-widest">
                <div className='headings text-stroke'>Lorem</div>
                <div className='headings text-stroke'>Ipsum</div>
                <div className='headings text-stroke'>Dolor</div>
              </div>
          </div>
        </div>
        <div className="page2 w-full h-fit px-5">
          <div className="categories flex my-10">
            <div className="bg-purple-200 text-purple-900 font-bold tracking-wider w-fit text-3xl p-1 rounded-md mr-3">Catgories</div>
            <div className="w-fit ml-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, consequuntur voluptatem sequi rerum dicta labore itaque repellat blanditiis magnam vero neque minus excepturi nesciunt modi? Voluptatum, quibusdam? Alias, unde voluptatum?</div>
          </div>
          <div className="categories-scroll grid grid-cols-2 gap-5 m-8 py-8"> 
            <div className="category1 flex flex-col items-center space-y-20">
              <div  onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} className='headings w-96 h-48 shadow-xl bg-purple-300  rounded-lg'>
                <div className="category-title text-black w-fit text-2xl p-2 m-2">Electronics</div>
                {/* images of the products */}
              </div>
              <div  onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} className='headings w-96 h-48 shadow-xl bg-purple-300  rounded-lg'>
                <div className="category-title text-black w-fit text-2xl p-2 m-2">Fashion</div>
                {/* images of the products */}
              </div>
              <div  onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} className='headings w-96 h-48 shadow-xl bg-purple-300  rounded-lg'>
                <div className="category-title text-black w-fit text-2xl p-2 m-2">Home and Furniture</div>
                {/* images of the products */}
              </div>
            </div>
            <div className="category2 flex flex-col items-center space-y-20">
              <div  onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} className='headings w-96 h-48 shadow-xl bg-purple-300  rounded-lg'>
                <div className="category-title text-black w-fit text-2xl p-2 m-2">Books</div>
                {/* images of the products */}
              </div>
              <div  onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} className='headings w-96 h-48 shadow-xl bg-purple-300  rounded-lg'>
                <div className="category-title text-black w-fit text-2xl p-2 m-2">Personal Care</div>
                {/* images of the products */}
              </div>
              <div  onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} className='headings w-96 h-48 shadow-xl bg-purple-300  rounded-lg'>
                <div className="category-title text-black w-fit text-2xl p-2 m-2">Sports and outdoors</div>
                {/* images of the products */}
              </div>
            </div>
          </div>
        </div>
        <div ref={viewItemRef} className="page5 w-full min-h-screen my-12">
          <div className="part-7 flex items-center justify-center w-full h-screen">
            <div className="our-work-txt absolute w-[60vw] h-[0vh] z-[9]">
              <h1 className="Popular absolute top-0 left-[35%] translate-x-[-20%] -translate-y-[110%] text-[rebeccapurple] text-[5vw]">Popular</h1>
              <h1 className="Things absolute bottom-0 right-[35%] translate-x-[20%] translate-y-[110%] text-[rebeccapurple] text-[5vw]">Things</h1>
            </div>
            <div className="our-work-txt-div overflow-hidden flex items-center justify-center relative w-[60vw] h-[0vh] bg-white">
              <div className="scroll-work w-full h-[60vh] bg-[#919191]">
                <div className="scroll-img w-full mt-0 transition-all">
                  <Image className='w-full' src='https://images.unsplash.com/photo-1695619575474-9b45e37bc1e6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }}  alt='noimg' />
                  <Image className='w-full' src='https://images.unsplash.com/photo-1621899576945-ab4f37af765c?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }}  alt='noimg' />
                  <Image className='w-full' src='https://images.unsplash.com/photo-1543652437-15ae836b33e3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }}  alt='noimg' />
                  <Image className='w-full' src='https://plus.unsplash.com/premium_photo-1679483562579-023de24ab10f?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }}  alt='noimg' />
                  <Image className='w-full' src='https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }}  alt='noimg' />
                  <Image className='w-full' src='https://images.unsplash.com/photo-1663869960499-6866301c0259?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }}  alt='noimg' />
                  <Image className='w-full' src='https://images.unsplash.com/photo-1534755120520-cd02c122038d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }}  alt='noimg' />
                  {/* 7 images including above */}
                </div>
              </div>
            </div>
            <button type='button' className="demo absolute bottom-[0%] py-[1.5vw] px-[3vw] bg-[#d1d1d1] text-[0.8vw] border-none rounded-xl">Demo</button>
          </div>
        </div>
        <div onMouseEnter={mouseEnterPage3} onMouseLeave={mouseLeavePage3} className="page3 bg-purple-400 h-fit py-20 space-y-20">
          <div className='parentProduct flex flex-col'>
            <div className="hidden"></div>
            <div className='productTitle electProducts px-2 py-3 ml-10 mb-10 text-3xl font-bold bg-slate-100 rounded-md text-purple-800 w-fit'>Electronics</div>
            <div className="productCards flex items-center justify-around">
              <div onMouseEnter={mouseEnterProduct} onMouseLeave={mouseLeaveProduct} className="eleProd product w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
          
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
              <div onMouseEnter={mouseEnterProduct} onMouseLeave={mouseLeaveProduct} className="eleProd product w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
              <div onMouseEnter={mouseEnterProduct} onMouseLeave={mouseLeaveProduct} className="eleProd product w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
              <div onMouseEnter={mouseEnterProduct} onMouseLeave={mouseLeaveProduct} className="eleProd product w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
              <div onMouseEnter={mouseEnterProduct} onMouseLeave={mouseLeaveProduct} className="eleProd product w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
            </div>
          </div>
          <div className='parentProduct flex flex-col'>
            <div className="hidden"></div>
            <div className='productTitle fashionProducts px-2 py-3 m-10 text-3xl font-bold bg-slate-100 rounded-md text-purple-800 w-fit'>Fashion</div>
            <div className="productCards flex items-center justify-around">
              <div onMouseEnter={mouseEnterProduct} onMouseLeave={mouseLeaveProduct} className="fashionProd product w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
              <div onMouseEnter={mouseEnterProduct} onMouseLeave={mouseLeaveProduct} className="fashionProd product w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
              <div onMouseEnter={mouseEnterProduct} onMouseLeave={mouseLeaveProduct} className="fashionProd product w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
              <div onMouseEnter={mouseEnterProduct} onMouseLeave={mouseLeaveProduct} className="fashionProd product w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
              <div onMouseEnter={mouseEnterProduct} onMouseLeave={mouseLeaveProduct} className="fashionProd product w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
            </div>
          </div>
          <div className='parentProduct flex flex-col'>
            <div className="hidden"></div>
            <div className='productTitle homeProduct px-2 py-3 m-10 text-3xl font-bold bg-slate-100 rounded-md text-purple-800 w-fit'>Home and Furniture</div>
            <div className="productCards flex items-center justify-around">
              <div onMouseEnter={mouseEnterProduct} onMouseLeave={mouseLeaveProduct} className="homeProd product w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
              <div onMouseEnter={mouseEnterProduct} onMouseLeave={mouseLeaveProduct} className="homeProd product w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
              <div onMouseEnter={mouseEnterProduct} onMouseLeave={mouseLeaveProduct} className="homeProd product w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
              <div onMouseEnter={mouseEnterProduct} onMouseLeave={mouseLeaveProduct} className="homeProd product w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
              <div onMouseEnter={mouseEnterProduct} onMouseLeave={mouseLeaveProduct} className="homeProd product w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
            </div>
          </div>
          <div className='parentProduct flex flex-col'>
            <div className="hidden"></div>
            <div className='productTitle booksProduct px-2 py-3 m-10 text-3xl font-bold bg-slate-100 rounded-md text-purple-800 w-fit'>Books</div>
            <div className="productCards flex items-center justify-around">
              <div onMouseEnter={mouseEnterProduct} onMouseLeave={mouseLeaveProduct} className="booksProd product w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
              <div onMouseEnter={mouseEnterProduct} onMouseLeave={mouseLeaveProduct} className="booksProd product w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
              <div onMouseEnter={mouseEnterProduct} onMouseLeave={mouseLeaveProduct} className="booksProd product w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
              <div onMouseEnter={mouseEnterProduct} onMouseLeave={mouseLeaveProduct} className="booksProd product w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
              <div onMouseEnter={mouseEnterProduct} onMouseLeave={mouseLeaveProduct} className="booksProd product w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
            </div>
          </div>
          <div className='parentProduct flex flex-col'>
            <div className="hidden"></div>
            <div className='productTitle personalProduct px-2 py-3 m-10 text-3xl font-bold bg-slate-100 rounded-md text-purple-800 w-fit'>Personal care</div>
            <div className="productCards flex items-center justify-around">
              <div onMouseEnter={mouseEnterProduct} onMouseLeave={mouseLeaveProduct} className="personalProd product w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
              <div onMouseEnter={mouseEnterProduct} onMouseLeave={mouseLeaveProduct} className="personalProd product w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
              <div onMouseEnter={mouseEnterProduct} onMouseLeave={mouseLeaveProduct} className="personalProd product w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
              <div onMouseEnter={mouseEnterProduct} onMouseLeave={mouseLeaveProduct} className="personalProd product w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
              <div onMouseEnter={mouseEnterProduct} onMouseLeave={mouseLeaveProduct} className="personalProd product w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
            </div>
          </div>
          <div className='parentProduct flex flex-col'>
            <div className="hidden"></div>
            <div className='productTitle sportsProduct px-2 py-3 m-10 text-3xl font-bold bg-slate-100 rounded-md text-purple-800 w-fit'>Sports and Outdoors</div>
            <div className="productCards flex items-center justify-around">
              <div onMouseEnter={mouseEnterProduct} onMouseLeave={mouseLeaveProduct} className="sportsProd product w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
              <div onMouseEnter={mouseEnterProduct} onMouseLeave={mouseLeaveProduct} className="sportsProd product w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
              <div onMouseEnter={mouseEnterProduct} onMouseLeave={mouseLeaveProduct} className="sportsProd product w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
              <div onMouseEnter={mouseEnterProduct} onMouseLeave={mouseLeaveProduct} className="sportsProd product w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
              <div onMouseEnter={mouseEnterProduct} onMouseLeave={mouseLeaveProduct} className="sportsProd product w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
            </div>
          </div>
        </div>
        <div className="page4 h-full w-full overflow-x-hidden flex gap-5">
          <h1 className="text-scroll text-black text-[40vw]">Lorem</h1>
          <h1 className="text-scroll text-black text-[40vw]">Lorem</h1>
          <h1 className="text-scroll text-black text-[40vw]">Lorem</h1>
          <h1 className="text-scroll text-black text-[40vw]">Lorem</h1>
          <h1 className="text-scroll text-black text-[40vw]">Lorem</h1>
          {/* I have to add some images with animation on them to make it look more attractive */}
        </div>
        {/* hello this side ecommerce app hii
          <button type='button' onClick={()=>{signOut()}}>Sign out</button>
        <div className='bg-blue-500 w-20 h-20 rounded-md m-5' ref={signOutRef}>
        
        </div> 
        */}
      </main>
      </div>

    
      
  );
}
