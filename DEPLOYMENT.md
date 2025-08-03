# Deployment Guide

## Vercel Deployment Setup

### 1. Environment Variables
You need to set the following environment variable in your Vercel dashboard:

1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Add the following variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://notes-app-server-dd6s.onrender.com`
   - **Environment**: Production, Preview, Development

### 2. Server CORS Configuration
The server has been updated to allow requests from multiple origins:
- `https://notes-app-client-weld.vercel.app` (old deployment)
- `https://notes-app-client-eqdslye1g-kshitizgupta31s-projects.vercel.app` (new deployment)
- `http://localhost:3000` (local development)

### 3. Deploy Updated Server
After updating the server code with the new CORS configuration, redeploy your server on Render.

### 4. Client Configuration
The client now uses a centralized configuration file (`src/config.js`) that:
- Uses environment variables when available
- Falls back to hardcoded values for production
- Centralizes all API endpoints and external service URLs

## API Endpoints
All API calls now use the centralized configuration:
- Authentication: `/register`, `/login`, `/logout`, `/profile`
- Resources: `/resources`, `/resources/:id`
- File uploads: Cloudinary integration

## Troubleshooting
If you encounter CORS errors:
1. Check that your server is deployed with the updated CORS configuration
2. Verify the environment variable is set correctly in Vercel
3. Ensure the client is using the correct API URL 