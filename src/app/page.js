'use client'

import PageContainer from "./components/containerComponents/PageContainer";
import Link from "next/link";

import { motion } from "framer-motion";
import Image from "next/image";

import { AiFillGithub } from 'react-icons/ai'
import { FaLink, FaLinkedinIn } from 'react-icons/fa'
import { CgWebsite } from "react-icons/cg";



export default function Home() {

  const variant = {
    initial: { opacity: 0, y: '25px'},
    animate: { opacity: 1, y: 0},
  }

  const iconVariant = {
    initial: {opacity: 0},
    animate: {opacity: 1,
      transition: { duration: 0.4}
    },
  }

  return (
    <motion.div 
      className="bg-[#121212] flex flex-col space-y-5 justify-center items-center w-[100vw] min-h-[100vh] py-10"
      transition={{ staggerChildren: 0.2 }}
      initial='initial'
      animate='animate'>

        {/* Page Content */}
        <div className="w-[95vw] max-w-[800px] flex flex-col space-y-4">

          {/* Title */}
          <motion.h1
            variants={variant}
            className="text-3xl sm:text-6xl text-[#E8E8E8] text-center">
            Algorithm Visualizer
          </motion.h1>

          <div className="flex flex-wrap items-center justify-center">
            
            <div className="flex flex-col justify-between m-2 space-y-2">
              <motion.p 
                className="text-[#A3BBAD] w-full max-w-[400px]"
                variants={variant}>Welcome and thank you for checking out this project.  I built this while studying for technical interviews because I wanted a way to visualize the algorithms that I was using.  I hope you enjoy using it and take some value from it!  Don't hesitate to contact me with any suggestions or feedback</motion.p>

              <div className="flex flex-row justify-center space-x-2">
                <motion.div
                  className="bg-[#A3BBAD] rounded-md text-[#121212] text-lg w-[50%] flex items-center justify-center"
                  variants={variant}>
                  <Link
                    className='w-full p-3 flex items-center justify-center'
                    href={'/pathfinding'}>
                      Pathfinding
                  </Link>
                </motion.div>
                
                <motion.div
                  className="bg-[#A3BBAD] rounded-md text-[#121212] text-lg w-[50%] flex items-center justify-center"
                  variants={variant}>
                  <Link
                    className='w-full p-3 flex items-center justify-center'
                    href={'/sorting'}>
                      Sorting
                  </Link>
                </motion.div>

              </div>
            </div>
            
            <motion.div 
              variants={variant}
              transition={{ when: 'beforeChildren', staggerChildren: 0.2 }}
              className="rounded-md bg-[#A3BBAD] p-2 space-y-2 m-2 flex flex-col">
              <Image 
                alt='Failed to Load'
                src={'/headshot.JPG'}
                width={200}
                height={200}
                className='rounded-lg'/>

                <div 
                  className="flex flex-rows justify-between">
                  <motion.a
                    variants={iconVariant}>
                    <AiFillGithub size={35} color="#121212"/>
                  </motion.a>

                  <motion.a
                    variants={iconVariant}>
                    <FaLinkedinIn size={35} color="#121212"/>
                  </motion.a>

                  <motion.a
                    variants={iconVariant}>
                    <CgWebsite size={35} color="#121212"/>
                  </motion.a>
                </div>
            </motion.div>


          </div>


        </div>

    </motion.div>
   
  )};
