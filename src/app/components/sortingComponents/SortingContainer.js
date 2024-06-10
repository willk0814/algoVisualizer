'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import SortingControls from './SortingControls'
import { SortAnimation, generateArray, sortingDriver } from '@/app/logic/sortingLogic/sortingLogic'
import ArrayBar from './ArrayBar'
import InfoBlock from './InfoBlock'

import { FaPause } from "react-icons/fa";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";



export default function SortingContainer() {

  const [displayArray, setDisplayArray] = useState([])
  const [displayInfo, setDisplayInfo] = useState([])


  const generateNewArray = () => {
    const tmpArray = generateArray(50, 100)
    setDisplayArray(tmpArray)
  }

  const handleSort = (algo_id) => {
    const animation_sequence = sortingDriver(algo_id, displayArray)
    renderAnimationSequence(animation_sequence)
  }

  const renderAnimationSequence = (animation_sequence) => {
    let prior_animation = null

    const interval = setInterval(() => {
      if (animation_sequence.length === 0){
        // clean-up prior animation
        if(prior_animation){
          const { status, indx1, indx2 } = prior_animation
          if (status !== 'sorted'){
            const cleanup_animation = new SortAnimation('unsorted', indx1, indx2)
            handleAnimation(cleanup_animation)
          }
        }

        clearInterval(interval)
        return
      }

      // clean-up prior animation
      if(prior_animation){
        const { status, indx1, indx2 } = prior_animation
        if (status !== 'sorted'){
          const cleanup_animation = new SortAnimation('unsorted', indx1, indx2)
          handleAnimation(cleanup_animation)
        }
      }
      // render current animation
      const [animation, ...remaining_sequence] = animation_sequence
      animation_sequence = remaining_sequence
      handleAnimation(animation)
      prior_animation = animation


    }, 200)
  }

  const handleAnimation = (animation) => {
    const { status, indx1, indx2 } = animation
    // console.log('Rendering Animation: ', animation)

    setDisplayArray(prevDisplayArray => {
      const updatedArray = [...prevDisplayArray]
      
      if (status === 'swapping') {
        const temp = updatedArray[indx1].value
        updatedArray[indx1] = {
          ...updatedArray[indx1],
          value: updatedArray[indx2].value
        };
        updatedArray[indx2] = {
          ...updatedArray[indx2],
          value: temp
        };
      }

      updatedArray[indx1] = {
        ...updatedArray[indx1],
        status: status
      }

      updatedArray[indx2] = {
        ...updatedArray[indx2],
        status: status
      }

      return (
        updatedArray
      )
    })

    if (['comparing', 'swapping', 'sorted'].includes(status)){
      setDisplayInfo(prevDisplayInfo => {
        const newInfo = {
          status: status,
          indices: status === 'sorted' ? [indx1] : [indx1, indx2]
        };
    
        return [newInfo, ...prevDisplayInfo];
      });
    }
  }

  useEffect(() => {
    const tmpArray = generateArray(50, 60)

    setDisplayArray(tmpArray)
  }, [])

  return (
    <div className='flex flex-col w-full h-full pt-20 justify-start items-center bg-[#121212]'>
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
          className='text-6xl my-4'>Sorter</motion.h1>

        <div className='flex flex-row h-[75vh]'>
          {/* Controls */}
          <SortingControls 
            handleGenerateArray={generateNewArray}
            handleSort={handleSort}/>
          
          {/* Array */}
          <motion.div
            variants={{
              initial: { opacity: 0, x: '10px'},
              animate: { opacity: 1, x: 0,
                transition: {
                  delay: 0.5
                }
              }
            }}
            initial='initial'
            animate='animate'
            className='flex flex-row space-x-1 border-2 border-gray-600 rounded-lg p-2'>
              {displayArray.map((element, indx) => {
                const {value, status} = element
                return(
                  <ArrayBar key={indx} value={value} status={status} />

              )})}
          </motion.div>

          
          {/* Information & Playback Controls Column*/}
          <div className='flex flex-col'>
            {/* Information Container */}
            <motion.div 
              className='flex flex-col flex-1 border-2 border-gray-600 rounded-lg p-2'
              variants={{
                initial: { opacity: 0, x: '10px' },
                animate: { opacity: 1, x: 0,
                  transition: { delay: 0.8 }
                }
              }}
              initial='initial'
              animate='animate'>
              <h1 className='text-lg'>Processing Steps</h1>
              <div
                className='flex flex-col overflow-y-scroll w-[250px] flex-1 max-h-[350px]'>
                  
                  {displayInfo.map((element, indx) => {
                    return(
                      <InfoBlock 
                        key={indx}
                        action_desc={element} />
                    )
                  })}
              </div>
            </motion.div>
              
            {/* Playback Controls Container */}
            <motion.div 
              className='flex flex-col border-2 border-gray-600 rounded-lg flex-1 space-y-2 justify-center'
              variants={{
                initial: { opacity: 0, x: '10px' },
                animate: { opacity: 1, x: 0,
                  transition: { delay: 0.8 }
                 }
              }}
              initial='initial'
              animate='animate'>
                <div className='flex flex-row space-x-2 items-center justify-center'>
                  <button className='p-2 bg-gray-600 rounded-lg'>
                    <FaAngleDoubleLeft size={35}/>
                  </button>
                  <button className='p-2 bg-gray-600 rounded-lg'>
                    <FaPause size={35}/>
                  </button>
                  <button className='p-2 bg-gray-600 rounded-lg'>
                    <FaAngleDoubleRight size={35}/>
                  </button>
                </div>

                <div className='flex items-center justify-center p-2 rounded-lg'>
                  <h1 className='text-2xl bg-gray-600 p-2 rounded-lg'>250 m.s.</h1>
                </div>


            </motion.div>
          
          
          </div>

        </div>
    </div>
  )
}
