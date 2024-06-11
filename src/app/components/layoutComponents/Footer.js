import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <div className='flex items-end justify-center w-full min-h-[25vh] bg-[#121212] pb-5'>
      
      <div className='flex flex-row justify-between border-[#E8E8E8] border-2 w-[95vw] max-w-[700px] rounded-md px-3 py-1 mt-5'>

          <div className='flex flex-col space-y-3'>
            <Link 
              className='text-[#A3BBAD] text-xl'
              href={'/pathfinding'}>
              Pathfinder
            </Link>
            
            <Link 
              className='text-[#A3BBAD] text-xl'
              href={'/sorting'}>
              Sorter
            </Link>
          </div>

          <div
            className='flex flex-col justify-center items-start'>
              <p className='text-[#A3BBAD]'>Made by</p>
              <a 
                className='text-[#A3BBAD] text-2xl'
                href='https://www.willkoenig.info'>Will Koenig</a>
          </div>



      </div>

    </div>
  )
}
