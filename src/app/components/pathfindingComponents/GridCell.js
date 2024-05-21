'use client'
import React, { useState, useEffect } from 'react'

import { IoClose } from "react-icons/io5";
import { animate, motion } from 'framer-motion'


export default function GridCell({ state }) {
    
    const [cellColor, setCellColor] = useState('')

    useEffect(() => {
        if (state === 'w0_unvisited'){
            setCellColor('#9ca3af')
        } else if (state === 'w1_unvisited'){
            setCellColor('#8E8E8E')
        } else if (state === 'w2_unvisited'){
            setCellColor('#5F5F5F')
        } else if (state === 'w3_unvisited'){
            setCellColor('#303030')
            
        } else if (state === 'w0_visited'){
            setCellColor('#a85c32')
        } else if (state === 'w1_visited'){
            setCellColor('#9B7560')
        } else if (state === 'w2_visited'){
            setCellColor('#845e49')
        } else if (state === 'w3_visited'){
            setCellColor('#6C4631')
        
        } else if (state === 'goal'){
            setCellColor('#50C878')
        } else if (state === 'final_path'){
            setCellColor('#097969')
        } else if (state === 'boundary'){
            setCellColor('#AA4A44')
        } else if (state === 'start'){
            setCellColor('#0394fc')
        } else {
            console.log('Unrecognized state:', state)
        }
    }, [state])
  return (
    <div 
        style={{backgroundColor: `${cellColor}`}}
        className='h-[19px] w-[19px] flex items-center justify-center rounded-md'>
        {state === 'boundary' && 
            <motion.div
                variants={{
                    initial: { opacity: 0 },
                    animate: { opacity: 1,
                        transition: { delay: 0.2 }
                     }
                }}
                initial='initial'
                animate='animate'>
                <IoClose size={17} color='#fff'/>
            </motion.div>}
    </div>
  )
}
