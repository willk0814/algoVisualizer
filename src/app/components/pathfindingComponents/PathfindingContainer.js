'use client'

import React, { useState, useEffect } from 'react'
import PathfinderControls from './PathfinderControls'
import GridCell from './GridCell'
import { generateGrid, boundaryDriver, pathfindingDriver } from '@/app/logic/pathfindingLogic/pathfindingLogic'

import { motion } from 'framer-motion'


export default function PathfindingContainer() {

  // SV to store all data related to grid
  const [gridState, setGridState] = useState ({
    grid: [['']],
    gridMap: {},
    rows: 25, 
    cols: 25,
    starting_coords: [],
    ending_coords: [],
    weighted: false
  })

  // Generate animation sequence based on boundary
  const generateBoundaryPattern = (boundaryPattern) => {
    const { animation_sequence } = boundaryDriver(gridState, boundaryPattern)
    renderAnimationSequence(animation_sequence)
  }

  // Find a path
  const generatePath = (algo_id) => {
    const animation_sequence = pathfindingDriver(algo_id, gridState)
    renderAnimationSequence(animation_sequence)
  }

  // Handle animation sequence
  const renderAnimationSequence = ( animation_sequence ) => {
    const interval = setInterval(() => {
      if (animation_sequence.length === 0) {
        clearInterval(interval)
        return
      } 

      const [animation, ...remaining_sequence] = animation_sequence
      animation_sequence = remaining_sequence
      handleAnimation(animation)

    }, 8)
  }

  // Handle individual animation
  const handleAnimation = (current_animation) => {
    const { row, col, status } = current_animation
    setGridState(prevGridState => {
      const updatedGrid = [...prevGridState.grid]

      if (['boundary', 'start', 'goal', 'w0_unvisited'].includes(status)){
        updatedGrid[row][col] = status
      } else {
        const updated_cell = updatedGrid[row][col].substring(0,3).concat(status)
        updatedGrid[row][col] = updated_cell 
      }

      return {
        ...prevGridState,
        grid: updatedGrid
      }
    })
  }

  // Function to generate a new grid || bool: weight -> new grid
  const generateNewGrid = (weighted) => {
    // generate a new grid according to changed weight value
    const {tmpGrid, starting_coords, ending_coords, gridMap} = generateGrid(gridState.rows, gridState.cols, weighted)

    setGridState(prevGridState => ({
      ...prevGridState,
      grid: tmpGrid,
      gridMap: gridMap,
      weighted: weighted,
      starting_coords: starting_coords,
      ending_coords: ending_coords
    }))
  }

  // Generate a new grid on mount
  useEffect(() => {
    // generateNewGrid(gridState.weighted)
  }, [])

  return (
    <div className='flex flex-col w-full h-full items-center justify-start pt-[3rem] bg-[#121212]'>
        
        {/* Title */}
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
          className='text-6xl my-4'>Pathfinder</motion.h1>
          
        <div className='flex flex-row'>
            {/* Controls Container */}
            <PathfinderControls 
              weighted={gridState.weighted}
              handleGenerateGrid={generateNewGrid} 
              handleGenerateBoundary={generateBoundaryPattern}
              handleFind={generatePath}/>
            
            {/* Grid Container */}
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
              exit='initial'
              className='flex flex-col w-min space-y-1 justify-start'>
                {gridState.grid.map((row, row_indx) => (
                  <div key={row_indx} className='flex flex-row space-x-1'>
                    {row.map((cell_state, col_indx) => (
                      <GridCell key={`${row_indx}-${col_indx}`} state={cell_state} />
                    ))}
                  </div>
                ))}
            </motion.div>

        </div>
    </div>
  )
}
