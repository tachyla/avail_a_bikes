const {getNetworkHrefByCity, getNetworkStationsByHref} = require("../src/citiBikesApiProxy.js");
const mockAxios = require("axios");

jest.mock("axios");

describe("citi Bikes Api", () => {
    
    describe("get network href by city", () => {
        beforeEach(() => {
            mockAxios.get.mockImplementationOnce(() => Promise.resolve( {data: {
                "networks": [
                    {
                        "href": "/v2/networks/fake",
                        "location": {
                            "city": "Columbus",
                            "country": "fakeCountry",
                        },
                    },
                    {                        
                        "href": "/v2/networks/fakePath",
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
        });

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
        beforeEach(() => {
            mockAxios.get.mockImplementation(() => Promise.resolve({data: {
                "stations": [
                {
                    "empty_slots": 9,
                    "free_bikes": 2,
                    "name": "City Hall",
                },
                {
                    "empty_slots": 2,
                    "free_bikes": 13,
                    "name": "High St & Warren"
                }
                ]}
            }));
        });
        
        it('returns null when no href is provided', async () => {
           const result = await getNetworkStationsByHref(null);
            expect(result).toBe(null);
        });

        it("returns first station name that has at least N number of bikes ", async () => {
            let numberOfBikes = 3;
            const result = await getNetworkStationsByHref("/v2/networks/cogo", numberOfBikes);   
            console.log(result);       
            expect(result).toBe("High St & Warren");
        });
    });
});