import http from "http";


const keepAliveAgent = new http.Agent({
    keepAlive: true,
    keepAliveMsecs: 1000, // keep the connection for 1 second of inactivity
    maxSockets: 100,      // maximum concurrent connections to a single server
});


export async function forwardToServer(req, res, server) {

    /* using http connect because it is better
    at piping the request to the server without
    loading whole thing to the memory */
    const options = {
        host: 'localhost',
        port: server.port,
        path: req.url,
        method: req.method,
        headers: req.headers,
        agent: keepAliveAgent
    };

    const new_req = http.request(options, (new_res) => {
        res.writeHead(new_res.statusCode, new_res.headers);
        new_res.pipe(res, { end: true });
    });

    new_req.on('error', (e) => {
        console.error(`Problem with request: ${e.message}`);
            res.status(500).send('Server Error');
    });

    new_req.end();
}


export async function checkServerIsAlive(server) {
    try {
        // Using fetch for health check because it is simple
        const response = await fetch(`http://localhost:${server.port}/status`, { 
            signal: AbortSignal.timeout(2000) 
        });
        return response.ok;
    } catch {
        return false;
    }
}
