import React from 'react'
import ArrayBar from './ArrayBar'

export default function MobileSortingControls({
    handleGenerateArray, handleSort
}) {
  return (
    <div className='flex flex-col space-y-2'>

        <div className='flex flex-row space-x-3 items-end'>
            
            <div className='flex flex-col space-y-1'>
                <h1 className='text-md'>Sorting Algo:</h1>
                <button 
                    className='bg-gray-700 rounded-md p-1 text-md'
                    onClick={() => handleGenerateArray()}>New Array</button>
            </div>

            <span className='h-full w-[3px] bg-[#E8E8E8] rounded-md'></span>

            <div className='flex flex-col space-y-1'>
                <h1 className='text-md'>Sorting Algo:</h1>
                <select
                    className='bg-gray-700 p-1 rounded-lg text-md'>
                    <option>Bubble</option>
                    <option disabled={true}>Heap</option>
                    <option disabled={true}>Merge</option>
                    <option disabled={true}>Quick</option>
                </select>
            </div>
            <button 
                onClick={() => handleSort('bubble')}
                className='bg-gray-700 p-1 rounded-lg text-md'>
                    Sort
            </button>
        </div>

            <div className='flex flex-row space-x-3'>
                <div className='flex flex-row items-center space-x-1'>
                    <ArrayBar value={4} status={'unsorted'} />
                    <h1 className='text-sm'>Unsorted</h1>
                </div>
                <div className='flex flex-row items-center space-x-1'>
                    <ArrayBar value={4} status={'comparing'} />
                    <h1 className='text-sm'>Comparing</h1>
                </div>
                <div className='flex flex-row items-center space-x-1'>
                    <ArrayBar value={4} status={'swapping'} />
                    <h1 className='text-sm'>Swapping</h1>
                </div>
                <div className='flex flex-row items-center space-x-1'>
                    <ArrayBar value={4} status={'sorted'} />
                    <h1 className='text-sm'>Sorted</h1>
                </div>
            </div>
        
    </div>
  )
}
