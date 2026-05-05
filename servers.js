import config from "./application.json" assert { type: "json" };


class Servers {

    serversInfo;
    serverCount;
    serverIndex;

    constructor() {
        this.serverCount = config.servers.length;
        this.serversInfo = config.servers;
        this.serverIndex = 0;
        this.serversInfo = config.servers.map(s => ({ ...s, isAlive: true }));
    }

    getServers() {
        return this.serversInfo;
    }

    findOneServer() {

        if (this.serverIndex >= this.serverCount) {
            this.serverIndex = 0;
        }

        let checkedCount = 0;
        while (this.serversInfo[this.serverIndex].isAlive === false) {
            this.serverIndex++;
            if (this.serverIndex === this.serverCount) {
                this.serverIndex = 0;
            }
            checkedCount++;
            if (checkedCount >= this.serverCount) {
                return null; // All servers are down
            }
        }
        let serverSelected = this.serversInfo[this.serverIndex];
        this.serverIndex++;
        serverSelected.requestCount++;
        return serverSelected;

    }

    updateServerLiveStatus(server, status) {
        for (let i = 0; i < this.serverCount; i++) {
            if (this.serversInfo[i].id === server.id) {
                this.serversInfo[i].isAlive = status;
            }
        }
    }

}

export default Servers;