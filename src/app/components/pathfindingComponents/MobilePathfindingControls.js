import React, { useState } from 'react'

export default function MobilePathfindingControls({ weighted }) {

    const [selectedAlgo, setSelectedAlgo] = useState('none')
  return (
    <div className='flex space-x-5 pb-4'>

        <div className='flex flex-col space-y-2'>
            <button
                className='bg-gray-700 px-2 py-1 rounded-lg text-md w-full'>
                    Weighted
            </button>
            <button
                className='bg-gray-700 px-2 py-1 rounded-lg text-md w-full'>
                    UnWeighted
            </button>
        </div>

        <div className='flex flex-col space-y-2'>
        <select
          disabled={true}
          className='bg-gray-700 px-2 py-1 rounded-lg text-md'>
          <option>Horizontal Division</option>
          <option>Vertical Division</option>
          <option>Flappy Bird</option>
        </select>
        <button 
          disabled={true}
          className='bg-gray-700 px-2 py-1 rounded-lg text-md'>Generate</button>
        </div>

        <div className='flex flex-col space-y-2'>
        <select
          value={selectedAlgo}
          onChange={(e) => setSelectedAlgo(e.target.value)}
          className='bg-gray-700 px-2 py-1 rounded-lg text-md'>
          <option value={'none'} disabled={true}>Select an algo</option>
          <option value={'BFS'} disabled={weighted}>BFS</option>
          <option value={'DFS'} disabled={weighted}>DFS</option>
          <option value={'dijikstra'} disabled={!weighted}>Dijksta</option>
          <option value={'A*'} disabled={!weighted}>A*</option>
        </select>
        <button 
        //   onClick={() => handleFind(selectedAlgo)}
          disabled={selectedAlgo === 'none'}
          className='bg-gray-700 px-2 py-1 rounded-lg text-md'>Find!</button>
        </div>
        
    </div>
  )
}
