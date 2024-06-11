import React, { useState, useEffect } from 'react'

export default function MobilePathfindingControls({ 
  weighted, handleGenerateGrid,
  handleGenerateBoundary, handleFind }) {

    const [selectedAlgo, setSelectedAlgo] = useState('none')

    useEffect(() => {
      setSelectedAlgo('none')
    }, [weighted])
  return (
    <div className='flex space-x-2 pb-4'>

        {/* Generate Grid */}
        <div className='flex flex-col space-y-2'>
            <button
              disabled={weighted}
              onClick={() => handleGenerateGrid(true)}
              className='bg-gray-700 px-1 py-1 rounded-lg text-sm w-full disabled:bg-gray-400'>
                Weighted
            </button>
            <button
              disabled={!weighted}
              onClick={() => handleGenerateGrid(false)}
              className='bg-gray-700 px-1 py-1 rounded-lg text-sm w-full disabled:bg-gray-400'>
                    UnWeighted
            </button>
        </div>

        {/* Generate Boundary */}
        <div className='flex flex-col space-y-2'>
        <select
          disabled={true}
          className='bg-gray-700 px-1 py-1 rounded-lg text-sm'>
          <option>Horiz Division</option>
          <option>Vert Division</option>
          <option>Flappy Bird</option>
        </select>
        <button 
          disabled={true}
          className='bg-gray-700 px-1 py-1 rounded-lg text-sm'>Generate</button>
        </div>

        {/* Generate Path */}
        <div className='flex flex-col space-y-2'>
        <select
          value={selectedAlgo}
          onChange={(e) => setSelectedAlgo(e.target.value)}
          className='bg-gray-700 px-1 py-1 rounded-lg text-sm'>
          <option value={'none'} disabled={true}>algo</option>
          <option value={'BFS'} disabled={weighted}>BFS</option>
          <option value={'DFS'} disabled={weighted}>DFS</option>
          <option value={'dijikstra'} disabled={!weighted}>Dijksta</option>
          <option value={'A*'} disabled={!weighted}>A*</option>
        </select>
        <button 
          onClick={() => handleFind(selectedAlgo)}
          disabled={selectedAlgo === 'none'}
          className='bg-gray-700 px-1 py-1 rounded-lg text-sm'>Find!</button>
        </div>
        
    </div>
  )
}
