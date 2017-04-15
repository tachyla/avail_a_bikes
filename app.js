const baseUrl = "http://api.citybik.es/v2/networks";
//const baseUrl = "http://api.citybik.es"

/**
  Fetches networks from CityBike API based on cityName
  @param {String}   cityName
  @param {Function} callback - passes data response as first param
*/
function fetchAllNetworks(cityName, callback){
	$.getJSON(baseUrl, callback);
}

function fetchNetwork(id, callback){
	$.getJSON(baseUrl + '/' + id, callback);
}

function displayStations(stations){
	console.log(stations);
	$(".resultsContainer").empty();
	stations.forEach(function(station){
		console.log(station.name + ' ' + station.free_bikes);
		let resultsHTML = `${station.name} has ${station.free_bikes} bikes<br>`;
		$(".resultsContainer").append(resultsHTML);
	});
}

// //render function 
// 	where the html elements are added
// 	element.append('what i wrote')
	// let userInput = $("#");
	// var result = userInput.val()

$(function(){
	$("form").on("submit", function(event){
		event.preventDefault();
		const cityName = $("#city_needed").val();
	 	const numFreeBikes = parseInt($("#bikes_needed").val());	
		console.log('CITY:',cityName, numFreeBikes, 'and type is', typeof numFreeBikes);

		fetchAllNetworks(cityName, function(data){
			const usNetworks = data.networks.filter(network => network.location.country === 'US');
			const cityNetwork = usNetworks.filter(network => network.location.city.toLowerCase() == cityName.toLowerCase());
			console.log(cityNetwork);
			//cityNetwork contains only locations in that city

			const uri = 'http://api.citybik.es';
			let cityNetworkUrl = uri + cityNetwork[0].href;
			console.log(cityNetworkUrl);

			// usNetworks.forEach(val => {
			// 	cityNetworkUrls.push(uri + val.href)
			// });

			// cityNetwork.forEach(val => {
			// 	cityNetworkUrls.push(uri + val.href)
			// });

			// console.log(cityNetwork, cityNetworkUrls);

			let availableBikes;

			function freeBikesFilter(val){
				//console.log(val);
				console.log("test");
				return val.free_bikes >= numFreeBikes;
			};

			$.getJSON(cityNetworkUrl, function(val){
				availableBikes = val.network.stations.forEach(function(station){
					//console.log(station.free_bikes);
					console.log(freeBikesFilter(station));
				})
				
				//THIS didnt touch the correct value for AVAILABLE BIKES
				//availableBikes = val.network.stations.filter(freeBikesFilter);
				console.log("This station has: "  + availableBikes +  " available bikes");
			});

			// const availableBikes = cityNetwork.filter(network => )

			fetchNetwork(cityNetwork[0].id, function(data) {
				displayStations(data.network.stations);
			});
		});

		
	});

});