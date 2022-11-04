const getAllNetworks = require("../src/citiBikesApiProxy.js");

describe("citi Bikes Api", () => {
    describe("get networks", () => {
        it('returns the network for a city', async () => {
            const result = await getAllNetworks("Aspen, CO");
            expect(result[0].href).toBe("/v2/networks/we-cycle");
        });

        it('returns null if a city is not provided', () => {});
        it('returns null if a city does not exist', () => {});
        it('returns null if a city does not have a network', () => {});
    });

});