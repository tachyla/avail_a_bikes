const {getNetworkHrefByCity, getNetworkStationsByHref} = require("../src/citiBikesApiProxy.js");
const mockAxios = require("axios");

jest.mock("axios");

describe("citi Bikes Api", () => {
    describe("get network href by city", () => {

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
    
    describe("get network stations by href", () => {
        xit("returns a network's stations", async () => {
            const result = await getNetworkStationsByHref("/v2/networks/cogo");
            
            const expectedResult = [
                {
                    "empty_slots": 9,
                    "extra": {
                        "ebikes": 0,
                        "has_ebikes": true,
                        "last_updated": 1667837844,
                        "payment": [
                            "key",
                            "creditcard",
                            "transitcard"
                        ],
                        "payment-terminal": true,
                        "renting": 1,
                        "returning": 1,
                        "uid": "d63ac3a4-3168-11ea-a9c2-021785291289"
                    },
                    "free_bikes": 2,
                    "id": "4f7ba232683b9030fd599b79ca8dcf5d",
                    "latitude": 39.962989,
                    "longitude": -83.004253,
                    "name": "City Hall",
                    "timestamp": "2022-11-07T16:18:22.284000Z"
                }
            ];
            expect(result).toBe();
        });

        it('returns null when no href is provided', async () => {
           const result = await getNetworkStationsByHref(null);
            expect(result).toBe(null);
        });
            
    });
});