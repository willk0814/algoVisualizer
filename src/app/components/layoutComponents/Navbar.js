import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <div className='fixed w-full h-20 z-10 border-2 border-white'>
        <div className='flex flex-row space-x-2 p-2'>
            <Link 
                className='p-2 bg-gray-700 rounded-lg'
                href={'/'}>Home</Link>
            <Link 
                className='p-2 bg-gray-700 rounded-lg'
                href={'/pathfinding'}>Pathfinding</Link>
            <Link 
                className='p-2 bg-gray-700 rounded-lg'
                href={'/sorting'}>Sorting</Link>
        </div>
    </div>
  )
}
