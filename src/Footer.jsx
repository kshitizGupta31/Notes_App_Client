import React from 'react'

function Footer() {
  return (
    <div style={{marginTop:"20px", borderRadius:"10px"}}>
        <footer className='homepage-footer' style={{borderRadius:"10px"}}>
        <p>&copy; {new Date().getFullYear()} Sky_Notes. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Footer