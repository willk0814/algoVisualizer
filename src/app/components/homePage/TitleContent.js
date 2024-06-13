'use client'

import Link from "next/link";

import { motion } from "framer-motion";
import Image from "next/image";

import { AiFillGithub } from 'react-icons/ai'
import { FaLinkedinIn } from 'react-icons/fa'
import { CgWebsite } from "react-icons/cg";


export default function TitleContent() {

  return (
        <motion.div 
            className="w-[95vw] max-w-[800px] flex flex-col space-y-4"
            variants={{
              initial: { opacity: 0, y: '50px'},
              animate: { opacity: 1, y: 0}
            }}
            initial='initial'
            animate='animate'>

          {/* Title */}
          <motion.h1
            className="text-[1.6rem] sm:text-6xl text-[#E8E8E8] text-center">
            Algorithm Visualizer
          </motion.h1>

          <div className="flex flex-wrap items-center justify-center">
            
            <div className="flex flex-col justify-between m-2 space-y-2">
                <motion.p 
                    className="text-[#A3BBAD] w-full max-w-[400px]">
                        Welcome and thank you for checking out this project.  I built this while studying for technical interviews because I wanted a way to visualize the algorithms that I was using.  I hope you enjoy using it and take some value from it!  Don't hesitate to contact me with any suggestions or feedback
                </motion.p>

              <div className="flex flex-row justify-center space-x-2">
                    <motion.div
                        className="bg-[#A3BBAD] rounded-md text-[#121212] text-lg w-[50%] flex items-center justify-center">
                        <Link
                            className='w-full p-3 flex items-center justify-center'
                            href={'/pathfinding'}>
                            Pathfinding
                        </Link>
                    </motion.div>
                
                    <motion.div
                        className="bg-[#A3BBAD] rounded-md text-[#121212] text-lg w-[50%] flex items-center justify-center">
                            <Link
                                className='w-full p-3 flex items-center justify-center'
                                href={'/sorting'}>
                                Sorting
                            </Link>
                    </motion.div>

              </div>
            </div>
            
            <motion.div
              className="rounded-md bg-[#A3BBAD] p-2 space-y-2 m-2 flex flex-col">
                <Image 
                    alt='Failed to Load'
                    src={'/headshot.JPG'}
                    width={200}
                    height={200}
                    className='rounded-lg'/>

                <motion.div 
                  className="flex flex-rows justify-between">
                  <motion.a
                    href='https://github.com/willk0814' 
                    target='_blank'
                    rel='noreferrer'
                    whileHover = {{boxShadow: '0 0 10px 5px rgba(18, 18, 18, 0.5)'}}
                    className="rounded-md">
                    <AiFillGithub size={35} color="#121212"/>
                  </motion.a>

                  <motion.a
                    href='https://linkedin.com/in/will-koenig' 
                    target='_blank'
                    rel='noreferrer'
                    whileHover = {{boxShadow: '0 0 10px 5px rgba(18, 18, 18, 0.5)'}}
                    className="rounded-md">
                    <FaLinkedinIn size={35} color="#121212"/>
                  </motion.a>

                  <motion.a
                    href='https://willkoenig.info' 
                    target='_blank'
                    rel='noreferrer'
                    whileHover = {{boxShadow: '0 0 10px 5px rgba(18, 18, 18, 0.5)'}}
                    className="rounded-md">
                    <CgWebsite size={35} color="#121212"/>
                  </motion.a>
                </motion.div>
            </motion.div>


          </div>


        </motion.div>
  )
}
