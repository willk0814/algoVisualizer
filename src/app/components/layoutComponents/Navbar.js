'use client'
import Link from 'next/link'
import React from 'react'

import { motion, useCycle, AnimatePresence, MotionConfig } from 'framer-motion'

export default function Navbar() {

  const [showNav, toggleNav] = useCycle(false, true)
  return (
    <div className='fixed left-0 w-full h-20 z-10'>
        <div className='flex w-full h-full justify-end items-center pr-2'>
          <motion.div
            className='border-2 border-white flex absolute top-2 right-2 rounded-md bg-[#121212]'
            variants={{
              closed: { width: '40px', height: '40px',
                transition: {when: 'afterChildren'}
              },
              open: { width: '300px', originX: 1, originY: 0, height: '150px',
                transition: {when: 'beforeChildren'}
              }
            }}
            initial='closed'
            animate={showNav ? 'open' : 'closed'}
            exit='closed'>
              
            <motion.button 
              className='flex fixed top-4 right-4 flex-col items-center justify-center space-y-2 z-20'
              onClick={() => toggleNav()}
              animate={showNav ? 'open' : 'closed'}>
                <motion.span 
                  variants={{
                    open: { rotate: 45, y: 11, backgroundColor: '#A3BBAD' },
                    closed: { rotate: 0, y: 0 }
                  }} 
                  className='bg-[#E8E8E8] rounded-lg w-6 h-[3px]'></motion.span>
                <motion.span 
                  variants={{
                    open: { opacity: 0 },
                    closed: { opacity: 1 }
                  }}
                  className='bg-[#E8E8E8] rounded-lg w-6 h-[3px]'></motion.span>
                <motion.span 
                  variants = {{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -11, backgroundColor: '#A3BBAD' }
                  }}
                  className='bg-[#E8E8E8] rounded-lg w-6 h-[3px]'></motion.span>
              </motion.button>

                
              {showNav && <motion.div
                className='flex flex-col justify-between h-full p-3'
                variants={{
                  open: {opacity: 1,
                    transition: {when: 'beforeChildren', staggerChildren: 0.2}
                  },
                  closed: {opacity: 0}
                }}
                initial='closed'
                animate={showNav? 'open' : 'closed'}
                exit='closed'>
                  <motion.div
                    variants={{
                      open: {opacity: 1},
                      closed: {opacity: 0}
                    }}>
                    <Link 
                      href={'/'}>
                      <motion.h1 
                        className='text-2xl text-[#E8E8E8]'
                        whileHover={{ color: '#A3BBAD'}}>Home</motion.h1>   
                    </Link>
                  </motion.div>
                  
                  <motion.div
                    variants={{
                      open: {opacity: 1},
                      closed: {opacity: 0}
                    }}>
                    <Link href={'/pathfinding'}>
                      <motion.h1 
                        className='text-2xl text-[#E8E8E8]'
                        whileHover={{ color: '#A3BBAD'}}>Pathfinder</motion.h1>  
                    </Link>
                  </motion.div>

                  
                  <motion.div
                    variants={{
                      open: {opacity: 1},
                      closed: {opacity: 0}
                    }}>
                    <Link href={'/sorting'}>
                      <motion.h1 
                        className='text-2xl text-[#E8E8E8]'
                        whileHover={{ color: '#A3BBAD'}}>Sorting</motion.h1>    
                    </Link>
                  </motion.div>
              </motion.div>}
          </motion.div>
        </div>
    </div>
  )
}
