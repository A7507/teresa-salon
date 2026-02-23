@echo off
echo ========================================
echo   Adding Photos to Gallery
echo ========================================
echo.

REM Check if gallery folder exists
if not exist "public\gallery" (
    echo Creating gallery folder...
    mkdir "public\gallery"
)

echo.
echo Add your photos to the folder:
echo c:\Users\gleme\OneDrive\Desktop\Site para mae\public\gallery\
echo.
echo Suggested names:
echo - style-5.jpg
echo - style-6.jpg
echo - style-7.jpg
echo - (and so on...)
echo.
echo Photos will appear automatically on the site!
echo.
echo Press any key to open the folder...
pause > nul

explorer "c:\Users\gleme\OneDrive\Desktop\Site para mae\public\gallery"

echo.
echo After adding photos, visit:
echo http://localhost:3000/#gallery
echo.
pause
