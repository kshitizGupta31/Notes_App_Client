// src/pages/HomePage.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Ensure you create this CSS file for styling
import CarouselComponent from './CarouselComponent'; // Adjust the path as necessary
import Footer from '../Footer';




export default function HomePage() {

  useEffect(()=>{
    window.scrollTo(0, 0);
  })

  return (
    <div className='homepage'>
      <header className='hero-section'>
        <div className='hero-content'>
          <h1>Welcome to <span className='sky-notes'>Sky_Notes</span></h1>
          <p>Your one-stop solution for managing and discovering amazing posts and resources.</p>
          <div className='button-container'>
            <Link to='/resources' className='cta-button'>Explore Resources</Link>
          </div>
        </div>
      </header>
      {/* <section className='carousel-section'>
        <CarouselComponent />
      </section> */}
      {/* <footer className='homepage-footer'>
        <p>&copy; {new Date().getFullYear()} Sky_Notes. All rights reserved.</p>
      </footer> */}
      {/* <Footer/> */}
    </div>
  );
}
