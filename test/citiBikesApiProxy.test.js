const fetchAllNetworks = require("../src/citiBikesApiProxy.js");

describe("citi Bikes Api", () => {
    describe("fetch network", () => {
        it.only('returns the network for a city', () => {
            // mock this http call
            const networkResult = fetchAllNetworks("Philadelphia");
            //console.log(networkResult.href);
            expect(networkResult.network.href).toBe("/v2/networks/indego");
        });

        it('returns null if a city is not provided', () => {});
        it('returns null if a city does not exist', () => {});
        it('returns null if a city does not have a network', () => {});
    });

});