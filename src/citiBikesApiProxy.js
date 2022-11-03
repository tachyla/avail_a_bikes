const axios = require('axios');

module.exports = function fetchAllNetworks(cityName) {  
    
   function getNetworks() {

        const requestNetworks = axios.get('https://api.citybik.es/v2/networks')
        .then(resp => handleResponse(resp.data.networks))
        .catch((error) => console.error(error.resp.body))

        function handleResponse(data) {
            // console.log(data);
            let results = data;
            const filteredUsNetworks = results.filter(network => network.location.country == 'US');
            console.log(filteredUsNetworks);
        }
    }
    return getNetworks();
}
