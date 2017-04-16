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
		let userInputScreenHTML = `		<header class="header_container">
			<h1>Avail-a-Bikes</h1>
			<h2>Let us get you from A -to- B</h2>
		</header>

		<div class="main_container">
			<form>
				<label class="search">Search</label>
				<input type="text" id="city_needed" placeholder="San Francisco">
				<input type="text" id="bikes_needed" name="numberofppl_label" placeholder="5">
			
	 			<button id="searchbutton">Submit</button>
			</form>
			<section class="resultsContainer">RESULTS CONTAINER BELOW</section>
		</div>`;
		let resultsHTML = `${station.name} has ${station.free_bikes} bikes<br>`;
		$(".resultsContainer").append(resultsHTML);
		}
	});
}


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