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

function showStartScreen() {
	let startScreenHTML = `
			<header class="header_container">
					<h1>Avail-a-Bikes</h1>
					<h2>Let us get you from A -to- B</h2>
			</header>
			<div class="logo_container">
				<img class="logo" src="avail-a-bikes.jpg" />
			</div>
			<button type="submit" class="start_button">Find Bikes</button>`;
	$(".outer_container").append(startScreenHTML);
}

function displayStations(stations, choice){
	console.log(stations);
	$(".resultsContainer").empty();

	let userInputScreenHTML = `
					<header class="header_container">
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

	stations.forEach(function(station){
		if(station.free_bikes >= $('#bikes_needed').val()) {
			console.log(station.name + ' ' + station.free_bikes);
		 	$(".resultsContainer").append(resultsHTML);
		}
		let resultsHTML = `${station.name} has ${station.free_bikes} bikes<br>`;
	});
}

showStartScreen();

$(function(){
	// displayStations(station, "startScreen");
	// $(".outer_container").on("click", ".start_button", function(event) {
	// 	displayStations(station, "startScreen");
	// })

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

			let availableBikes;

			function freeBikesFilter(val){
				if(val.free_bikes >= numFreeBikes){
					return val.free_bikes;
				}
				console.log("freeBikesTest");
			};

			$.getJSON(cityNetworkUrl, function(val){
				availableBikes = val.network.stations.forEach(function(station){
					//console.log(station.free_bikes);
					//console.log(freeBikesFilter(station));
				})
			});

			fetchNetwork(cityNetwork[0].id, function(data) {
				displayStations(data.network.stations);
			});
		});	
	});
});