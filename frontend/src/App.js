import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import NetworkTopology from './components/NetworkTopology';
import Statistics from './components/Statistics';
import TrafficControls from './components/TrafficControls';

const API_BASE = process.env.NODE_ENV === 'production'
    ? 'https://your-backend-url.herokuapp.com'
    : 'http://localhost:3001';

function App() {
    const [networkState, setNetworkState] = useState({
        nodes: [],
        links: [],
        isRunning: false,
        timestamp: Date.now()
    });

    useEffect(() => {
        // Initialize socket connection
        const newSocket = io(API_BASE);

        // Listen for network updates
        newSocket.on('networkUpdate', (data) => {
            setNetworkState(data);
        });

        // Fetch initial network state
        fetchNetworkState();

        return () => {
            newSocket.close();
        };
    }, []);

    const fetchNetworkState = async () => {
        try {
            const response = await fetch(`${API_BASE}/api/network`);
            const data = await response.json();
            setNetworkState(data);
        } catch (error) {
            console.error('Error fetching network state:', error);
        }
    };

    const handleStart = async () => {
        try {
            await fetch(`${API_BASE}/api/start`, { method: 'POST' });
        } catch (error) {
            console.error('Error starting simulation:', error);
        }
    };

    const handlePause = async () => {
        try {
            await fetch(`${API_BASE}/api/pause`, { method: 'POST' });
        } catch (error) {
            console.error('Error pausing simulation:', error);
        }
    };

    const handleReset = async () => {
        try {
            await fetch(`${API_BASE}/api/reset`, { method: 'POST' });
        } catch (error) {
            console.error('Error resetting simulation:', error);
        }
    };

    const handleTrafficRatesUpdate = async (rates) => {
        try {
            await fetch(`${API_BASE}/api/traffic-rates`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ rates }),
            });
        } catch (error) {
            console.error('Error updating traffic rates:', error);
        }
    };

    return (
        <div className="app">
            <header className="header">
                <h1>Network Traffic Simulator</h1>
                <p>Real-time telecommunications network simulation</p>
                <span className={`status-indicator ${networkState.isRunning ? 'status-running' : 'status-paused'}`}></span>
                <span>{networkState.isRunning ? 'Running' : 'Paused'}</span>
            </header>

            <div className="controls">
                <button
                    className="btn btn-start"
                    onClick={handleStart}
                    disabled={networkState.isRunning}
                >
                    Start Simulation
                </button>
                <button
                    className="btn btn-pause"
                    onClick={handlePause}
                    disabled={!networkState.isRunning}
                >
                    Pause Simulation
                </button>
                <button
                    className="btn btn-reset"
                    onClick={handleReset}
                >
                    Reset Simulation
                </button>
            </div>

            <div className="dashboard">
                <NetworkTopology
                    nodes={networkState.nodes}
                    links={networkState.links}
                />
                <Statistics
                    nodes={networkState.nodes}
                    links={networkState.links}
                />
            </div>

            <TrafficControls
                nodes={networkState.nodes}
                onUpdate={handleTrafficRatesUpdate}
            />
        </div>
    );
}

export default App;
