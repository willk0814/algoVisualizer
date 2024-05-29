'use client'

import React, { useState, useEffect } from 'react'
import ArrayBar from './ArrayBar'

export default function InfoBlock({ action_desc }) {
  
    useEffect(() => {
        console.log(action_desc)
    }, [action_desc])

return (
    <div className='flex flex-row items-center justify-between bg-gray-700 my-1 p-1 rounded-lg w-full'>
        <div className='flex flex-row items-center space-x-2'>
            <ArrayBar value={3} status={action_desc.status} />
            <h1>{action_desc.status}</h1>
        </div>
        <h1>{action_desc.status === 'sorted' ? 
            action_desc.indices : 
            `${action_desc.indices[0]}, ${action_desc.indices[1]}`}</h1>
    </div>
  )
}
