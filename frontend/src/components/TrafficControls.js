import { useEffect, useState } from 'react';

const TrafficControls = ({ nodes, onUpdate }) => {
    const [trafficRates, setTrafficRates] = useState({});

    useEffect(() => {
        // Initialize traffic rates from nodes
        const initialRates = {};
        nodes.forEach(node => {
            initialRates[node.id] = node.trafficRate;
        });
        setTrafficRates(initialRates);
    }, [nodes]);

    const handleRateChange = (nodeId, value) => {
        const newRates = {
            ...trafficRates,
            [nodeId]: parseInt(value) || 0
        };
        setTrafficRates(newRates);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(trafficRates);
    };

    return (
        <div className="traffic-controls">
            <h3>Traffic Rate Controls</h3>
            <p>Adjust the packet generation rate for each node (packets per second)</p>

            <form onSubmit={handleSubmit}>
                <div className="traffic-inputs">
                    {nodes.map((node) => (
                        <div key={node.id} className="input-group">
                            <label htmlFor={`rate-${node.id}`}>
                                Node {node.id} Rate (pps)
                            </label>
                            <input
                                id={`rate-${node.id}`}
                                type="number"
                                min="0"
                                max="200"
                                value={trafficRates[node.id] || 0}
                                onChange={(e) => handleRateChange(node.id, e.target.value)}
                            />
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <button type="submit" className="btn btn-start">
                        Update Traffic Rates
                    </button>
                </div>
            </form>

            <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
                <h4>Predefined Traffic Patterns:</h4>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <button
                        type="button"
                        className="btn"
                        style={{ backgroundColor: '#17a2b8', color: 'white', fontSize: '12px', padding: '5px 10px' }}
                        onClick={() => {
                            const lowTraffic = { A: 20, B: 15, C: 18, D: 10, E: 25 };
                            setTrafficRates(lowTraffic);
                            onUpdate(lowTraffic);
                        }}
                    >
                        Low Traffic
                    </button>
                    <button
                        type="button"
                        className="btn"
                        style={{ backgroundColor: '#28a745', color: 'white', fontSize: '12px', padding: '5px 10px' }}
                        onClick={() => {
                            const mediumTraffic = { A: 50, B: 30, C: 40, D: 20, E: 60 };
                            setTrafficRates(mediumTraffic);
                            onUpdate(mediumTraffic);
                        }}
                    >
                        Medium Traffic
                    </button>
                    <button
                        type="button"
                        className="btn"
                        style={{ backgroundColor: '#dc3545', color: 'white', fontSize: '12px', padding: '5px 10px' }}
                        onClick={() => {
                            const highTraffic = { A: 80, B: 70, C: 75, D: 60, E: 90 };
                            setTrafficRates(highTraffic);
                            onUpdate(highTraffic);
                        }}
                    >
                        High Traffic
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TrafficControls;
