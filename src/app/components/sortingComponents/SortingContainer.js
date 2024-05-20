'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import SortingControls from './SortingControls'
import { SortAnimation, generateArray, sortingDriver } from '@/app/logic/sortingLogic/sortingLogic'
import ArrayBar from './ArrayBar'

export default function SortingContainer() {

  const [displayArray, setDisplayArray] = useState([])
  const [speedVal, setSpeedVal] = useState(200)

  const generateNewArray = () => {
    const tmpArray = generateArray(50, 100)
    setDisplayArray(tmpArray)
  }

  const handleSetSpeedVal = ( reduce ) => {
    if (reduce && speedVal >= 50){
      setSpeedVal(prevSpeedVal => prevSpeedVal - 25)
    } else if (!reduce && speedVal <= 350) {
      setSpeedVal(prevSpeedVal => prevSpeedVal + 25)
    }
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


    }, speedVal)
  }

  const handleAnimation = (animation) => {
    const { status, indx1, indx2 } = animation
    console.log('Rendering Animation: ', animation)


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

      console.log('Post swap animation: ', updatedArray)
      return (
        updatedArray
      )
    })
  }

  useEffect(() => {
    const tmpArray = generateArray(50, 100)

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

        <div className='flex flex-row'>
          <SortingControls 
            handleGenerateArray={generateNewArray}
            handleSort={handleSort}
            speedVal={speedVal}
            setSpeedVal={handleSetSpeedVal}/>
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
              {displayArray.map((element, indx) => {
                const {value, status} = element
                return(
                  <ArrayBar key={indx} value={value} status={status} />

              )})}
          </motion.div>
        </div>
    </div>
  )
}
