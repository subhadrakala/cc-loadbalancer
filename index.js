import express from "express";

import logRequestInfo from "./log.js";
import Servers from "./servers.js";
import { forwardToServer, checkServerIsAlive } from "./connect.js";

async function main() {
    const app = express();
    app.use(express.json());

    const port = 3000;

    let servers = new Servers();

    for (const element of servers.getServers()) {
        let status = await checkServerIsAlive(element);
        servers.updateServerLiveStatus(element, status);
    }

    app.get('/', async (req, res) => {

        try {

            logRequestInfo(req);
            let server = await assignServer(servers, res);
            if (server) {
                forwardToServer(req, res, server);
            }
        }
        catch (error) {
            console.log(error)
        }
    })


    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    });
}

async function assignServer(servers, res) {

    const server = await servers.findOneServer();
    let isAlive;
    if (server) {
        isAlive = await checkServerIsAlive(server);
    }
    else {
        res.status(404);
        res.message('Servers are not available');
        return;
    }
    if (isAlive) {
        return server;
    }
    else {
        servers.updateServerLiveStatus(server);
        assignServer(servers, res);
    }

}


main()
