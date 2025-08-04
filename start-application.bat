@echo off
echo 🚀 Starting Network Traffic Simulator...
echo.

echo 📡 Starting Backend Server...
start "Backend Server" cmd /c "cd backend && npm start && pause"

echo ⏳ Waiting 3 seconds for backend to initialize...
timeout /t 3 /nobreak >nul

echo 🌐 Starting Frontend Server...
start "Frontend Server" cmd /c "cd frontend && npm start && pause"

echo.
echo ✅ Both servers are starting...
echo.
echo 📍 Backend will be available at: http://localhost:3001
echo 📍 Frontend will be available at: http://localhost:3000
echo.
echo 🎯 Your browser should automatically open to http://localhost:3000
echo.
echo ⚠️  If the frontend shows connection errors initially, 
echo    wait for the backend to fully start (about 10 seconds)
echo.
echo Press any key to close this window...
pause >nul
