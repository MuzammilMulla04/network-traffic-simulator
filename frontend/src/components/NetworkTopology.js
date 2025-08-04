
const NetworkTopology = ({ nodes, links }) => {
    const linkPositions = {
        'A-B': { x1: 130, y1: 80, x2: 270, y2: 80 },
        'A-C': { x1: 130, y1: 110, x2: 130, y2: 180 },
        'B-D': { x1: 270, y1: 110, x2: 270, y2: 180 },
        'C-D': { x1: 160, y1: 210, x2: 240, y2: 210 },
        'C-E': { x1: 150, y1: 240, x2: 180, y2: 290 },
        'D-E': { x1: 250, y1: 240, x2: 220, y2: 290 }
    };

    const calculateLinkClass = (utilization) => {
        if (utilization >= 80) return 'link-load-high';
        if (utilization >= 50) return 'link-load-medium';
        return 'link-load-low';
    };

    const calculateLinkStyle = (link) => {
        const linkId = `${link.from}-${link.to}`;
        const reverseId = `${link.to}-${link.from}`;
        const pos = linkPositions[linkId] || linkPositions[reverseId];

        if (!pos) return {};

        const dx = pos.x2 - pos.x1;
        const dy = pos.y2 - pos.y1;
        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;

        return {
            left: pos.x1,
            top: pos.y1,
            width: length,
            transform: `rotate(${angle}deg)`,
        };
    };

    return (
        <div className="network-topology">
            <h2>Network Topology</h2>
            <div className="topology-container">
                {/* Render Links */}
                {links.map((link, index) => (
                    <div
                        key={index}
                        className={`link ${calculateLinkClass(link.utilization)}`}
                        style={calculateLinkStyle(link)}
                    >
                        <div className="link-info">
                            {link.currentLoad}/{link.capacity} ({link.utilization}%)
                        </div>
                    </div>
                ))}

                {/* Render Nodes */}
                {nodes.map((node) => (
                    <div
                        key={node.id}
                        className={`node node-${node.id}`}
                        title={`Node ${node.id}: Queue: ${node.queueSize}, Rate: ${node.trafficRate} pps`}
                    >
                        <div>
                            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{node.id}</div>
                            <div style={{ fontSize: '10px' }}>Q: {node.queueSize}</div>
                        </div>
                    </div>
                ))}

                {/* Network Title */}
                <div style={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    background: 'rgba(255,255,255,0.9)',
                    padding: '5px 10px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    border: '1px solid #ddd'
                }}>
                    5-Node Telecommunications Network
                </div>                {/* Legend */}
                <div style={{ position: 'absolute', bottom: 10, left: 10 }}>
                    <div style={{ fontSize: '12px', marginBottom: '5px' }}>
                        <strong>Link Load:</strong>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', fontSize: '11px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <div style={{ width: '15px', height: '4px', backgroundColor: '#2ecc71' }}></div>
                            Low (&lt;50%)
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <div style={{ width: '15px', height: '4px', backgroundColor: '#f39c12' }}></div>
                            Medium (50-80%)
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <div style={{ width: '15px', height: '4px', backgroundColor: '#e74c3c' }}></div>
                            High (&gt;80%)
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NetworkTopology;
