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
		let resultsHTML = `${station.name} ${station.free_bikes}<br>`;
		$(".resultsContainer").append(resultsHTML);
	});
}

//function display

// //render function 
// 	where the html elements are added
// 	element.append('what i wrote')
	// let userInput = $("#");
	// var result = userInput.val()

$(function(){
	$("form").on("submit", function(event){
		event.preventDefault();
		const cityName = $("#location_label").val();
	 	const numFreeBikes = parseInt($("#bikes_needed").val());	
		console.log('CITY:',cityName, numFreeBikes, 'and type is', typeof numFreeBikes);




		fetchAllNetworks(cityName, function(data){
			const usNetworks = data.networks.filter(network => network.location.country === 'US');
			const cityNetwork = usNetworks.filter(network => network.location.city.toLowerCase() == cityName.toLowerCase());
			console.log(cityNetwork);
			const uri = 'http://api.citybik.es';
			let cityNetworkUrl = uri + cityNetwork[0].href;

			// usNetworks.forEach(val => {
			// 	cityNetworkUrls.push(uri + val.href)
			// });

			// cityNetwork.forEach(val => {
			// 	cityNetworkUrls.push(uri + val.href)
			// });


			// console.log(cityNetwork, cityNetworkUrls);
			console.log(cityNetworkUrl);

			let availableBikes;
			function freeBikesFilter(val){
				return val.free_bikes >= numFreeBikes;
			};

			$.getJSON(cityNetworkUrl, function(val){
				availableBikes = val.network.stations.filter(freeBikesFilter);
				console.log(availableBikes);
			});

			// const availableBikes = cityNetwork.filter(network => )

			// fetchNetwork(cityNetwork.id, function(data) {
			// 	displayStations(data.network.stations);
			// });
		});

		
	});

});