# 🌐 Network Traffic Simulator

> **A real-time telecommunications network traffic simulator built for DigiPlus IT technical assessment**

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)](https://socket.io/)

## 🚀 Live Demo

-   **Backend API**: `https://your-backend-url.herokuapp.com`
-   **Frontend App**: `https://your-frontend-url.netlify.app`

## 📋 Overview

This application simulates network traffic in a telecommunications network with 5 interconnected nodes (A, B, C, D, E). It provides real-time visualization of packet flow, congestion management, and network performance metrics.

### ✨ Key Features

-   🔄 **Real-time Packet Simulation** with WebSocket updates
-   🎯 **Interactive Network Topology** with visual feedback
-   📊 **Live Statistics Dashboard** showing network metrics
-   🚦 **Traffic Control Interface** with adjustable generation rates
-   🎨 **Color-coded Congestion Visualization** (Green/Orange/Red)
-   🔀 **Shortest Path Routing** using Dijkstra's algorithm
-   📱 **Responsive Design** for desktop and mobile
-   ☁️ **Cloud-ready Deployment** configuration

## 🏗️ Architecture

```
Frontend (React)     Backend (Node.js/Express)     Algorithm Engine
     |                        |                           |
[Network Topology] ←→ [WebSocket Server] ←→ [Packet Simulator]
[Statistics View]     [REST API]              [Queue Manager]
[Traffic Controls]    [CORS Enabled]          [Path Finder]
```

## 🌐 Network Topology

The simulator uses a predefined 5-node network topology:

```
    A(50pps) ────100──── B(30pps)
    │                    │
   80│                   │70
    │                    │
    C(40pps) ────90───── D(20pps)
     ╲                  ╱
    110╲                ╱60
        ╲              ╱
         E(60pps)
```

**Link Capacities (packets/second):**

-   A-B: 100 pps | A-C: 80 pps | B-D: 70 pps
-   C-D: 90 pps | C-E: 110 pps | D-E: 60 pps

## 🚀 Quick Start

### Option 1: Automated Setup (Windows)

```bash
# Clone the repository
git clone https://github.com/MuzammilMulla04/network-traffic-simulator.git
cd network-traffic-simulator

# Run automated setup
setup.bat

# Start both servers
start-application.bat
```

### Option 2: Manual Setup

```bash
# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install

# Start backend (Terminal 1)
cd backend && npm start

# Start frontend (Terminal 2)
cd frontend && npm start
```

### 🌐 Access the Application

-   **Frontend**: http://localhost:3000
-   **Backend API**: http://localhost:3001

## 🎮 Usage Guide

### 1. Start Simulation

Click "Start Simulation" to begin packet generation and routing

### 2. Monitor Network

-   **Green Links**: Low traffic (< 50% capacity)
-   **Orange Links**: Medium traffic (50-80% capacity)
-   **Red Links**: High traffic (> 80% capacity)

### 3. Control Traffic

-   Adjust individual node rates using sliders
-   Use predefined patterns (Low/Medium/High Traffic)
-   Observe real-time queue changes

### 4. Analyze Performance

-   Monitor node queue sizes
-   Track link utilization percentages
-   Watch network health indicator

The frontend will run on `http://localhost:3000`

## Usage

1. **Start the Backend**: Ensure the backend server is running on port 3001
2. **Start the Frontend**: Launch the React app on port 3000
3. **Start Simulation**: Click "Start Simulation" to begin traffic generation
4. **Monitor Network**: Watch real-time updates of node queues and link utilization
5. **Adjust Traffic**: Use the traffic controls to modify packet generation rates
6. **Pause/Reset**: Use controls to pause or reset the simulation

## API Endpoints

-   `GET /api/status` - Check API status
-   `GET /api/network` - Get current network state
-   `POST /api/start` - Start simulation
-   `POST /api/pause` - Pause simulation
-   `POST /api/reset` - Reset simulation
-   `POST /api/traffic-rates` - Update traffic generation rates

## Algorithm Details

### Packet Generation

-   Each node generates packets based on its traffic generation rate
-   Packets are assigned random destinations (excluding source)
-   Generation occurs every simulation step (1 second intervals)

### Routing Algorithm

-   Uses Dijkstra's shortest path algorithm
-   Routes packets from source to destination via optimal path
-   Considers network topology but not current congestion for path selection

### Congestion Control

-   Links have maximum capacity (packets per second)
-   Packets are queued at nodes when downstream links are at capacity
-   Queue sizes are tracked and displayed in real-time

### Simulation Loop

1. Generate new packets at each node
2. Process queued packets at each node
3. Check link capacities before forwarding
4. Update statistics and send to frontend
5. Repeat every second

## Deployment

### Backend Deployment (Heroku)

1. Create a Heroku app
2. Set environment variables if needed
3. Deploy using Git or GitHub integration

### Frontend Deployment (Netlify/Vercel)

1. Build the React app: `npm run build`
2. Deploy the `build` folder to your preferred platform
3. Update the API_BASE URL in App.js to point to your deployed backend

## Configuration

### Traffic Patterns

The simulator includes predefined traffic patterns:

-   **Low Traffic**: 10-25 pps per node
-   **Medium Traffic**: 20-60 pps per node
-   **High Traffic**: 60-90 pps per node

### Link Utilization Colors

-   **Green**: < 50% utilization
-   **Orange**: 50-80% utilization
-   **Red**: > 80% utilization

## Performance Considerations

-   Simulation runs at 1-second intervals to balance real-time feel with performance
-   Packet processing is limited to 10 packets per node per step to prevent overwhelming
-   WebSocket updates are sent only when network state changes
-   In-memory storage keeps the application lightweight

## Future Enhancements

-   Dynamic routing based on current link congestion
-   More sophisticated queuing algorithms (priority queues, etc.)
-   Historical data tracking and analytics
-   Support for larger network topologies
-   Advanced traffic patterns and scheduling
-   Network failure simulation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of a technical assessment for DigiPlus IT.

## Contact

For questions or issues, please contact HR@DigiPlusIT.com with your name, roll number, and contact information.
