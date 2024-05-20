'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import ArrayBar from './ArrayBar'

import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";


export default function SortingControls({ handleGenerateArray, handleSort, 
    speedVal, setSpeedVal }) {
  
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
                    className='bg-gray-700 p-2 rounded-lg text-md disabled:bg-gray-400'>
                    New Array
                </button>
            
                <div>
                    <p className='max-w-[300px]'>Generate a new array of random values between 0 and 100</p>
                </div>
            </div>

            <div className='w-full h-[3px] bg-gray-700 rounded-full'></div>

            <div className='flex flex-col space-y-1'>
                <h1 className='text-md'>Sorting Algo:</h1>
                <select
                    className='bg-gray-700 p-2 rounded-lg text-md'>
                    <option>Bubble</option>
                    <option>Heap</option>
                    <option>Merge</option>
                    <option>Quick</option>
                </select>
            </div>
            <button 
                onClick={() => handleSort('bubble')}
                className='bg-gray-700 p-2 rounded-lg text-md'>
                    Sort
            </button>
            <div>
                <p className='max-w-[300px]'>Bubble sort moves one val into position during each iteration; iteratively finding the largest val and moving it into position</p>
            </div>

            <div className='w-full h-[3px] bg-gray-700 rounded-full'></div>
            
            <div className='flex flex-row space-x-2 justify-between items-center'>
                <div className='flex flex-col space-y-1'>
                    <h1 className='text-md'>Legend:</h1>
                    
                    <div className='flex flex-row items-center space-x-1'>
                        <ArrayBar value={3} status={'unsorted'} />
                        <h1>Unsorted</h1>
                    </div>
                    <div className='flex flex-row items-center space-x-1'>
                        <ArrayBar value={3} status={'comparing'} />
                        <h1>Comparing</h1>
                    </div>
                    <div className='flex flex-row items-center space-x-1'>
                        <ArrayBar value={3} status={'swapping'} />
                        <h1>Swapping</h1>
                    </div>
                    <div className='flex flex-row items-center space-x-1'>
                        <ArrayBar value={3} status={'sorted'} />
                        <h1>Sorted</h1>
                    </div>
                </div>

                <div className='h-full w-[3px] bg-gray-700 rounded-full'></div>

                <div className='flex flex-col w-full h-full'>
                    <h1>Animation Delay:</h1>
                    <div className='flex flex-row space-x-2 items-center justify-center'>
                        <div className='flex bg-gray-700 py-3 px-2 rounded-lg'>
                            <h1>{`${speedVal} ms.`}</h1>
                        </div>

                        <div className='flex flex-col space-y-2'>
                            <button 
                                className='bg-gray-700 p-1 rounded-lg disabled:bg-gray-400'
                                onClick={() => setSpeedVal(false)}
                                disabled={speedVal === 375}>
                                <IoIosArrowUp size={30}/>
                            </button>

                            <button 
                                className='bg-gray-700 p-1 rounded-lg disabled:bg-gray-400'
                                onClick={() => setSpeedVal(true)}
                                disabled={speedVal === 25}>
                                <IoIosArrowDown size={30}/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
        </motion.div>
  )}
