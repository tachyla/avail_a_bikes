const fetchAllNetworks = require("../src/citiBikesApiProxy.js");

describe("citi Bikes Api", () => {
    describe("get networks", () => {
        it('returns the network for a city', async () => {
            const result = await fetchAllNetworks("Aspen");
            expect(result).toBe("/v2/networks/we-cycle");
        });

        it('returns the network for a city', async () => {
            const result = await fetchAllNetworks("Chicago");
            expect(result).toBe("/v2/networks/divvy");
        });

        it('returns null if a city is not provided', () => {});
        it('returns null if a city does not exist', () => {});
        it('returns null if a city does not have a network', () => {});
    });

});