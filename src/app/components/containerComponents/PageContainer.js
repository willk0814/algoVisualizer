'use client'

import React, { useState } from 'react'
import NavButtons from './NavButtons'
import SortingContainer from '../sortingComponents/SortingContainer'
import PathfindingContainer from '../pathfindingComponents/PathfindingContainer'

export default function PageContainer() {

  const [showSorter, setShowSorter] = useState(true)

  const handleToggleView = (id) => {
    setShowSorter(id === 'sorter')
  }

  return (
    <div className='w-[100vw] h-[100vh] flex flex-col items-start justify-start'>
        <NavButtons 
          handleSelect={handleToggleView}
          displaySorter={showSorter}/>

        {showSorter ? (
          <SortingContainer />
        ) : (
          <PathfindingContainer />
        )}
    </div>
  )
}
