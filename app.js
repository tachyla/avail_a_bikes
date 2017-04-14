const baseUrl = "http://api.citybik.es/v2/networks";

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
		let resultsHTML = `${station.name} ${station.free_bikes}<br>`;
		$(".resultsContainer").append(resultsHTML);
	});
}

// function calcDistance(lat1, lon1, lat2, lon2){
// 	var R = 6371e3; // metres
// 	var φ1 = lat1.toRadians();
// 	var φ2 = lat2.toRadians();
// 	var Δφ = (lat2-lat1).toRadians();
// 	var Δλ = (lon2-lon1).toRadians();

// 	var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
// 	        Math.cos(φ1) * Math.cos(φ2) *
// 	        Math.sin(Δλ/2) * Math.sin(Δλ/2);
// 	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

// 	return R * c;	
// }

//console.log(calcDistance())
//state modification functions
// 	only contain javascript no jquery


// //render function 
// 	where the html elements are added
// 	element.append('what i wrote')
	// let userInput = $("#");
	// var result = userInput.val()

// //event listeners
$(function(){
	$("form").on("submit", function(event){
		event.preventDefault();
		const cityName = $("#location_label").val();
		console.log(cityName);	

		fetchAllNetworks(cityName, function(data){
			const usNetworks = data.networks.filter(network => network.location.country === 'US');
			const targetNetwork = usNetworks.find(network => network.location.city.toLowerCase() === cityName.toLowerCase())

			fetchNetwork(targetNetwork.id, function(data) {
				displayStations(data.network.stations);
			});
		});

		
	});

});
