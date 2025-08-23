import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='fixed bottom-0 left-0 w-full z-10'>
      <footer className="footer footer-center bg-base-300 text-base-content p-2 sm:p-4">
        <aside className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
          <p className="text-xs sm:text-sm">Copyright © {new Date().getFullYear()} - All rights reserved by DevNexus</p>
          <Link to="/privacy" className="link link-hover text-xs sm:text-sm">Privacy Policy</Link>
        </aside>
      </footer>
    </div>
  )
}

export default Footer