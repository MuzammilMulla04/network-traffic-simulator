# Network Traffic Simulator - Deployment Guide

## Quick Start (Local Development)

### Option 1: Using Batch Files (Windows)

1. Run `setup.bat` to install dependencies
2. Run `start-backend.bat` in one terminal
3. Run `start-frontend.bat` in another terminal

### Option 2: Manual Setup

1. Install backend dependencies:

    ```cmd
    cd backend
    npm install
    ```

2. Install frontend dependencies:

    ```cmd
    cd frontend
    npm install
    ```

3. Start backend server:

    ```cmd
    cd backend
    npm start
    ```

4. Start frontend server (in new terminal):
    ```cmd
    cd frontend
    npm start
    ```

## Deployment to Cloud Platforms

### Backend Deployment (Heroku)

1. **Create Heroku App:**

    ```bash
    heroku create your-network-simulator-backend
    ```

2. **Deploy Backend:**

    ```bash
    # Navigate to backend directory
    cd backend

    # Initialize git (if not already done)
    git init
    git add .
    git commit -m "Initial backend commit"

    # Add Heroku remote
    heroku git:remote -a your-network-simulator-backend

    # Deploy
    git push heroku main
    ```

3. **Environment Variables:**
    ```bash
    heroku config:set NODE_ENV=production
    ```

### Frontend Deployment (Netlify)

1. **Build the Frontend:**

    ```cmd
    cd frontend
    npm run build
    ```

2. **Deploy to Netlify:**

    - Option A: Drag and drop the `build` folder to Netlify
    - Option B: Connect GitHub repo for automatic deployment

3. **Update API URL:**
    - Edit `frontend/src/App.js`
    - Change `API_BASE` to your Heroku backend URL
    - Rebuild and redeploy

### Alternative: Railway Deployment

**Backend on Railway:**

1. Connect GitHub repo to Railway
2. Select the backend folder as root
3. Railway will auto-detect Node.js
4. Set environment variables if needed

### GitHub Repository Setup

1. **Initialize Git:**

    ```cmd
    git init
    git add .
    git commit -m "Initial commit"
    ```

2. **Create GitHub Repository:**

    - Go to GitHub and create new repository
    - Copy the repository URL

3. **Push to GitHub:**
    ```cmd
    git remote add origin https://github.com/yourusername/network-simulator.git
    git branch -M main
    git push -u origin main
    ```

## Environment Configuration

### Backend (.env file)

```
NODE_ENV=production
PORT=3001
```

### Frontend (Update in App.js)

```javascript
const API_BASE =
	process.env.NODE_ENV === "production"
		? "https://your-backend-url.herokuapp.com"
		: "http://localhost:3001";
```

## Final Deployment URLs

After deployment, you should have:

-   **Backend API**: `https://your-app-backend.herokuapp.com`
-   **Frontend**: `https://your-app-frontend.netlify.app`

## Troubleshooting

### Common Issues:

1. **CORS Errors:**

    - Ensure backend CORS is configured for frontend domain
    - Check if API_BASE URL is correct in frontend

2. **Build Failures:**

    - Ensure all dependencies are in package.json
    - Check Node.js version compatibility

3. **WebSocket Connection Issues:**
    - Verify Socket.IO configuration
    - Check if ports are correctly configured

### Testing Deployment:

1. Visit frontend URL
2. Check browser console for errors
3. Test start/pause/reset functionality
4. Verify real-time updates are working

## Performance Optimization

For production deployment:

1. Enable gzip compression
2. Set up CDN for frontend assets
3. Configure proper caching headers
4. Monitor memory usage on backend
5. Consider using PM2 for process management

## Security Considerations

1. Enable HTTPS in production
2. Set proper CORS origins
3. Add rate limiting to API endpoints
4. Validate all user inputs
5. Use environment variables for sensitive data
