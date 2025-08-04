const { v4: uuidv4 } = require('uuid');

class NetworkSimulator {
    constructor() {
        this.nodes = ['A', 'B', 'C', 'D', 'E'];
        this.links = [
            { from: 'A', to: 'B', capacity: 100 },
            { from: 'A', to: 'C', capacity: 80 },
            { from: 'B', to: 'D', capacity: 70 },
            { from: 'C', to: 'D', capacity: 90 },
            { from: 'C', to: 'E', capacity: 110 },
            { from: 'D', to: 'E', capacity: 60 }
        ];

        this.trafficRates = {
            'A': 50,
            'B': 30,
            'C': 40,
            'D': 20,
            'E': 60
        };

        this.nodeQueues = {};
        this.linkLoads = {};
        this.packets = [];
        this.isRunning = false;
        this.simulationInterval = null;
        this.updateCallback = null;

        this.initializeNetwork();
    }

    initializeNetwork() {
        // Initialize node queues
        this.nodes.forEach(node => {
            this.nodeQueues[node] = [];
        });

        // Initialize link loads
        this.links.forEach(link => {
            const linkId = `${link.from}-${link.to}`;
            this.linkLoads[linkId] = { current: 0, capacity: link.capacity };
            // Also add reverse direction
            const reverseLinkId = `${link.to}-${link.from}`;
            this.linkLoads[reverseLinkId] = { current: 0, capacity: link.capacity };
        });
    }

    // Shortest path algorithm (Dijkstra's)
    findShortestPath(start, end) {
        const distances = {};
        const previous = {};
        const unvisited = new Set(this.nodes);

        // Initialize distances
        this.nodes.forEach(node => {
            distances[node] = node === start ? 0 : Infinity;
            previous[node] = null;
        });

        while (unvisited.size > 0) {
            // Find unvisited node with minimum distance
            let current = null;
            let minDistance = Infinity;

            for (const node of unvisited) {
                if (distances[node] < minDistance) {
                    minDistance = distances[node];
                    current = node;
                }
            }

            if (current === null || distances[current] === Infinity) break;

            unvisited.delete(current);

            if (current === end) break;

            // Check neighbors
            this.links.forEach(link => {
                let neighbor = null;
                if (link.from === current) neighbor = link.to;
                else if (link.to === current) neighbor = link.from;

                if (neighbor && unvisited.has(neighbor)) {
                    const alt = distances[current] + 1; // Using hop count as weight
                    if (alt < distances[neighbor]) {
                        distances[neighbor] = alt;
                        previous[neighbor] = current;
                    }
                }
            });
        }

        // Reconstruct path
        const path = [];
        let current = end;
        while (current !== null) {
            path.unshift(current);
            current = previous[current];
        }

        return path.length > 1 && path[0] === start ? path : [];
    }

    generatePackets() {
        this.nodes.forEach(sourceNode => {
            const rate = this.trafficRates[sourceNode];
            const packetsToGenerate = Math.floor(Math.random() * rate / 10); // Scaled down for simulation

            for (let i = 0; i < packetsToGenerate; i++) {
                // Random destination (different from source)
                const availableDestinations = this.nodes.filter(node => node !== sourceNode);
                const destination = availableDestinations[Math.floor(Math.random() * availableDestinations.length)];

                const packet = {
                    id: uuidv4(),
                    source: sourceNode,
                    destination: destination,
                    currentNode: sourceNode,
                    path: this.findShortestPath(sourceNode, destination),
                    pathIndex: 0,
                    timestamp: Date.now()
                };

                if (packet.path.length > 0) {
                    this.nodeQueues[sourceNode].push(packet);
                }
            }
        });
    }

    processPackets() {
        // Reset link loads
        Object.keys(this.linkLoads).forEach(linkId => {
            this.linkLoads[linkId].current = 0;
        });

        // Process packets at each node
        this.nodes.forEach(node => {
            const queue = this.nodeQueues[node];
            const packetsToProcess = Math.min(queue.length, 10); // Process up to 10 packets per step

            for (let i = 0; i < packetsToProcess; i++) {
                const packet = queue.shift();

                if (packet.pathIndex < packet.path.length - 1) {
                    const currentNode = packet.path[packet.pathIndex];
                    const nextNode = packet.path[packet.pathIndex + 1];
                    const linkId = `${currentNode}-${nextNode}`;

                    // Check if link has capacity
                    if (this.linkLoads[linkId] && this.linkLoads[linkId].current < this.linkLoads[linkId].capacity) {
                        // Move packet to next node
                        packet.pathIndex++;
                        packet.currentNode = nextNode;
                        this.linkLoads[linkId].current++;

                        if (packet.pathIndex < packet.path.length - 1) {
                            // Packet hasn't reached destination, add to next node's queue
                            this.nodeQueues[nextNode].push(packet);
                        }
                        // If packet reached destination, it's completed and removed
                    } else {
                        // Link at capacity, put packet back in queue
                        queue.unshift(packet);
                        break;
                    }
                }
            }
        });
    }

    simulationStep() {
        if (!this.isRunning) return;

        this.generatePackets();
        this.processPackets();

        if (this.updateCallback) {
            this.updateCallback(this.getNetworkState());
        }
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.simulationInterval = setInterval(() => {
                this.simulationStep();
            }, 1000); // 1 second intervals
        }
    }

    pause() {
        this.isRunning = false;
        if (this.simulationInterval) {
            clearInterval(this.simulationInterval);
            this.simulationInterval = null;
        }
    }

    reset() {
        this.pause();
        this.initializeNetwork();
        this.packets = [];

        if (this.updateCallback) {
            this.updateCallback(this.getNetworkState());
        }
    }

    updateTrafficRates(newRates) {
        this.trafficRates = { ...this.trafficRates, ...newRates };
    }

    onUpdate(callback) {
        this.updateCallback = callback;
    }

    getNetworkState() {
        return {
            nodes: this.nodes.map(node => ({
                id: node,
                trafficRate: this.trafficRates[node],
                queueSize: this.nodeQueues[node].length
            })),
            links: this.links.map(link => {
                const linkId = `${link.from}-${link.to}`;
                return {
                    from: link.from,
                    to: link.to,
                    capacity: link.capacity,
                    currentLoad: this.linkLoads[linkId] ? this.linkLoads[linkId].current : 0,
                    utilization: this.linkLoads[linkId] ?
                        Math.round((this.linkLoads[linkId].current / this.linkLoads[linkId].capacity) * 100) : 0
                };
            }),
            isRunning: this.isRunning,
            timestamp: Date.now()
        };
    }
}

module.exports = NetworkSimulator;
