const axios = require('axios');
const networksUrl = 'https://api.citybik.es/v2/networks/';

module.exports = function getAllNetworks(cityName) {

    function filterUsNetworks(data){
        let usNetworks = data.filter(network => network.location.country == 'US');
        for(let i = 0; i < usNetworks.length; i++){
            let network_cityAndState = usNetworks[i].location.city; //string of each NETWORK'S city
            let networkCityName = getCityName(network_cityAndState);
            if(networkCityName === cityName){
                return usNetworks[i].href;
            }
        } 
    } 

    function getCityName(cityAndState) {
        let indexOfComma = cityAndState.indexOf(",") //=> number
        let search_input_city = cityAndState.slice(0, indexOfComma);
        return search_input_city;
    }

    return axios.get(networksUrl)
    .then((res) => filterUsNetworks(res.data.networks))
    .catch((err) => console.error(err))
} 

