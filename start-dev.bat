@echo off
echo Starting Multicloud Governance Platform Environment...

echo [1/3] Starting Infrastructure (Database & Kafka)...
docker-compose up -d
if %errorlevel% neq 0 (
    echo Failed to start Docker containers. Make sure Docker Desktop is running.
    pause
    exit /b %errorlevel%
)

echo [2/3] Infrastructure started. 
echo.
echo To start the API Backend:
echo   cd apps\api
echo   npm install
echo   npm run start:dev
echo.
echo To start the Web Frontend (in a new terminal):
echo   cd apps\web
echo   npm install
echo   npm run dev
echo.
echo Access the Dashboard at http://localhost:3000
echo.
pause
