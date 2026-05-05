function logRequestInfo (req) {

    console.log(`Received request from ${req.ip}`);
    console.log(`${req.method} ${req.url} HTTP/${req.httpVersion}`);
    console.log(`Host: ${req.get('host')}`);
    console.log(`User-Agent: ${req.get('user-agent')}`);
    console.log(`Accept: ${req.get('accept')}`);

}

function logServerForwarding(req, server) {
    console.log(`Forwarding request from ${req.ip} to ${server.name}`);
}

export { logRequestInfo, logServerForwarding };


























