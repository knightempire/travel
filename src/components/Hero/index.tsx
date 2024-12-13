"use client";
import Link from "next/link";

import { motion, useAnimation, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';


const Hero = () => {

  const controls = useAnimation();
  const { scrollY } = useScroll();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false); // Track scroll direction
  const [showBigCircle, setShowBigCircle] = useState(false); // For displaying the big circle
  
  // Intersection Observer for detecting if Hero component is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting); // Update state when Hero component enters or leaves the viewport
        });
      },
      { threshold: 0.1 }
    );
  
    const element = document.getElementById('hero');
    if (element) {
      observer.observe(element);
    }
  
    // Cleanup the observer on unmount
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);
  
  // Detect scroll direction and trigger animation change when Hero component is in view
  useEffect(() => {
    if (!isInView) return;
  
    const unsubscribe = scrollY.onChange((latestY) => {
      if (latestY > lastScrollY) {
        // Scrolling down: reverse animation and show big circle
        setIsScrollingDown(true);
        setShowBigCircle(true); // Show large circle
        controls.start({
          opacity: 0,
          pathLength: 0,
          transition: { duration: 1, ease: 'easeOut' },
        });
      } else {
        // Scrolling up: reset animation and hide big circle
        setIsScrollingDown(false);
        setShowBigCircle(false); // Hide large circle
        controls.start({
          opacity: 1,
          pathLength: 1,
          transition: { duration: 1, ease: 'easeOut' },
        });
      }
      setLastScrollY(latestY);
    });
  
    return () => unsubscribe();
  }, [scrollY, lastScrollY, controls, isInView]);
  
  // Trigger line animation when Hero is in view
  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        pathLength: 1,
        transition: { duration: 1.5, ease: 'easeOut', delay: 1.5 },
      });
    }
  }, [controls, isInView]);



  return (
    <>
      <section
        id="home"
        className="relative z-10 overflow-hidden bg-white pb-16 pt-[120px] dark:bg-gray-dark md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px] "
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            {/* Left side - Image */}
            <div className="w-full px-4 lg:w-1/2">
              {/* <div className="mx-auto max-w-[650px]">
              <motion.div
  initial={{ opacity: 0, x: -100, scale: 0.95 }}  // Slide from the left and slightly scaled down
  animate={{ opacity: 1, x: 0, scale: 1 }}       // Fade in and slide to position with scale back to normal
  transition={{
    duration: 1.5,  // Duration of animation
    ease: "easeOut",  // Easing for smoothness
    delay: 2,       // Delay before starting the animation
  }}
>
  <img
    src="https://i.imgur.com/56G0Rat.png"
    alt="ExploreIQ Hero Image"
    className="w-full h-auto"
  />
</motion.div>

              </div> */}


<div id="hero" className="flex justify-center items-center transition-transform duration-300 ease-in-out">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
    className="relative w-[400px] h-[400px]"
  >
    <motion.svg
      viewBox="0 0 400 400"
      className="w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      {/* Connecting Lines */}
      <motion.path
        className="line"
        d="M250,150 L150,50 L50,150"
        style={{ strokeWidth: '15px', stroke: '#fe6275', fill: 'none' }}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={controls}
        transition={{ duration: 1.5, delay: 3.0, ease: 'easeOut' }}
      />
      <motion.path
        className="line"
        d="M250,250 L350,150 L250,50"
        style={{ strokeWidth: '15px', stroke: '#fec47c', fill: 'none' }}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={controls}
        transition={{ duration: 1.5, delay: 3.3, ease: 'easeOut' }}
      />
      <motion.path
        className="line"
        d="M150,250 L250,350 L350,250"
        style={{ strokeWidth: '15px', stroke: '#5bce68', fill: 'none' }}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={controls}
        transition={{ duration: 1.5, delay: 3.6, ease: 'easeOut' }}
      />
      <motion.path
        className="line"
        d="M150,150 L50,250 L150,350"
        style={{ strokeWidth: '15px', stroke: '#0486bb', fill: 'none' }}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={controls}
        transition={{ duration: 1.5, delay: 3.9, ease: 'easeOut' }}
      />

      {/* Show small circles only when not scrolling down */}
      {!isScrollingDown && (
        <>
          {/* Red Circles */}
          <motion.circle
            cx="50"
            cy="50"
            r="20"
            fill="#fe6275"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.4, ease: 'easeOut' }}
          />
          <motion.circle
            cx="150"
            cy="50"
            r="20"
            fill="#fe6275"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.3, ease: 'easeOut' }}
          />
          <motion.circle
            cx="50"
            cy="150"
            r="20"
            fill="#fe6275"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1, ease: 'easeOut' }}
          />
          <motion.circle
            cx="250"
            cy="150"
            r="20"
            fill="#fe6275"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.7, ease: 'easeOut' }}
          />

          {/* Blue Circles */}
          <motion.circle
            cx="50"
            cy="350"
            r="20"
            fill="#0486bb"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.4, ease: 'easeOut' }}
          />
          <motion.circle
            cx="50"
            cy="250"
            r="20"
            fill="#0486bb"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1, ease: 'easeOut' }}
          />
          <motion.circle
            cx="150"
            cy="150"
            r="20"
            fill="#0486bb"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.7, ease: 'easeOut' }}
          />
          <motion.circle
            cx="150"
            cy="350"
            r="20"
            fill="#0486bb"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.3, ease: 'easeOut' }}
          />

          {/* Green Circles */}
          <motion.circle
            cx="350"
            cy="350"
            r="20"
            fill="#5bce68"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.4, ease: 'easeOut' }}
          />
          <motion.circle
            cx="250"
            cy="350"
            r="20"
            fill="#5bce68"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1, ease: 'easeOut' }}
          />
          <motion.circle
            cx="150"
            cy="250"
            r="20"
            fill="#5bce68"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.7, ease: 'easeOut' }}
          />
          <motion.circle
            cx="350"
            cy="250"
            r="20"
            fill="#5bce68"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.3, ease: 'easeOut' }}
          />

          {/* Yellow Circles */}
          <motion.circle
            cx="250"
            cy="50"
            r="20"
            fill="#fec47c"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.3, ease: 'easeOut' }}
          />
          <motion.circle
            cx="350"
            cy="50"
            r="20"
            fill="#fec47c"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.4, ease: 'easeOut' }}
          />
          <motion.circle
            cx="350"
            cy="150"
            r="20"
            fill="#fec47c"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1, ease: 'easeOut' }}
          />
          <motion.circle
            cx="250"
            cy="250"
            r="20"
            fill="#fec47c"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.7, ease: 'easeOut' }}
          />
        </>
      )}

      {/* Show big circle when scrolling down */}
      {isScrollingDown && showBigCircle && (

        
//         <motion.svg width="400" height="400" viewBox="0 0 400 400">

//   <defs>
//     <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
//       <stop offset="0%" style={{ stopColor: "#9e5c32", stopOpacity: 1 }} />  {/* Deep Orange */}
//       <stop offset="30%" style={{ stopColor: "#c78f56", stopOpacity: 1 }} />  {/* Burnt Amber */}
//       <stop offset="60%" style={{ stopColor: "#e2b776", stopOpacity: 1 }} />  {/* Soft Golden Yellow */}
//       <stop offset="100%" style={{ stopColor: "#f4e2c2", stopOpacity: 1 }} />  {/* Pale Gold */}
//     </linearGradient>
//   </defs>

 
//   <motion.path
//     d="M150,200 C150,120 250,120 250,200 C250,280 150,280 150,200"
//     fill="transparent"
//     stroke="url(#grad1)" 
//     strokeWidth="20"
//     initial={{ opacity: 0, rotate: 0 }}
//     animate={{ opacity: 1, rotate: 360 }}
//     transition={{ duration: 2, ease: 'easeInOut' }} 
//   />



//   <motion.text
//     x="-10" y="270"  // Position the "G" after "LET'S"
//     fontSize="200"
//     fill="url(#grad1)"  // Apply gradient fill
//     initial={{ opacity: 0 }}
//     animate={{ opacity: 1 }}
//     transition={{ duration: 1, delay: 2, ease: 'easeInOut' }} // Fade in after "LET'S"
//   >
//     G
//   </motion.text>

//   <motion.text
//   x="260" y="280"  // Position the "!" after the "G"
//   fontSize="200"
//   fill="url(#grad1)"  // Apply gradient fill
//   initial={{ opacity: 0 }}
//   animate={{ opacity: 1 }}
//   transition={{ duration: 1, delay: 2.5, ease: 'easeInOut' }} // Fade in after the "G"
// >
//   !
// </motion.text>
// </motion.svg>





<motion.svg
  xmlns="http://www.w3.org/2000/svg"
  xmlnsXlink="http://www.w3.org/1999/xlink"
  version="1.1"
  viewBox="-275 367 60 60"
  width="400"
  height="400"
  initial={{ opacity: 0, rotate: 0 }}
  animate={{ opacity: 1, rotate: 360 }}
  transition={{ duration: 2, ease: 'easeInOut' }}
>
  <motion.path
    d="M-250,425c-2.9,0-6-0.7-6-0.7c-10.9-2.7-19-12.5-19-24.3c0-1,0-1.9,0.2-2.9c3.2-0.1,7,0.5,5.9,1.6c-1.7,1.7-0.9,8.6,2.6,6c3.5-2.6,5.2-6,4.3-8.6c-0.9-2.6,6-3.4,6,0.9s-1.7,3.4-2.6,6c-0.9,2.6,0.9,2.6,1.7,3.5c0.9,0.9,3.4,2.6,0.9,8.6C-258,419.6-253.3,422.9-250,425z"
    fill="#50DD8E" // st1 color (fill="#50DD8E")
    initial={{ opacity: 0, rotate: 0 }}
    animate={{ opacity: 1, rotate: 360 }}
    transition={{ duration: 2, ease: 'easeInOut' }}
  />
  <motion.path
    d="M-232.8,401.7c1.7,1.7-1.7,2.6-2.6,5.2c-0.9,2.6-4.3,2.6-5.2,1.7c-0.9-0.9-2.6-1.7-4.3-2.6c-1.7-0.9,0-2.6,1.7-1.7c1.7,0.9,2.4-2.6,4.3-2.6C-237.9,401.7-234.5,400-232.8,401.7z"
    fill="#0486bb" // st2 color (fill="#80D6FA")
    initial={{ opacity: 0, rotate: 0 }}
    animate={{ opacity: 1, rotate: 360 }}
    transition={{ duration: 2, ease: 'easeInOut' }}
  />
  <motion.path
    d="M-240.5,376.9c7.1,2.9,12.6,9.1,14.7,16.6c-3.2,1.4-8.3,2-9.5,1.4c-1.7-0.9-1.7-5.2-4.8-5.3c-1.2,0-2.6,5.2-4.3,6c-1.7,0.9-2.6-2.6-4.3-5.2c-1.7-2.6,2.6-5.2,4.3-5.2c1.7,0,1.7-4.3,1.7-5.2c0-0.9-1.7-1.9-1.2-4.3C-242,376.3-240.5,376.9-240.5,376.9z"
    fill="#fec47c" // st3 color (fill="#50dd8e")
    initial={{ opacity: 0, rotate: 0 }}
    animate={{ opacity: 1, rotate: 360 }}
    transition={{ duration: 2, ease: 'easeInOut' }}
  />
  <motion.path
    d="M-248.9,415.7c0.9,0.9,1.7,2.6,0.9,3.4c-0.9,0.9-2.6,0.9-3.4,0C-252.7,417.9-249.7,414.8-248.9,415.7z"
    fill="#0486bb" // st1 color (fill="#50DD8E")
    initial={{ opacity: 0, rotate: 0 }}
    animate={{ opacity: 1, rotate: 360 }}
    transition={{ duration: 2, ease: 'easeInOut' }}
  />
  <motion.path
    d="M-248,419.1c0.9-0.9,0-2.6-0.9-3.4c-0.9-0.9-3.8,2.2-2.6,3.4C-250.6,420-248.9,420-248,419.1z"
    fill="#0486bb" // st2 color (fill="#80D6FA")
    initial={{ opacity: 0, rotate: 0 }}
    animate={{ opacity: 1, rotate: 360 }}
    transition={{ duration: 2, ease: 'easeInOut' }}
  />
  <motion.path
    d="M-235.4,406.9c0.9-2.6,4.3-3.5,2.6-5.2c-1.7-1.7-5.2,0-6,0c-1.9,0-2.6,3.4-4.3,2.6c-1.7-0.9-3.4,0.9-1.7,1.7c1.7,0.9,3.4,1.7,4.3,2.6C-239.7,409.5-236.2,409.5-235.4,406.9z"
    fill="#0486bb" // st2 color (fill="#80D6FA")
    initial={{ opacity: 0, rotate: 0 }}
    animate={{ opacity: 1, rotate: 360 }}
    transition={{ duration: 2, ease: 'easeInOut' }}
  />
  <motion.path
    d="M-225.2,396.5c0.2,1.1,0.2,2.3,0.2,3.5c0,13.8-11.2,25-25,25c-3.3-2.1-8-5.4-6-9.9c2.6-6,0-7.8-0.9-8.6c-0.9-0.9-2.6-0.9-1.7-3.5c0.9-2.6,2.6-1.7,2.6-6c0-4.3-6.9-3.4-6-0.9c0.9,2.6-0.9,6-4.3,8.6c-3.4,2.6-4.3-4.3-2.6-6c1.2-1.2-2.6-1.8-5.9-1.6l0.6-3.1c0.7-3.3,3.3-8.2,5.5-10.4c0,0,1.3-1.4,2.8-2.5l0,0l3.9,4.9l4-5c0.8-0.9,2.4-3.6,2.9-5.8l0.2,0c1.7-0.3,4.6-0.2,5-0.2c2.1,0,4.2,0.3,6.1,0.8c-0.5,2.4,1.2,3.4,1.2,4.3c0,0.9,0,5.2-1.7,5.2s-6,2.6-4.3,5.2c1.7,2.6,2.6,6,4.3,5.2c1.7-0.9,3.1-6.1,4.3-6c3,0.1,3,4.5,4.8,5.3c1.2,0.6,6.3,0,9.5-1.4L-225.2,396.5z"
    fill="#0486bb" // st3 color (fill="#50dd8e")
    initial={{ opacity: 0, rotate: 0 }}
    animate={{ opacity: 1, rotate: 360 }}
    transition={{ duration: 2, ease: 'easeInOut' }}
  />
  <motion.path
    d="M-261,374c0-0.5-0.5-1-1-1s-1,0.5-1,1s0.5,1,1,1S-261,374.5-261,374"
    fill="#fe6275" // st4 color (fill="#51565F")
    initial={{ opacity: 0, rotate: 0 }}
    animate={{ opacity: 1, rotate: 360 }}
    transition={{ duration: 2, ease: 'easeInOut' }}
  />
  <motion.path
    d="M-255,374c0,0.4-0.1,0.8-0.1,1.2c-0.5,2.2-2,4.9-2.9,5.8l-4,5l-3.9-4.9l-0.1-0.1c-1-1.3-3-4.5-3-7c0-3.9,3.1-7,7-7S-255,370.1-255,374"
    fill="#fe6275" // st4 color (fill="#51565F")
    initial={{ opacity: 0, rotate: 0 }}
    animate={{ opacity: 1, rotate: 360 }}
    transition={{ duration: 2, ease: 'easeInOut' }}
  />
</motion.svg>






      )}
    </motion.svg>
  </motion.div>
</div>



            </div>

            {/* Right side - Text Content */}
            <div className="w-full px-4 lg:w-1/2">
              <div className="mx-auto max-w-[700px] text-center lg:text-left">
                {/* Title Animation */}
                <motion.h1
  className="mb-7 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#a29bfe] via-[#fab1a0] to-[#f8c291] sm:text-5xl sm:leading-tight md:text-6xl md:leading-tight tracking-wide drop-shadow-2xl shining-text"
  initial={{ opacity: 0, y: -30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, delay: 0.5 }}
>
  ExploreIQ
</motion.h1>






                {/* Description Text Animation */}
                <motion.p
                  className="mb-12 text-base !leading-relaxed text-body-color dark:text-body-color-dark sm:text-lg md:text-xl"
                  initial={{ opacity: 0, y: 30 }} // Slide up from below
                  animate={{ opacity: 1, y: 0 }}    // Fade-in and slide up
                  transition={{ duration: 1, delay: 1 }} // Delay to sync with title animation
                >
                  Discover your next adventure with ExploreIQ! Our platform leverages AI to offer personalized travel recommendations, simplify itinerary planning, and make booking experiences tailored to your preferences effortless.

                </motion.p>

                {/* Buttons Animation */}
                <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }} // Slide up from below
                    animate={{ opacity: 1, y: 0 }}    // Fade-in and slide up
                    transition={{ duration: 1, delay: 1.5 }} // Delay to sync with previous animations
                  >
<button className="group flex items-center justify-start gap-2 w-auto h-10 bg-[#4766e8] text-white font-semibold rounded-full border-none shadow-lg px-4 py-1 hover:bg-[#5c7bf7] active:scale-95">
   <svg className="h-6 transition-transform duration-500 group-hover:rotate-[360deg]" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path>
   </svg>
   Begin Your Journey
</button>



                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }} // Slide up from below
                    animate={{ opacity: 1, y: 0 }}    // Fade-in and slide up
                    transition={{ duration: 1, delay: 2 }} // Delay to sync with previous animations
                  >
    
    <button className="inline-flex items-center gap-3 px-6 py-3 rounded-full font-semibold text-white bg-[#353944] overflow-hidden whitespace-nowrap hover:bg-black group">
  <span className="relative flex-shrink-0 w-6 h-6 bg-white rounded-full grid place-items-center text-[#292e39] group-hover:text-black">
    
    {/* First arrow */}
    <svg viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-2.5 transition-transform duration-300 ease-in-out group-hover:translate-x-[150%] group-hover:translate-y-[-150%]">
      <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" fill="currentColor"></path>
    </svg>

    {/* Second arrow */}
    <svg viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute w-2.5 h-2.5 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 translate-x-[-150%] translate-y-[150%]">
      <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" fill="currentColor"></path>
    </svg>

  </span>
  Discover 
</button>


                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative SVGs with Animations */}
        <motion.div
          className="absolute right-0 top-0 z-[-1] opacity-30 lg:opacity-100"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <svg
            width="450"
            height="556"
            viewBox="0 0 450 556"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="277"
              cy="63"
              r="225"
              fill="url(#paint0_linear_25:217)"
            />
            <circle
              cx="17.9997"
              cy="182"
              r="18"
              fill="url(#paint1_radial_25:217)"
            />
            <circle
              cx="76.9997"
              cy="288"
              r="34"
              fill="url(#paint2_radial_25:217)"
            />
            <circle
              cx="325.486"
              cy="302.87"
              r="180"
              transform="rotate(-37.6852 325.486 302.87)"
              fill="url(#paint3_linear_25:217)"
            />
            <circle
              opacity="0.8"
              cx="184.521"
              cy="315.521"
              r="132.862"
              transform="rotate(114.874 184.521 315.521)"
              stroke="url(#paint4_linear_25:217)"
            />
            <circle
              opacity="0.8"
              cx="356"
              cy="290"
              r="179.5"
              transform="rotate(-30 356 290)"
              stroke="url(#paint5_linear_25:217)"
            />
            <circle
              opacity="0.8"
              cx="191.659"
              cy="302.659"
              r="133.362"
              transform="rotate(133.319 191.659 302.659)"
              fill="url(#paint6_linear_25:217)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_25:217"
                x1="-54.5003"
                y1="-178"
                x2="222"
                y2="288"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <radialGradient
                id="paint1_radial_25:217"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(17.9997 182) rotate(90) scale(18)"
              >
                <stop offset="0.145833" stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.08" />
              </radialGradient>
              <radialGradient
                id="paint2_radial_25:217"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(76.9997 288) rotate(90) scale(34)"
              >
                <stop offset="0.145833" stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.08" />
              </radialGradient>
              <linearGradient
                id="paint3_linear_25:217"
                x1="226.775"
                y1="-66.1548"
                x2="292.157"
                y2="351.421"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint4_linear_25:217"
                x1="184.521"
                y1="182.159"
                x2="184.521"
                y2="448.882"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint5_linear_25:217"
                x1="356"
                y1="110"
                x2="356"
                y2="470"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint6_linear_25:217"
                x1="118.524"
                y1="29.2497"
                x2="166.965"
                y2="338.63"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        <motion.div
          className="absolute bottom-0 left-0 z-[-1] opacity-30 lg:opacity-100"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <svg
            width="364"
            height="201"
            viewBox="0 0 364 201"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.88928 72.3303C33.6599 66.4798 101.397 64.9086 150.178 105.427C211.155 156.076 229.59 162.093 264.333 166.607C299.076 171.12 337.718 183.657 362.889 212.24"
              stroke="url(#paint0_linear_25:218)"
            />
            <path
              d="M-22.1107 72.3303C5.65989 66.4798 73.3965 64.9086 122.178 105.427C183.155 156.076 201.59 162.093 236.333 166.607C271.076 171.12 309.718 183.657 334.889 212.24"
              stroke="url(#paint1_linear_25:218)"
            />
            <path
              d="M-53.1107 72.3303C-25.3401 66.4798 42.3965 64.9086 91.1783 105.427C152.155 156.076 170.59 162.093 205.333 166.607C240.076 171.12 278.718 183.657 303.889 212.24"
              stroke="url(#paint2_linear_25:218)"
            />
            <path
              d="M-98.1618 65.0889C-68.1416 60.0601 4.73364 60.4882 56.0734 102.431C120.248 154.86 139.905 161.419 177.137 166.956C214.37 172.493 255.575 186.165 281.856 215.481"
              stroke="url(#paint3_linear_25:218)"
            />
            <circle
              opacity="0.8"
              cx="214.505"
              cy="60.5054"
              r="49.7205"
              transform="rotate(-13.421 214.505 60.5054)"
              stroke="url(#paint4_linear_25:218)"
            />
            <circle cx="220" cy="63" r="43" fill="url(#paint5_radial_25:218)" />
            <defs>
              <linearGradient
                id="paint0_linear_25:218"
                x1="184.389"
                y1="69.2405"
                x2="184.389"
                y2="212.24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_25:218"
                x1="156.389"
                y1="69.2405"
                x2="156.389"
                y2="212.24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_25:218"
                x1="125.389"
                y1="69.2405"
                x2="125.389"
                y2="212.24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="paint3_linear_25:218"
                x1="93.8507"
                y1="67.2674"
                x2="89.9278"
                y2="210.214"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="paint4_linear_25:218"
                x1="214.505"
                y1="10.2849"
                x2="212.684"
                y2="99.5816"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <radialGradient
                id="paint5_radial_25:218"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(220 63) rotate(90) scale(43)"
              >
                <stop offset="0.145833" stopColor="white" stopOpacity="0" />
                <stop offset="1" stopColor="white" stopOpacity="0.08" />
              </radialGradient>
            </defs>
          </svg>
        </motion.div>
      </section>
    </>
  );
};

export default Hero;
