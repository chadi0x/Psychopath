# Psychopath Console Dockerfile
# Architect: chadi0x (https://github.com/chadi0x)
# Educational & Security Research Use Only

FROM python:3.9-slim

LABEL maintainer="chadi0x <https://github.com/chadi0x>"
LABEL org.opencontainers.image.source="https://github.com/chadi0x"

# Install system dependencies for Chromium/Selenium
RUN apt-get update && apt-get install -y \
    chromium \
    chromium-driver \
    wget \
    curl \
    ca-certificates \
    openssh-client \
    procps \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["python", "app.py"]
