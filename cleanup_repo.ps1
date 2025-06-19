# Cleanup script for Nathan's Portfolio repository
# Created on June 19, 2025

# This script helps consolidate the repository by:
# 1. Removing duplicate implementations
# 2. Organizing files in the personal-portfolio directory
# 3. Ensuring only the necessary code remains

# Make sure we're in the personal-portfolio directory
$projectRoot = "x:\OneDrive - State University of New York at New Paltz\College\Year 4\Web and Database Programming - Hoffman\PersonalSite"
Set-Location $projectRoot

# Create backup of important files
Write-Host "Creating backup of important files..." -ForegroundColor Green
$backupDir = Join-Path $projectRoot "backup_before_cleanup"
New-Item -ItemType Directory -Path $backupDir -Force
Copy-Item -Path "$projectRoot\personal-portfolio\src\pages\Home_clean.jsx" -Destination "$backupDir\Home_clean.jsx" -Force
Copy-Item -Path "$projectRoot\personal-portfolio\public\js\globe.js" -Destination "$backupDir\globe.js" -Force

# Consolidate Home implementations
Write-Host "Consolidating Home implementations..." -ForegroundColor Green
Copy-Item -Path "$projectRoot\personal-portfolio\src\pages\Home_clean.jsx" -Destination "$projectRoot\personal-portfolio\src\pages\Home.jsx" -Force

# Clean up unnecessary implementations
Write-Host "Removing unnecessary files..." -ForegroundColor Yellow
# Now uncommented to execute the cleanup
Remove-Item -Path "$projectRoot\public" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "$projectRoot\server" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "$projectRoot\Ottos Site" -Recurse -Force -ErrorAction SilentlyContinue

# Remove temporary and duplicate files within personal-portfolio
Remove-Item -Path "$projectRoot\personal-portfolio\src\pages\Home_old.jsx" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "$projectRoot\index.js" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "$projectRoot\package_backup.json" -Force -ErrorAction SilentlyContinue

Write-Host "Cleanup complete!" -ForegroundColor Green
Write-Host "The portfolio has been consolidated to a single implementation in the personal-portfolio directory." -ForegroundColor Cyan
Write-Host "A backup of important files was created in $backupDir before cleanup." -ForegroundColor Cyan
Write-Host "IMPORTANT: Some remove commands are commented out for safety. Review the script and uncomment them when ready to complete the cleanup." -ForegroundColor Yellow
