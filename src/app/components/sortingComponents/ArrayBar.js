'use client'

import React, { useState, useEffect } from 'react'

export default function ArrayBar({ value, status }) {

    const [barColor, setBarColor] = useState('')

    useEffect(() => {
        if (status === 'unsorted'){
            setBarColor('#9ca3af')
        } else if (status === 'comparing') {
            setBarColor('#D18700')
        } else if (status === 'swapping' || status === 'preswapping'){
            setBarColor('#5C5CFF')
        } else if (status === 'sorted'){
            setBarColor('#00A300')
        } else {
            console.log('Unrecognized status: ', status)
        }
        
    }, [status])
  return (
    <div
        className='w-[8px] rounded-lg'
        style={{height: `${value * 5}px`, backgroundColor: `${barColor}`}}>
        
    </div>
  )
}
