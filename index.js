import express from "express";
import http from "http";

const app = express();
app.use(express.json());

const port = 3000;

app.get('/', (req, res) => {

    try {
        console.log(`Received request from ${req.ip}`);
        console.log(`${req.method} ${req.url} HTTP/${req.httpVersion}`);
        console.log(`Host: ${req.get('host')}`);
        console.log(`User-Agent: ${req.get('user-agent')}`);
        console.log(`Accept: ${req.get('accept')}`);

        const options = {
            host: 'localhost',
            port: 8080,
            path: req.url,
            method: req.method,
            headers: req.headers
        };

        const proxy_req = http.request(options, (proxy_res) => {
            res.writeHead(proxy_res.statusCode, proxy_res.headers);
            proxy_res.pipe(res, { end: true });
        });

        proxy_req.on('error', (e) => {
            console.error(`Problem with request: ${e.message}`);
            res.status(500).send('Server Error');
        });

        proxy_req.end();
    }
    catch(error) {
        console.log(error)
    }
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

export default app;