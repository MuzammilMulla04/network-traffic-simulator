
import React, { useState } from 'react';

const NetworkTopology = ({ nodes, links }) => {
    const [selectedNode, setSelectedNode] = useState(null);

    // Node positions for better layout
    const nodePositions = {
        'A': { x: 150, y: 100 },
        'B': { x: 350, y: 100 },
        'C': { x: 150, y: 250 },
        'D': { x: 350, y: 250 },
        'E': { x: 250, y: 350 }
    };

    const linkPaths = {
        'A-B': { path: 'M 150 100 L 350 100' },
        'A-C': { path: 'M 150 100 L 150 250' },
        'B-D': { path: 'M 350 100 L 350 250' },
        'C-D': { path: 'M 150 250 L 350 250' },
        'C-E': { path: 'M 150 250 L 250 350' },
        'D-E': { path: 'M 350 250 L 250 350' }
    };

    const getNodeColor = (nodeId) => {
        const colors = {
            'A': '#e74c3c',
            'B': '#3498db',
            'C': '#2ecc71',
            'D': '#f39c12',
            'E': '#9b59b6'
        };
        return colors[nodeId] || '#34495e';
    };

    const getLinkColor = (utilization) => {
        if (utilization >= 80) return '#e74c3c';
        if (utilization >= 50) return '#f39c12';
        return '#2ecc71';
    };

    const getLinkWidth = (utilization) => {
        return Math.max(3, (utilization / 100) * 8);
    };

    const handleNodeClick = (node) => {
        setSelectedNode(selectedNode === node.id ? null : node.id);
    };

    return (
        <div className="network-topology">
            <h2>Network Topology</h2>
            <div className="topology-container-modern">
                <svg width="500" height="450" className="network-svg">
                    {/* Background grid */}
                    <defs>
                        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f0f0f0" strokeWidth="1" opacity="0.3" />
                        </pattern>

                        {/* Gradient definitions */}
                        <radialGradient id="nodeGradient" cx="0.3" cy="0.3">
                            <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
                            <stop offset="100%" stopColor="rgba(0,0,0,0.2)" />
                        </radialGradient>

                        {/* Glow filter */}
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    <rect width="100%" height="100%" fill="url(#grid)" />

                    {/* Render Links */}
                    {links.map((link, index) => {
                        const linkId = `${link.from}-${link.to}`;
                        const reverseLinkId = `${link.to}-${link.from}`;
                        const linkPath = linkPaths[linkId] || linkPaths[reverseLinkId];

                        if (!linkPath) return null;

                        return (
                            <g key={index}>
                                {/* Shadow/glow effect */}
                                <path
                                    d={linkPath.path}
                                    stroke="rgba(0,0,0,0.1)"
                                    strokeWidth={getLinkWidth(link.utilization) + 2}
                                    fill="none"
                                    strokeLinecap="round"
                                />

                                {/* Main link */}
                                <path
                                    d={linkPath.path}
                                    stroke={getLinkColor(link.utilization)}
                                    strokeWidth={getLinkWidth(link.utilization)}
                                    fill="none"
                                    strokeLinecap="round"
                                    className="network-link"
                                    style={{
                                        filter: link.utilization > 70 ? 'url(#glow)' : 'none'
                                    }}
                                />

                                {/* Link label */}
                                <text
                                    x={(nodePositions[link.from].x + nodePositions[link.to].x) / 2}
                                    y={(nodePositions[link.from].y + nodePositions[link.to].y) / 2 - 10}
                                    textAnchor="middle"
                                    className="link-label"
                                    fill="#2c3e50"
                                    fontSize="10"
                                    fontWeight="bold"
                                >
                                    {link.currentLoad}/{link.capacity}
                                </text>

                                {/* Utilization percentage */}
                                <text
                                    x={(nodePositions[link.from].x + nodePositions[link.to].x) / 2}
                                    y={(nodePositions[link.from].y + nodePositions[link.to].y) / 2 + 5}
                                    textAnchor="middle"
                                    className="utilization-label"
                                    fill={getLinkColor(link.utilization)}
                                    fontSize="9"
                                    fontWeight="bold"
                                >
                                    {link.utilization}%
                                </text>
                            </g>
                        );
                    })}

                    {/* Render Nodes */}
                    {nodes.map((node) => {
                        const pos = nodePositions[node.id];
                        const isSelected = selectedNode === node.id;

                        return (
                            <g key={node.id} onClick={() => handleNodeClick(node)} style={{ cursor: 'pointer' }}>
                                {/* Node shadow */}
                                <circle
                                    cx={pos.x + 2}
                                    cy={pos.y + 2}
                                    r={isSelected ? 32 : 28}
                                    fill="rgba(0,0,0,0.2)"
                                />

                                {/* Node background */}
                                <circle
                                    cx={pos.x}
                                    cy={pos.y}
                                    r={isSelected ? 30 : 26}
                                    fill={getNodeColor(node.id)}
                                    className="network-node"
                                    stroke={isSelected ? '#ffffff' : '#2c3e50'}
                                    strokeWidth={isSelected ? 3 : 2}
                                    filter={isSelected ? 'url(#glow)' : 'none'}
                                />

                                {/* Node gradient overlay */}
                                <circle
                                    cx={pos.x}
                                    cy={pos.y}
                                    r={isSelected ? 30 : 26}
                                    fill="url(#nodeGradient)"
                                />

                                {/* Node label */}
                                <text
                                    x={pos.x}
                                    y={pos.y - 5}
                                    textAnchor="middle"
                                    fill="white"
                                    fontSize="16"
                                    fontWeight="bold"
                                    className="node-label"
                                >
                                    {node.id}
                                </text>

                                {/* Queue size */}
                                <text
                                    x={pos.x}
                                    y={pos.y + 8}
                                    textAnchor="middle"
                                    fill="white"
                                    fontSize="10"
                                    fontWeight="bold"
                                >
                                    Q: {node.queueSize}
                                </text>

                                {/* Pulse animation for active nodes */}
                                {node.queueSize > 0 && (
                                    <circle
                                        cx={pos.x}
                                        cy={pos.y}
                                        r={26}
                                        fill="none"
                                        stroke={getNodeColor(node.id)}
                                        strokeWidth="2"
                                        opacity="0.6"
                                        className="node-pulse"
                                    />
                                )}
                            </g>
                        );
                    })}
                </svg>

                {/* Modern Legend */}
                <div className="modern-legend">
                    <div className="legend-title">Network Status</div>
                    <div className="legend-grid">
                        <div className="legend-section">
                            <div className="legend-subtitle">Link Utilization</div>
                            <div className="legend-items">
                                <div className="legend-item">
                                    <div className="legend-color-bar" style={{ backgroundColor: '#2ecc71' }}></div>
                                    <span>Low (&lt;50%)</span>
                                </div>
                                <div className="legend-item">
                                    <div className="legend-color-bar" style={{ backgroundColor: '#f39c12' }}></div>
                                    <span>Medium (50-80%)</span>
                                </div>
                                <div className="legend-item">
                                    <div className="legend-color-bar" style={{ backgroundColor: '#e74c3c' }}></div>
                                    <span>High (&gt;80%)</span>
                                </div>
                            </div>
                        </div>

                        <div className="legend-section">
                            <div className="legend-subtitle">Interaction</div>
                            <div className="legend-note">Click nodes for details</div>
                        </div>
                    </div>
                </div>

                {/* Node Details Panel */}
                {selectedNode && (
                    <div className="node-details-panel">
                        <div className="panel-header">
                            <h4>Node {selectedNode} Details</h4>
                            <button
                                className="close-btn"
                                onClick={() => setSelectedNode(null)}
                            >
                                ×
                            </button>
                        </div>
                        <div className="panel-content">
                            {nodes.filter(n => n.id === selectedNode).map(node => (
                                <div key={node.id}>
                                    <div className="detail-item">
                                        <span className="label">Queue Size:</span>
                                        <span className="value">{node.queueSize} packets</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="label">Traffic Rate:</span>
                                        <span className="value">{node.trafficRate} pps</span>
                                    </div>
                                    <div className="detail-item">
                                        <span className="label">Status:</span>
                                        <span className={`status ${node.queueSize > 10 ? 'congested' : 'normal'}`}>
                                            {node.queueSize > 10 ? 'Congested' : 'Normal'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NetworkTopology;
