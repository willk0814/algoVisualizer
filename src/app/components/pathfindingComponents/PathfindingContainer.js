'use client'

import React, { useState, useEffect } from 'react'
import PathfinderControls from './PathfinderControls'
import GridCell from './GridCell'
import { generateGrid, boundaryDriver, pathfindingDriver } from '@/app/logic/pathfindingLogic/pathfindingLogic'

import { motion } from 'framer-motion'
import MobilePathfindingControls from './MobilePathfindingControls'


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

  const [width, setWidth] = useState()

  // SV to toggle mobile controls
  const [showMobile, setShowMobile] = useState(false)

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
  const generateNewGrid = (weighted, cols) => {
    if (!cols){
      cols = gridState.cols
    }

    // generate a new grid according to changed weight value
    const {tmpGrid, starting_coords, ending_coords, gridMap} = generateGrid(gridState.rows, cols, weighted)

    setGridState(prevGridState => ({
      ...prevGridState,
      cols: cols,
      grid: tmpGrid,
      gridMap: gridMap,
      weighted: weighted,
      starting_coords: starting_coords,
      ending_coords: ending_coords
    }))
  }

  // Generate a new grid on mount
  useEffect(() => {
    generateNewGrid(gridState.weighted, gridState.cols)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth()
      let cols = 0

      if (w === width){
        return
      }

      if (w >= 1140){
        cols = 35
        setShowMobile(false)
      } else if (w < 1140 && w >= 930){
        cols = 25
        setShowMobile(false)
      } else if (w < 930 && w >= 830){
        setShowMobile(true)
        cols = 35
      } else if (w < 830 && w >= 600){
        setShowMobile(true)
        cols = 25
      } else if (w < 600  && w >= 400){
        setShowMobile(true)
        cols = 20
      } else if (w < 400){
        setShowMobile(true)
        cols = 15
      }
      
      console.log(`Generating a new grid with cols: ${cols}`)
      setWidth(w)
      generateNewGrid(gridState.weighted, cols) 
      
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className='flex flex-col w-full min-h-screen items-center justify-start bg-[#121212]'>
        
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
          className='text-3xl sm:text-6xl py-4 pt-[3.5rem]'>Pathfinder</motion.h1>

        {showMobile && 
          <MobilePathfindingControls 
            weighted={gridState.weighted}
            handleGenerateGrid={generateNewGrid} 
            handleGenerateBoundary={generateBoundaryPattern}
            handleFind={generatePath}
          />}
          
        <div className='flex flex-row'>
            {/* Controls Container */}
            {!showMobile && <PathfinderControls 
              weighted={gridState.weighted}
              handleGenerateGrid={generateNewGrid} 
              handleGenerateBoundary={generateBoundaryPattern}
              handleFind={generatePath}/>}
            
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
              className='flex flex-col w-min h-min space-y-1 justify-start'>
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
