// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://notes-app-server-dd6s.onrender.com';

// Cloudinary Configuration
export const CLOUDINARY_UPLOAD_PRESET = 'knit';
export const CLOUDINARY_CLOUD_NAME = 'dcqqcovdd';
export const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

// External Services
export const GETFORM_ENDPOINT = 'https://getform.io/f/pbnvqzqb'; 