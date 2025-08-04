
const Statistics = ({ nodes, links }) => {
    const totalPacketsInQueue = nodes.reduce((sum, node) => sum + node.queueSize, 0);
    const totalTrafficGeneration = nodes.reduce((sum, node) => sum + node.trafficRate, 0);
    const averageLinkUtilization = links.length > 0
        ? Math.round(links.reduce((sum, link) => sum + link.utilization, 0) / links.length)
        : 0;

    return (
        <div className="statistics">
            <h2>Real-time Statistics</h2>

            <div className="node-stats">
                <h3>Node Statistics</h3>
                <div className="stats-grid">
                    {nodes.map((node) => (
                        <div key={node.id} className="stat-card">
                            <h4>Node {node.id}</h4>
                            <div>Traffic Rate: <span className="stat-value">{node.trafficRate} pps</span></div>
                            <div>Queue Size: <span className="stat-value">{node.queueSize}</span></div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="link-stats">
                <h3>Link Statistics</h3>
                <div className="stats-grid">
                    {links.map((link, index) => (
                        <div key={index} className="stat-card">
                            <h4>{link.from} → {link.to}</h4>
                            <div>Load: <span className="stat-value">{link.currentLoad}/{link.capacity}</span></div>
                            <div>Utilization: <span className="stat-value">{link.utilization}%</span></div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="network-summary">
                <h3>Network Summary</h3>
                <div className="stats-grid">
                    <div className="stat-card">
                        <h4>Total Queue Size</h4>
                        <div className="stat-value">{totalPacketsInQueue}</div>
                    </div>
                    <div className="stat-card">
                        <h4>Total Traffic Generation</h4>
                        <div className="stat-value">{totalTrafficGeneration} pps</div>
                    </div>
                    <div className="stat-card">
                        <h4>Average Link Utilization</h4>
                        <div className="stat-value">{averageLinkUtilization}%</div>
                    </div>
                    <div className="stat-card">
                        <h4>Network Health</h4>
                        <div className="stat-value">
                            {averageLinkUtilization < 70 ? '✓ Good' :
                                averageLinkUtilization < 90 ? '⚠ Warning' : '✗ Critical'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Statistics;
