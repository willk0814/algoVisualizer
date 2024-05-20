'use client'
import React from 'react'
import { motion } from 'framer-motion'

export default function SortingControls({ handleGenerateArray }) {
  return (
    <motion.div
        variants={{
            initial: { opacity: 0, x: '-10px'},
            animate: { opacity: 1, x: 0,
                transition: { delay: 0.5 }
           }
        }}
        initial='initial'
        animate='animate'
        className='flex flex-col justify-start space-y-3 p-2'>

        <div className='flex flex-col space-y-1'>
            <button
                onClick={() => handleGenerateArray()}
                className='bg-gray-700 p-2 rounded-lg text-xl disabled:bg-gray-400'>
                New Array
            </button>
        
            <div>
                <p className='max-w-[300px]'>Generate a new array of random values between 0 and 100</p>
            </div>
        </div>

        <div className='w-full h-[3px] bg-gray-700 rounded-full'></div>

        <div className='flex flex-col space-y-1'>
            <h1 className='text-xl'>Sorting Algo:</h1>
            <select
                className='bg-gray-700 p-2 rounded-lg text-xl'>
                <option>Bubble</option>
                <option>Heap</option>
                <option>Merge</option>
                <option>Quick</option>
            </select>
        </div>
        <button 
            className='bg-gray-700 p-2 rounded-lg text-xl'>
                Sort
        </button>
        <div>
            <p className='max-w-[300px]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
        </div>
    </motion.div>
  )
}
