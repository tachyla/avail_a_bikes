const getNetworkHrefByCity = require("../src/citiBikesApiProxy.js");
const mockAxios = require("axios");

jest.mock("axios");
mockAxios.get.mockImplementation(() => Promise.resolve( {data: {
    "networks": [
        {
            "location": {
                "city": "Columbus",
                "country": "fakeCountry",
            },
        },
        {
            "location": {
                "city": "Miami, FL",
                "country": "US",
            },
        },
        {
            "href": "/v2/networks/cogo",
            "location": {
                "city": "Columbus, OH",
                "country": "US",
            },
        }
    ]} 
}));

describe("citi Bikes Api", () => {
    describe("get networks", () => {
        it('returns the network for a city', async () => {
            const result = await getNetworkHrefByCity("Columbus");
            expect(result).toBe("/v2/networks/cogo");
        });

        it('returns null if a city is not provided', async () => {
            const result = await getNetworkHrefByCity(null);
            expect(result).toBe(null);
        });

        it('returns null if a city does not exist', async () => {
            const result = await getNetworkHrefByCity("Fakecity");
            expect(result).toBe(null);
        });
    });
});