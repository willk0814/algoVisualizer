'use client'

import React, { useState, useEffect, useRef } from 'react'
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

  // const [width, setWidth] = useState(window.innerWidth)
  const prevWidthRef = useRef()

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

  // Function to set the number of columns when the window is resized
  const handleResize = () => {
    const w = window.innerWidth
    const prevWidth = prevWidthRef.current
    
    // check to see if prevWidth === current width
    if (prevWidth === w && gridState.cols === compute_cols(w).cols){
      return
    } else {
      const { cols, mobile } = compute_cols(w)
      
      setShowMobile(mobile)
      prevWidthRef.current = w
      generateNewGrid(gridState.weighted, cols) 
    }
  }

  const compute_cols = (width) => {

    const cols = {
      'group_1': {
        lower_bound: 0,
        upper_bound: 400,
        cols: 15,
        mobile: true
      },
      'group_2': {
        lower_bound: 400,
        upper_bound: 600,
        cols: 20,
        mobile: true
      },
      'group_3': {
        lower_bound: 600,
        upper_bound: 830,
        cols: 25,
        mobile: true
      },
      'group_4': {
        lower_bound: 830,
        upper_bound: 930,
        cols: 35,
        mobile: true
      },
      'group_5': {
        lower_bound: 930,
        upper_bound: 1140,
        cols: 25,
        mobile: false
      },
      'group_6': {
        lower_bound: 1140,
        upper_bound: Infinity,
        cols: 35,
        mobile: false
      },
    }

    const cols_keys = Object.keys(cols);
    for (let i = 0; i < cols_keys.length; i++) {
      const current_group = cols[cols_keys[i]];
      if (width >= current_group.lower_bound && width < current_group.upper_bound) {
        return {
          cols: current_group.cols, 
          mobile: current_group.mobile};
      }
    }
    return {cols: null, mobile: null}
  }

  // Generate a new grid on mount
  useEffect(() => {
    generateNewGrid(gridState.weighted, gridState.cols)
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className='flex flex-col w-full min-h-[100vh] items-center justify-start bg-[#121212]'>
        
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
