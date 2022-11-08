const {getNetworkHrefByCity, getNetworkStationsByHref} = require("../src/citiBikesApiProxy.js");
const axios = require("axios");

jest.mock("axios");

describe("citi Bikes Api", () => {

    describe("get network href by city", () => {
        it('returns the network for a city', async () => {
            // ARRANGE
            const data = {"networks": [
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
                    }
                }
            ]};
            axios.get.mockResolvedValueOnce({"data": data}); 
            
            // ACTION
            const result = await getNetworkHrefByCity("Columbus");
            
            // ASSERTION
            expect(result).toBe("/v2/networks/cogo");
        });

        it('returns null if a city is not provided', async () => {
                 // ARRANGE
                 const data = {
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
                            }
                        }
                    ]
                };
                axios.get.mockResolvedValueOnce({"data": data}); 
                
                //ACTION
                const result = await getNetworkHrefByCity(null);

                //ASSERTION
                expect(result).toBe(null);
        });

        it('returns null if a city does not exist', async () => {
            // ARRANGE
            const data = {
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
                    }
                }
            ]};
            axios.get.mockResolvedValueOnce({"data": data}); 
        
            //ACTION
            const result = await getNetworkHrefByCity("Fakecity");

            // ASSERT
            expect(result).toBe(null);
        });
    });
    
    describe("get network stations by href", () => {
        it('returns null when no href is provided', async () => {
            const data = {
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
                ]
            };
            axios.get.mockResolvedValueOnce({"data": data});
        
           const result = await getNetworkStationsByHref(null);
            expect(result).toBe(null);
        });

        it("returns first station name that has at least N number of bikes ", async () => {
            // ARRANGE
            const data = {
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
                ]
            };
            axios.get.mockResolvedValueOnce({"data": data});
            let numberOfBikes = 3;
            
            // ACTION
            const result = await getNetworkStationsByHref("/v2/networks/cogo", numberOfBikes);  
            
            // ASSERTION 
            expect(result).toBe("High St & Warren");
        });
    });
});