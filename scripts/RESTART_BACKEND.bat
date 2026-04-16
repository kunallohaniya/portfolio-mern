@echo off
echo ========================================
echo Restarting Backend Server
echo ========================================
echo.

echo Killing any process using port 5000...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5000 ^| findstr LISTENING') do (
    echo Killing process %%a
    taskkill /F /PID %%a >nul 2>&1
)

timeout /t 2 /nobreak >nul

echo.
echo Starting backend server...
cd backend
start "Backend Server" cmd /k "npm run dev"

echo.
echo ========================================
echo Backend server is starting...
echo Check the new window that opened
echo ========================================
timeout /t 3
cd ..
