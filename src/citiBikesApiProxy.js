const axios = require('axios');
const networksUrl = 'https://api.citybik.es/v2/networks/';

module.exports = function getAllNetworks(cityName) {

    function filterUsNetworks(data){
        let usNetworks = data.filter(network => network.location.country == 'US');
        return usNetworks;
    } 

    function filterCityNetwork(cityName, networks) {
        let cityNetwork = networks.filter(network => network.location.city == cityName);
        return cityNetwork;
    }

    return axios.get(networksUrl)
    .then((res) => filterUsNetworks(res.data.networks))
    .catch((err) => console.error(err))
} 

