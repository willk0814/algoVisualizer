'use client'
import React from 'react'

import { motion } from 'framer-motion'
import GridCell from './GridCell'

export default function PathfinderControls({ 
  weighted, handleGenerateGrid,
  handleGenerateBoundary }) {


  return (
    <motion.div
      variants={{
        initial: { opacity: 0, x: '-10px'},
        animate: { opacity: 1, x: 0,
          transition: {
            delay: 0.5
          }
         }
      }}
      initial='initial'
      animate='animate'
      className='flex flex-col justify-center item-start space-y-2 p-2'>
      
      <div className='flex flex-col space-y-1'>
        <h1 className='text-md'>Grid Type:</h1>
        <div className='flex flex-row space-x-1'>
          <button 
            onClick={() => handleGenerateGrid(true)}
            disabled={weighted}
            className='bg-gray-700 p-2 rounded-lg text-md disabled:bg-gray-400'>
              Weighted</button>
          <button 
            onClick={() => handleGenerateGrid(false)}
            disabled={!weighted}
            className='bg-gray-700 p-2 rounded-lg text-md disabled:bg-gray-400'>
              Unweighted
          </button>
      </div>

        <div>
          {!weighted? (
            <p className='max-w-[300px]'>In an unweighted grid or graph the 'cost' of traveling to each square or node is identical</p>
          ) : (
            <div className='flex flex-col space-y-1'>
              <p className='max-w-[300px]'>In a weighted grid each node has a cost associated with it</p>
              <div className='flex flex-row space-x-2'>
                <div className='flex flex-row items-center space-x-1'>
                  <GridCell state={'w0_unvisited'} />
                  <h1>0</h1>
                </div>
                <div className='flex flex-row items-center space-x-1'>
                  <GridCell state={'w1_unvisited'} />
                  <h1>1</h1>
                </div>
                <div className='flex flex-row items-center space-x-1'>
                  <GridCell state={'w2_unvisited'} />
                  <h1>2</h1>
                </div>
                <div className='flex flex-row items-center space-x-1'>
                  <GridCell state={'w3_unvisited'} />
                  <h1>3</h1>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className='w-full h-[3px] bg-gray-700 rounded-full'></div>

      <div className='flex flex-col space-y-1'>
        <h1 className='text-md'>Maze Type:</h1>
        <select
          className='bg-gray-700 p-2 rounded-lg text-md'>
          <option>Horizontal Division</option>
          <option>Vertical Division</option>
          <option>Flappy Bird</option>
        </select>
      </div>
      <button 
        onClick={() => handleGenerateBoundary('h_div')}
        className='bg-gray-700 p-2 rounded-lg text-md'>Generate</button>
      <div>
          <p className='max-w-[300px]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
        </div>
      <div className='w-full h-[3px] bg-gray-700 rounded-full'></div>

      <div className='flex flex-col space-y-1'>
        <h1 className='text-md'>Algorithm:</h1>
        <select
          className='bg-gray-700 p-2 rounded-lg text-md'>
          <option>BFS</option>
          <option>DFS</option>
          <option>Dijksta</option>
          <option>A*</option>
        </select>
      </div>

      <button className='bg-gray-700 p-2 rounded-lg text-md'>Find!</button>
      <div>
          <p className='max-w-[300px]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
      </div>

    </motion.div>
  )
}
