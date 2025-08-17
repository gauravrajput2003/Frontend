import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='fixed bottom-0 left-0 w-full z-10'>
      <footer className="footer footer-center bg-base-300 text-base-content p-4">
        <aside className="flex flex-wrap items-center gap-4">
          <p>Copyright © {new Date().getFullYear()} - All rights reserved by DevNexus</p>
          <Link to="/privacy" className="link link-hover">Privacy Policy</Link>
        </aside>
      </footer>
    </div>
  )
}

export default Footer