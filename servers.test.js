import { test, describe } from 'node:test';
import assert from 'node:assert';
import Servers from './servers.js';


describe('Servers unit tests', () => {

    test('Constructor should initialize servers correctly', () => {

        const servers = new Servers();
        const list = servers.getServers();
        assert.strictEqual(list.length, 3);
        assert.strictEqual(list[0].isAlive, true, "Servers should be alive by default");
    });
});
