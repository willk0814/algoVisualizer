import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <div className='flex items-center justify-center w-full bg-[#121212] pb-5'>
      
      <div className='flex flex-row justify-between bg-[#E8E8E8] w-[95vw] max-w-[700px] rounded-md px-3 py-1'>

          <div className='flex flex-col space-y-3'>
            <Link 
              className='text-[#121212] text-xl'
              href={'/pathfinding'}>
              Pathfinder
            </Link>
            
            <Link 
              className='text-[#121212] text-xl'
              href={'/sorting'}>
              Sorter
            </Link>
          </div>

          <div
            className='flex flex-col justify-center items-start'>
              <p className='text-[#121212]'>Made by</p>
              <a 
                className='text-[#121212] text-2xl'
                href='https://www.willkoenig.info'>Will Koenig</a>
          </div>



      </div>

    </div>
  )
}
