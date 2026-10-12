#!/bin/bash
# ==============================================================================
# Psychopath Console - Docker Golden Image Exporter
# Architect: chadi0x (https://github.com/chadi0x)
# Educational & Security Research Use Only
# ==============================================================================

echo "=================================================="
echo " [~] Building Psychopath Console 'Golden Image'..."
echo "     Architect: chadi0x (https://github.com/chadi0x)"
echo "=================================================="

# Build with a specific tag
docker build -t psychopath/console:latest .

echo " [~] Saving image to psychopath_console.tar (This may take a minute)..."
docker save -o psychopath_console.tar psychopath/console:latest

echo " "
echo " [SUCCESS] Image exported to: $(pwd)/psychopath_console.tar"
echo " "
echo " --- How to Run Anywhere ---"
echo " 1. Copy 'psychopath_console.tar' to any machine."
echo " 2. Load the image:"
echo "    docker load -i psychopath_console.tar"
echo " 3. Run it:"
echo "    docker run -d -p 5001:5000 --name psychopath_console \\"
echo "      -v \$(pwd)/instance:/app/instance \\"
echo "      --cap-add=SYS_ADMIN \\"
echo "      psychopath/console:latest"
echo " "
echo " Note: The --cap-add=SYS_ADMIN is strictly required for Chromium/Sandbox in Docker."
