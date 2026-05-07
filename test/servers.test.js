import { test, describe } from 'node:test';
import assert from 'node:assert';
import Servers from '../servers.js';


describe('Servers unit tests', () => {

    test('Constructor should initialize servers correctly', () => {

        const servers = new Servers();
        const list = servers.getServers();
        assert.strictEqual(list.length, 3);
        assert.strictEqual(list[0].isAlive, true, "Servers should be alive by default");
    });


     test('Test findOneServer Round-robin order', () => {

        const servers = new Servers();
        let server1 = servers.findOneServer();
        assert.strictEqual(server1.id, 1);

        let server2 = servers.findOneServer();
        assert.strictEqual(server2.id, 2);

        let server3 = servers.findOneServer();
        assert.strictEqual(server3.id, 3);

        let server4 = servers.findOneServer();
        assert.strictEqual(server4.id, 1);
     });

      test('Test Dead server logic', () => {

        const servers = new Servers();

        let server1 = servers.findOneServer();
        servers.updateServerLiveStatus(server1, false);

        let server2 = servers.findOneServer();
        assert.strictEqual(server2.id, 2);

        let server3 = servers.findOneServer();
        assert.strictEqual(server3.id, 3);

        let server4 = servers.findOneServer();
        assert.strictEqual(server4.id, 2);
        
      
     });

     test('Test findOneServer returns null when all servers dead', () => {

        const servers = new Servers();

        let serversList = servers.getServers();

        serversList.forEach(server => {
            servers.updateServerLiveStatus(server, false);
        });

        let server1 = servers.findOneServer();
        assert.strictEqual(server1, null);
     });

});
