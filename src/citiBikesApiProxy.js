const axios = require('axios');

module.exports = function fetchAllNetworks(cityName) {  
    function filterUsCallback(array) {
        array.filter(element => console.log(element));
    }

    async function getNetworks() { //promise #1
        // promise#1 resolved
        try {
            const getNetworksResponseData = await axios.get('https://api.citybik.es/v2/networks')
            .then(resp => {//promise #1
                const networksResponseData = resp.data.networks;

                try {//promise#2 resolved
                    async function filteredUsNetworks(networksResponseData){
                        const usNetworks = networksResponseData.filter(network => network.location.country == 'US')
                        return usNetworks;
                    }
                }

                //promise #2 rejected
                catch(error) {
                    console.error(error.networksResponseData.body);
                }
            });
        

        
        
        }
         // promise#1 rejected
        catch(error) {
            console.error(error.resp.body);
        }
    }
     
    return getNetworks();
}
