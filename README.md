# Network Traffic Simulator

A real-time network traffic simulator for telecommunications networks built with Node.js/Express backend and React frontend.

## Overview

This application simulates network traffic in a telecommunications network with 5 interconnected nodes (A, B, C, D, E). It provides real-time visualization of:

- Network topology with color-coded link utilization
- Node statistics (traffic generation rates, queue sizes)
- Link statistics (current load, capacity utilization)
- Interactive controls for traffic rate adjustment

## Features

- **Real-time Simulation**: Live updates using WebSocket connections
- **Visual Network Topology**: Graphical representation of network nodes and links
- **Traffic Control**: Adjust packet generation rates for each node
- **Queue Management**: Packet queuing when links reach capacity
- **Shortest Path Routing**: Implements Dijkstra's algorithm for packet routing
- **Congestion Handling**: Link capacity checking and packet queuing
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

**Backend:**
- Node.js with Express
- Socket.IO for real-time communication
- In-memory data structures for state management

**Frontend:**
- React 18
- Socket.IO client
- CSS Grid and Flexbox for responsive layout

## Network Topology

The simulator uses a predefined network topology with 5 nodes:

```
    A -------- B
    |          |
    |          |
    C -------- D
     \        /
      \      /
        E
```

**Link Capacities:**
- A-B: 100 pps
- A-C: 80 pps
- B-D: 70 pps
- C-D: 90 pps
- C-E: 110 pps
- D-E: 60 pps

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```cmd
cd backend
```

2. Install dependencies:
```cmd
npm install
```

3. Start the backend server:
```cmd
npm start
```

The backend will run on `http://localhost:3001`

### Frontend Setup

1. Navigate to the frontend directory:
```cmd
cd frontend
```

2. Install dependencies:
```cmd
npm install
```

3. Start the React development server:
```cmd
npm start
```

The frontend will run on `http://localhost:3000`

## Usage

1. **Start the Backend**: Ensure the backend server is running on port 3001
2. **Start the Frontend**: Launch the React app on port 3000
3. **Start Simulation**: Click "Start Simulation" to begin traffic generation
4. **Monitor Network**: Watch real-time updates of node queues and link utilization
5. **Adjust Traffic**: Use the traffic controls to modify packet generation rates
6. **Pause/Reset**: Use controls to pause or reset the simulation

## API Endpoints

- `GET /api/status` - Check API status
- `GET /api/network` - Get current network state
- `POST /api/start` - Start simulation
- `POST /api/pause` - Pause simulation
- `POST /api/reset` - Reset simulation
- `POST /api/traffic-rates` - Update traffic generation rates

## Algorithm Details

### Packet Generation
- Each node generates packets based on its traffic generation rate
- Packets are assigned random destinations (excluding source)
- Generation occurs every simulation step (1 second intervals)

### Routing Algorithm
- Uses Dijkstra's shortest path algorithm
- Routes packets from source to destination via optimal path
- Considers network topology but not current congestion for path selection

### Congestion Control
- Links have maximum capacity (packets per second)
- Packets are queued at nodes when downstream links are at capacity
- Queue sizes are tracked and displayed in real-time

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
- **Low Traffic**: 10-25 pps per node
- **Medium Traffic**: 20-60 pps per node  
- **High Traffic**: 60-90 pps per node

### Link Utilization Colors
- **Green**: < 50% utilization
- **Orange**: 50-80% utilization
- **Red**: > 80% utilization

## Performance Considerations

- Simulation runs at 1-second intervals to balance real-time feel with performance
- Packet processing is limited to 10 packets per node per step to prevent overwhelming
- WebSocket updates are sent only when network state changes
- In-memory storage keeps the application lightweight

## Future Enhancements

- Dynamic routing based on current link congestion
- More sophisticated queuing algorithms (priority queues, etc.)
- Historical data tracking and analytics
- Support for larger network topologies
- Advanced traffic patterns and scheduling
- Network failure simulation

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
