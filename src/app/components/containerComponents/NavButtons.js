'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { BsBarChartFill } from "react-icons/bs";
import { HiMiniSquares2X2 } from "react-icons/hi2";


export default function NavButtons({ handleSelect, displaySorter }) {
  return (
    <div className='fixed left-0 flex-row bg-[#121212] p-4 space-x-2'>

        <button 
          className={`p-4 text-2xl rounded-xl bg-gray-800 disabled:bg-gray-400`}
          onClick={() => handleSelect('pathfinder')}
          disabled={!displaySorter}>
            <div className='flex flex-row items-center justify-center space-x-2'>
              <HiMiniSquares2X2 size={30}/>
              <h1>Pathfinding</h1>
            </div></button>
      
        <button 
          className={`p-4 text-2xl rounded-xl bg-gray-800 disabled:bg-gray-400`}
          onClick={() => handleSelect('sorter')}
          disabled={displaySorter}>
            <div className='flex flex-row items-center justify-center space-x-2'>
              <BsBarChartFill size={30}/>
              <h1>Sorting</h1>
            </div>
        </button>
    </div>
  )
}
