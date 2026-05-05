import express from "express";

import { logRequestInfo, logServerForwarding }from "./log.js";
import Servers from "./servers.js";
import { forwardToServer, checkServerIsAlive } from "./connect.js";

async function main() {
    const app = express();
    app.use(express.json());

    const port = 3000;

    let servers = new Servers();

    const performHealthCheck = async () => {
        for (const element of servers.getServers()) {
            let status = await checkServerIsAlive(element);
            servers.updateServerLiveStatus(element, status);
        }
    };

    await performHealthCheck();

    setInterval(performHealthCheck, 30000);

    app.get('/', async (req, res) => {

        try {

            logRequestInfo(req);
            let server = await assignServer(servers, res);
            if (server) {
                logServerForwarding(req, server);
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
        console.log("All servers are dead")
        res.json({ message: "No serves found" });
        return;
    }
    if (isAlive) {
        return server;
    }
    else {
        servers.updateServerLiveStatus(server, false);
        return await assignServer(servers, res);
    }

}


main()
