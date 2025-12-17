# CodeLens Docker Deployment Guide

## Quick Start

1. **Clone the repository on your VM:**
   ```bash
   git clone https://github.com/cross-entropy0/CodeLens-AI-Code-Complexity-Analyzer.git
   cd CodeLens-AI-Code-Complexity-Analyzer
   ```

2. **Create environment file:**
   ```bash
   cp .env.docker .env
   nano .env  # Edit with your actual values
   ```

3. **Build and start containers:**
   ```bash
   docker-compose up -d --build
   ```

4. **Check status:**
   ```bash
   docker-compose ps
   docker-compose logs -f
   ```

5. **Access the application:**
   - Frontend: `http://your-vm-ip:3000/`
   - Backend API: `http://your-vm-ip:5001/api/health`

## Docker Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f
docker-compose logs backend
docker-compose logs frontend

# Restart services
docker-compose restart

# Rebuild after code changes
docker-compose up -d --build

# View running containers
docker ps

# Access container shell
docker exec -it codelens-backend sh
docker exec -it codelens-frontend sh
```

## Firewall Rules

Open these ports in your cloud security group:
- Port 3000 (TCP) - Frontend
- Port 5001 (TCP) - Backend API

## Environment Variables

Required in `.env` file:
```env
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
GEMINI_API_KEY=your_gemini_key
CLIENT_URL=http://your-vm-ip:3000
VITE_API_URL=http://your-vm-ip:5001/api
```

## Auto-restart on Reboot

Docker containers will automatically restart unless stopped manually.

To ensure Docker starts on boot:
```bash
sudo systemctl enable docker
```

## Updating the Application

```bash
# Pull latest code
git pull

# Rebuild and restart
docker-compose up -d --build
```

## Troubleshooting

**Containers not starting:**
```bash
docker-compose logs
```

**Port already in use:**
```bash
sudo lsof -i :3000
sudo lsof -i :5001
# Kill the process or change ports in docker-compose.yml
```

**Reset everything:**
```bash
docker-compose down -v
docker-compose up -d --build
```
