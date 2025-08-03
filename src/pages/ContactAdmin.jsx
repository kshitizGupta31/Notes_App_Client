import React from 'react';
import { GETFORM_ENDPOINT } from '../config';
import './ContactAdmin.css';

export default function ContactAdmin() {
  return (
    <div className="contact-admin-container">
      <div className="contact-admin-content">
        <h1>Contact Admin</h1>
        <p>Have a question or suggestion? Get in touch with us!</p>
        
        <form id="contact" action={GETFORM_ENDPOINT} method="POST">
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea name="message" placeholder="Your Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
}
