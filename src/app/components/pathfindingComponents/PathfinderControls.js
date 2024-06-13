'use client'
import React, { useState, useEffect } from 'react'

import { motion } from 'framer-motion'
import GridCell from './GridCell'

export default function PathfinderControls({ 
  weighted, handleGenerateGrid,
  handleGenerateBoundary, handleFind }) {

    const [selectedAlgo, setSelectedAlgo] = useState('none')

    const algoInfo = {
      'BFS': 'BFS is unweighted and undirected and guarantees the shortest path',
      'DFS': 'DFS is unweighted and undirected and does not guarantee the shortest path',
      'dijikstra': "Dijikstra's algorithm is weighted and directed and guarantees the shortest path",
      'A*': 'A* is weighted and directed and guarantees the shortest path'
    }

    useEffect(() => {
      setSelectedAlgo('none')
    }, [weighted])

  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: '20px'},
        animate: { opacity: 1, y: 0,
          transition: {
            delay: 0.3
          }
         }
      }}
      initial='initial'
      animate='animate'
      className='flex flex-col justify-start item-start space-y-2 p-2'>
      
      {/* Generate Grid */}
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
                  <h1>1</h1>
                </div>
                <div className='flex flex-row items-center space-x-1'>
                  <GridCell state={'w1_unvisited'} />
                  <h1>10</h1>
                </div>
                <div className='flex flex-row items-center space-x-1'>
                  <GridCell state={'w2_unvisited'} />
                  <h1>50</h1>
                </div>
                <div className='flex flex-row items-center space-x-1'>
                  <GridCell state={'w3_unvisited'} />
                  <h1>1000</h1>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className='w-full h-[3px] bg-gray-700 rounded-full'></div>

      {/* Generate Boundary */}
      <div className='flex flex-col space-y-1'>
        <h1 className='text-md'>Maze Type:</h1>
        <select
          disabled={true}
          className='bg-gray-700 p-2 rounded-lg text-md'>
          <option>Horizontal Division</option>
          <option>Vertical Division</option>
          <option>Flappy Bird</option>
        </select>
        <button 
          disabled={true}
          onClick={() => setSelectedAlgo('none')}
          className='bg-gray-700 p-2 rounded-lg text-md'>Generate</button>
        <div>
      </div>
          <p className='max-w-[300px]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
        </div>
      <div className='w-full h-[3px] bg-gray-700 rounded-full'></div>

      {/* Generate Path */}
      <div className='flex flex-col space-y-1'>
        <h1 className='text-md'>Algorithm:</h1>
        <select
          value={selectedAlgo}
          onChange={(e) => setSelectedAlgo(e.target.value)}
          className='bg-gray-700 p-2 rounded-lg text-md'>
          <option value={'none'} disabled={true}>Select an algo</option>
          <option value={'BFS'} disabled={weighted}>BFS</option>
          <option value={'DFS'} disabled={weighted}>DFS</option>
          <option value={'dijikstra'} disabled={!weighted}>Dijksta</option>
          <option value={'A*'} disabled={!weighted}>A*</option>
        </select>
        <button 
          onClick={() => handleFind(selectedAlgo)}
          disabled={selectedAlgo === 'none'}
          className='bg-gray-700 p-2 rounded-lg text-md'>Find!</button>
        <div>
            <p className='max-w-[300px]'>
              {algoInfo[selectedAlgo]}
            </p>
        </div>
      </div>

    </motion.div>
  )
}
