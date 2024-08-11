"use client"
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState , useRef} from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { Zenitho, Novatrix } from "uvcanvas"
import {useGSAP} from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Home() {

  const {contextSafe} = useGSAP();
  const mainRef = useRef(null);
  const cursorRef = useRef(null);

  //changing the color of mouse follower on entering and leaving the page 3
  const mouseEnterPage3 = contextSafe((e: React.MouseEvent)=>{
    gsap.to(cursorRef.current,{
      backgroundColor:'#f1f5f9',
    })
  })
  const mouseLeavePage3 = contextSafe((e: React.MouseEvent)=>{
    gsap.to(cursorRef.current,{
      backgroundColor:'#a855f7', 
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
      x:e.screenX-10,
      y:e.screenY-60,
      ease:'back.out',
      delay:0.1
    })
  })

  // scalinng the cursor on mouse enter and mouse leave
  const mouseEnter = contextSafe((e: React.MouseEvent)=>{
    gsap.to(cursorRef.current,{
      scale:3,
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
      <main onMouseMove={mouseMove} ref={mainRef} className="w-full">
        <div className="h-7 w-7 rounded-full bg-purple-500 opacity-50 fixed" ref={cursorRef}></div>
        <div className="home h-screen w-full  flex justify-center items-center">
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
              <div  onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} className='headings w-96 h-48 shadow-xl bg-purple-300 bg-opacity-70 rounded-lg'>
                <div className="category-title text-black w-fit text-2xl p-2 m-2">Electronics</div>
                {/* images of the products */}
              </div>
              <div  onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} className='headings w-96 h-48 shadow-xl bg-purple-300 bg-opacity-70 rounded-lg'>
                <div className="category-title text-black w-fit text-2xl p-2 m-2">Fashion</div>
                {/* images of the products */}
              </div>
              <div  onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} className='headings w-96 h-48 shadow-xl bg-purple-300 bg-opacity-70 rounded-lg'>
                <div className="category-title text-black w-fit text-2xl p-2 m-2">Home and Furniture</div>
                {/* images of the products */}
              </div>
            </div>
            <div className="category2 flex flex-col items-center space-y-20">
              <div  onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} className='headings w-96 h-48 shadow-xl bg-purple-300 bg-opacity-70 rounded-lg'>
                <div className="category-title text-black w-fit text-2xl p-2 m-2">Books</div>
                {/* images of the products */}
              </div>
              <div  onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} className='headings w-96 h-48 shadow-xl bg-purple-300 bg-opacity-70 rounded-lg'>
                <div className="category-title text-black w-fit text-2xl p-2 m-2">Personal Care</div>
                {/* images of the products */}
              </div>
              <div  onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} className='headings w-96 h-48 shadow-xl bg-purple-300 bg-opacity-70 rounded-lg'>
                <div className="category-title text-black w-fit text-2xl p-2 m-2">Sports and outdoors</div>
                {/* images of the products */}
              </div>
            </div>
          </div>
        </div>
        <div onMouseEnter={mouseEnterPage3} onMouseLeave={mouseLeavePage3} className="page3 bg-purple-400 h-fit py-20 space-y-20">
          <div className='flex flex-col'>
            <div className="hidden"></div>
            <div className='px-2 py-3 ml-10 mb-10 text-3xl font-bold bg-slate-100 rounded-md text-purple-800 w-fit'>Electronics</div>
            <div className="electProducts flex items-center justify-around">
              <div className="eleProd1 w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
              <div className="eleProd2 w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
              <div className="eleProd3 w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
              <div className="eleProd4 w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
              <div className="eleProd5 w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
            </div>
          </div>
          <div className='flex flex-col'>
            <div className="hidden"></div>
            <div className='px-2 py-3 m-10 text-3xl font-bold bg-slate-100 rounded-md text-purple-800 w-fit'>Fashion</div>
            <div className="fashionProducts flex items-center justify-around">
              <div className="fashionProd1 w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
              <div className="fashionProd2 w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
              <div className="fashionProd3 w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
              <div className="fashionProd4 w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
              <div className="fashionProd5 w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
            </div>
          </div>
          <div className='flex flex-col'>
            <div className="hidden"></div>
            <div className='px-2 py-3 m-10 text-3xl font-bold bg-slate-100 rounded-md text-purple-800 w-fit'>Home and Furniture</div>
            <div className="homeProducts flex items-center justify-around">
              <div className="homeProd1 w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
              <div className="homeProd2 w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
              <div className="homeProd3 w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
              <div className="homeProd4 w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
              <div className="homeProd5 w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
            </div>
          </div>
          <div className='flex flex-col'>
            <div className="hidden"></div>
            <div className='px-2 py-3 m-10 text-3xl font-bold bg-slate-100 rounded-md text-purple-800 w-fit'>Books</div>
            <div className="booksProducts flex items-center justify-around">
              <div className="booksProd1 w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
              <div className="booksProd2 w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
              <div className="booksProd3 w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
              <div className="booksProd4 w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
              <div className="booksProd5 w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
            </div>
          </div>
          <div className='flex flex-col'>
            <div className="hidden"></div>
            <div className='px-2 py-3 m-10 text-3xl font-bold bg-slate-100 rounded-md text-purple-800 w-fit'>Personal care</div>
            <div className="personalProducts flex items-center justify-around">
              <div className="personalProd1 w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
              <div className="personalProd2 w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
              <div className="personalProd3 w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
              <div className="personalProd4 w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
              <div className="personalProd5 w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
            </div>
          </div>
          <div className='flex flex-col'>
            <div className="hidden"></div>
            <div className='px-2 py-3 m-10 text-3xl font-bold bg-slate-100 rounded-md text-purple-800 w-fit'>Sports and Outdoors</div>
            <div className="sportsProducts flex items-center justify-around">
              <div className="sportsProd1 w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
              <div className="sportsProd2 w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
              <div className="sportsProd3 w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
              <div className="sportsProd4 w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
                <div className="title text-xl font-semibold">Title</div>
                <Image src='' alt="noimg"/>
                <div className="price text-xl font-bold">price</div>
                <div className="description text-sm">Lorem ipsum dolor sit.</div>
              </div>
              <div className="sportsProd5 w-48 h-48 p-4 m-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-lg flex flex-col gap-3 justify-center">
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
        <div className="page5 min-h-screen">lorem</div>
      </main>


    
      {/* hello this side ecommerce app hii
        <button type='button' onClick={()=>{signOut()}}>Sign out</button>
      <div className='bg-blue-500 w-20 h-20 rounded-md m-5' ref={signOutRef}>

      </div> 
      */}
      
    </div>
  );
}
