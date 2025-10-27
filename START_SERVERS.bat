@echo off
echo ========================================
echo Starting MERN Portfolio Servers
echo ========================================
echo.
echo Backend will run on: http://localhost:5000
echo Frontend will run on: http://localhost:5174
echo.
echo Press Ctrl+C in each window to stop servers
echo ========================================
echo.

cd backend
start "Backend Server" cmd /k "npm run dev"

cd ..\frontend
start "Frontend Server - Port 5174" cmd /k "npm run dev"

echo.
echo ========================================
echo Both servers are starting...
echo Check the new windows that opened
echo ========================================
pause

