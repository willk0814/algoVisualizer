'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import SortingControls from './SortingControls'
import { generateArray } from '@/app/logic/sortingLogic/sortingLogic'

export default function SortingContainer() {

  const [displayArray, setDisplayArray] = useState([])


  const generateNewArray = () => {
    const tmpArray = generateArray(70, 100)
    setDisplayArray(tmpArray)
  }
  useEffect(() => {
    const tmpArray = generateArray(70, 100)

    setDisplayArray(tmpArray)
  }, [])

  return (
    <div className='flex flex-col w-full h-full items-center justify-center bg-[#121212]'>
        <motion.h1 
          variants={{
            initial: { opacity: 0, y: '-10px'},
            animate: { opacity: 1, y: 0,
              transition: {
                delay: 0.5
              }
             }
          }}
          initial='initial'
          animate='animate'
          exit='initial'
          className='text-8xl my-4'>Sorter</motion.h1>

        <div className='flex flex-row'>
          <SortingControls handleGenerateArray={generateNewArray}/>
          <motion.div
            variants={{
              initial: { opacity: 0, x: '10px'},
              animate: { opacity: 1, y: 0,
                transition: {
                  delay: 0.5
                }
              }
            }}
            initial='initial'
            animate='animate'
            className='flex flex-row space-x-1 h-[75vh]'>
              {displayArray.map((value, indx) => (
                  <div
                    key={indx}
                    className='w-[8px] rounded-lg bg-gray-400'
                    style={{height: `${value * 7}px`}}></div>

              ))}
          </motion.div>
        </div>
    </div>
  )
}
