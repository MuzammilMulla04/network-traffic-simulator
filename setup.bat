@echo off
echo Starting Network Traffic Simulator...
echo.

echo Installing Backend Dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo Failed to install backend dependencies
    pause
    exit /b 1
)

echo.
echo Installing Frontend Dependencies...
cd ..\frontend
call npm install
if %errorlevel% neq 0 (
    echo Failed to install frontend dependencies
    pause
    exit /b 1
)

echo.
echo Setup completed successfully!
echo.
echo To start the application:
echo 1. Open a terminal and run: cd backend && npm start
echo 2. Open another terminal and run: cd frontend && npm start
echo.
echo The backend will run on http://localhost:3001
echo The frontend will run on http://localhost:3000
echo.
pause
