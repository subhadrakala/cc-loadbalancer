# CC-Loadbalancer

A powerful application-layer (Layer 7) load balancer built with Node.js and Express. This project was developed as part of the [Coding Challenges](https://codingchallenges.fyi/challenges/challenge-load-balancer) series to demonstrate core concepts in distributed systems, network proxying, and health management.

## 🚀 Features

- **Round-Robin Load Balancing**: Evenly distributes incoming traffic across a pool of backend servers.
- **Dynamic Proxying**: Transparently forwards requests (including headers and bodies) to target servers using Node.js streams.
- **Active & Passive Health Checks**:
  - **Active**: Background interval checks to monitor server availability.
  - **Passive**: "Just-in-time" verification before forwarding to ensure high reliability.
- **Advanced Logging**: Detailed request tracking including IP origins, method, paths, and forwarding targets.
- **Zero-Dependency Core**: Leverages built-in Node.js modules for performance and simplicity.

## 🏗️ Architecture

The system is composed of several key modules:

- **`index.js`**: The entry point. Handles the Express server lifecycle and the main request routing logic.
- **`servers.js`**: Manages the server pool, tracking state, and implementing the selection algorithm.
- **`connect.js`**: Orchestrates the network communication, request forwarding, and health check logic.
- **`log.js`**: Standardized logging utilities for visibility.

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/subhadrakala/cc-loadbalancer.git
   cd cc-loadbalancer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Load Balancer

1. Configure your backend servers in `application.json`.
2. Start the load balancer:
   ```bash
   npm start
   ```

## 🧪 Testing

This project uses the native Node.js test runner for robust verification of core logic.

Run the test suite:
```bash
npm test
```

Test coverage includes:
- **Server Selection**: Verifying Round-Robin precision.
- **Failover Logic**: Ensuring dead servers are skipped and re-evaluated.
- **Network Layer**: Mocking health checks and connection states.

## ⚙️ Configuration

Backend servers are defined in `application.json`:

```json
{
    "servers": [
        {
            "id": 1,
            "name": "server1",
            "port": 8080
        },
        ...
    ]
}
```
