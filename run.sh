#!/bin/bash
# ==============================================================================
# Psychopath Console - Launch Script
# Author: chadi0x (https://github.com/chadi0x)
# Educational & Security Research Use Only
# ==============================================================================

APP_NAME="Psychopath Console"
AUTHOR="chadi0x (https://github.com/chadi0x)"

echo "=================================================="
echo "   🚀 Launching $APP_NAME..."
echo "   👤 Architect: $AUTHOR"
echo "   ⚠️  Educational & Research Purposes Only"
echo "=================================================="

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
  echo " [ERROR] Docker is not running. Please start Docker Desktop."
  exit 1
fi

# Start the container using the EXISTING built image.
# We do NOT use --build here, so it uses the "frozen" version with all libraries installed.
# Start container
docker-compose up -d

echo " "
echo " [SUCCESS] System is running."
echo " [INFO]    Dashboard: http://localhost:5001"
echo " [INFO]    Scanning for Cloudflare Tunnel URL (Auto-Fix)..."

# Wait loop to grep URL from logs and save to shared volume
# We write to ./instance/tunnel_url.txt because ./instance is mounted to /app/instance
mkdir -p instance
c=0
while [ $c -le 30 ]; do
    # Grep the latest log for the URL
    URL=$(docker-compose logs | grep -o 'https://.*\.trycloudflare\.com' | head -n 1)
    if [ ! -z "$URL" ]; then
        echo "$URL" > instance/tunnel_url.txt
        echo " [✓] Tunnel Found: $URL (Saved for Flash Phishing)"
        break
    fi
    sleep 2
    ((c++))
    echo -n "."
done

if [ -z "$URL" ]; then
    echo " [!] Warning: Could not auto-detect Cloudflare URL yet. It might appear later."
fi

echo " "
echo " [~] Tailing logs..."
echo "--------------------------------------------------"
docker-compose logs -f
