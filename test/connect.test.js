import { test, describe, mock } from 'node:test';
import assert from 'node:assert';
import { checkServerIsAlive } from '../connect.js';

describe(" Test connect.js", () => {

    test("Test checkServerIsAlive when server is alive", async () => {
        mock.method(global, 'fetch', async () => {
            return { ok: true };
        });

        const server = { port: 3000 };
        const isAlive = await checkServerIsAlive(server);
        assert.strictEqual(isAlive, true);
    });

    test("Test checkServerIsAlive when server is dead", async () => {
        mock.method(global, 'fetch', async () => {
            throw new Error("Connection Timeout");
        });

        const server = { port: 3000 };
        const isAlive = await checkServerIsAlive(server);
        assert.strictEqual(isAlive, false);
    });

});