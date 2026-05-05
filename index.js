import express from "express";

import { logRequestInfo, logServerForwarding }from "./log.js";
import Servers from "./servers.js";
import { forwardToServer, checkServerIsAlive } from "./connect.js";

async function main() {
    const app = express();

    const port = 3000;

    let servers = new Servers();

    const performHealthCheck = async () => {
        await Promise.all(
            servers.getServers().map(async (element) => {
                let status = await checkServerIsAlive(element);
                servers.updateServerLiveStatus(element, status);
            })
        )
    };

    await performHealthCheck();

    setInterval(performHealthCheck, 30000);

    app.use('/', async (req, res) => {

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
    while (true) {
        const server = await servers.findOneServer();

        // No more servers available at all
        if (!server) {
            console.log("All servers are dead");
            res.status(404).json({ message: "No servers found" });
            return null;
        }
        const isAlive = await checkServerIsAlive(server);
        if (isAlive) {
            return server;
        } else {
            servers.updateServerLiveStatus(server, false);
            console.log(`Server ${server.name} found dead during forwarding, retrying...`);
        }
    }
}



main()
