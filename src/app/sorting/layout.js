import React from 'react'
import Navbar from '../components/layoutComponents/Navbar'
import Footer from '../components/layoutComponents/Footer'

export default function SortingLayout({ children }) {
  return (
    <>
        <Navbar />
        {children}
        <Footer />
    
    </>
  )
}
