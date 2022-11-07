const fetchAllNetworks = require("../src/citiBikesApiProxy.js");
const mockAxios = require("axios");

jest.mock("axios");
mockAxios.get.mockImplementation(() => Promise.resolve( {data: {
    "networks": [
        {
            "href": "/v2/networks/cogo",
            "location": {
                "city": "Columbus, OH",
                "country": "US",
            },
        },
    ]} 
}));

describe("citi Bikes Api", () => {
    describe("get networks", () => {
        it('returns the network for a city', async () => {
            const result = await fetchAllNetworks("Columbus");
            expect(result).toBe("/v2/networks/cogo");
        });

        it('returns null if a city is not provided', async () => {
            const result = await fetchAllNetworks(null);
            expect(result).toBe(null);
        });

        it('returns null if a city does not exist', async () => {
            const result = await fetchAllNetworks("Fakecity");
            expect(result).toBe(null);

        });
        it('returns null if a city does not have a network', () => {});
    });

});