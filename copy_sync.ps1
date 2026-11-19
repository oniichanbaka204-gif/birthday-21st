$src = "C:\Users\ptson\Documents\antigravity\wise-brahmagupta"
$dest = "C:\Users\ptson\OneDrive\Documents\antigravity\wise-brahmagupta\happy-birthday"

Write-Host "Copying from $src to $dest..."

# 1. Copy src code and configs to happy-birthday
Copy-Item -Recurse -Force "$src\src" "$dest\src"
if (-not (Test-Path "$dest\public")) { New-Item -ItemType Directory -Force -Path "$dest\public" }
Copy-Item -Force "$src\index.html" "$dest\index.html"
Copy-Item -Force "$src\package.json" "$dest\package.json"
Copy-Item -Force "$src\package-lock.json" "$dest\package-lock.json"
Copy-Item -Force "$src\vite.config.js" "$dest\vite.config.js"
Copy-Item -Force "$src\.gitignore" "$dest\.gitignore"
Copy-Item -Force "$src\README.md" "$dest\README.md"
Copy-Item -Force "$src\public\letter.txt" "$dest\public\letter.txt"
Copy-Item -Force "$src\public\favicon.svg" "$dest\public\favicon.svg"

# 2. Put user's audio and images into public folder so web serves them
if (-not (Test-Path "$dest\public\audio")) { New-Item -ItemType Directory -Force -Path "$dest\public\audio" }
if (-not (Test-Path "$dest\public\image")) { New-Item -ItemType Directory -Force -Path "$dest\public\image" }

Copy-Item -Force "$dest\audio\amthanh.mp3" "$dest\public\audio\amthanh.mp3"
Copy-Item -Force "$dest\audio\amthanh.mp3" "$dest\public\audio\birthday-song.mp3"
Copy-Item -Recurse -Force "$dest\image\*" "$dest\public\image\"

# 3. Also sync into workspace public folder
if (-not (Test-Path "$src\public\audio")) { New-Item -ItemType Directory -Force -Path "$src\public\audio" }
if (-not (Test-Path "$src\public\image")) { New-Item -ItemType Directory -Force -Path "$src\public\image" }

Copy-Item -Force "$dest\audio\amthanh.mp3" "$src\public\audio\amthanh.mp3"
Copy-Item -Force "$dest\audio\amthanh.mp3" "$src\public\audio\birthday-song.mp3"
Copy-Item -Recurse -Force "$dest\image\*" "$src\public\image\"

Write-Host "SYNC COMPLETED SUCCESSFULLY!"
