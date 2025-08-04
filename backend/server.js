const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const NetworkSimulator = require('./networkSimulator');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize network simulator
const simulator = new NetworkSimulator();

// Routes
app.get('/api/status', (req, res) => {
    res.json({ status: 'Network Simulator API is running' });
});

app.get('/api/network', (req, res) => {
    res.json(simulator.getNetworkState());
});

app.post('/api/start', (req, res) => {
    simulator.start();
    res.json({ message: 'Simulation started' });
});

app.post('/api/pause', (req, res) => {
    simulator.pause();
    res.json({ message: 'Simulation paused' });
});

app.post('/api/reset', (req, res) => {
    simulator.reset();
    res.json({ message: 'Simulation reset' });
});

app.post('/api/traffic-rates', (req, res) => {
    const { rates } = req.body;
    simulator.updateTrafficRates(rates);
    res.json({ message: 'Traffic rates updated' });
});

// Socket.IO for real-time updates
io.on('connection', (socket) => {
    console.log('Client connected');

    // Send initial network state
    socket.emit('networkUpdate', simulator.getNetworkState());

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Set up real-time updates
simulator.onUpdate((networkState) => {
    io.emit('networkUpdate', networkState);
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
