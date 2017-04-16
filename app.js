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
		if(station.free_bikes >= $('#bikes_needed').val()) {
		console.log(station.name + ' ' + station.free_bikes);
		let welcomeScreenHTML = `<div class="logo_container"> 
		<a href="http://bikewindsoressex.com/wp-content/uploads/2013/05/city-bicycle.jpg"></a></div>`;
		
		let resultsHTML = `${station.name} has ${station.free_bikes} bikes<br>`;
		$(".resultsContainer").append(resultsHTML);
		}
	});
}


$(function(){
//	.on('load') is to render the start screen
	$(".main_container").on('load', function(event) {
		event.preventDefault();
		displayStations(welcomeScreenHTML);
	})

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
				if(val.free_bikes >= numFreeBikes){
					//console.log(val.free_bikes);
					return val.free_bikes;
				}
				//console.log(val);
				console.log("freeBikesTest");
				//return val.free_bikes >= numFreeBikes;
			};

			$.getJSON(cityNetworkUrl, function(val){
				//https://api.citybik.es/v2/networks/relay-atlanta
				availableBikes = val.network.stations.forEach(function(station){
					//console.log(station.free_bikes);
					//console.log(freeBikesFilter(station));
				})
				
				//THIS didnt touch the correct value for AVAILABLE BIKES
				//availableBikes = val.network.stations.filter(freeBikesFilter);
				//console.log("This station has: "  + availableBikes +  " available bikes");
			});

			// const availableBikes = cityNetwork.filter(network => )

			fetchNetwork(cityNetwork[0].id, function(data) {
				displayStations(data.network.stations);
			});
		});

		
	});

});