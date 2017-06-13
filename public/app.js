//put inside object literal
const appState = { baseUrl: 'https://api.citybik.es/v2/networks' };


/*
  Fetches networks from CityBike API based on cityName
  @param {String}   cityName
  @param {Function} callback - passes data response as first param
*/
function fetchAllNetworks(cityName, data) {
  $.getJSON(appState.baseUrl, function (data) {
    const usNetworks = data.networks.filter(network => network.location.country === 'US');
    const cityNetwork = usNetworks.filter(network => network.location.city.toLowerCase() == cityName.toLowerCase());

    console.log('cityNetwork', cityNetwork);
    //cityNetwork contains only locations in that city
    if (cityNetwork.length > 0) {
      const uri = 'https://api.citybik.es';
      let cityNetworkUrl = uri + cityNetwork[0].href;
      console.log(cityNetworkUrl);

      fetchNetwork(cityNetwork[0].id, function (data) {
        displayStations(data.network.stations);
      });
    }
    else {
      $('.resultsContainer').empty();
      $('.resultsContainer').append('<span>no results found</span>');
    }
  });
}

function fetchNetwork(id, callback) {
  $.getJSON(appState.baseUrl + '/' + id, callback);
}

function showStartScreen() {
  let startScreenHTML = `
			<header class="header_container">
					<h1>Avail-a-Bikes</h1>
					<h2>Let us get you from A -to- B</h2>
			</header>
			<div class="logo_container">
				<img class="logo" src="/avail-a-bikes.jpg" />
			</div>
			<button type="submit" class="start_button">Find Bikes</button>`;
  $('.outer_container').append(startScreenHTML);
}

function showInputScreen() {
  $('.outer_container').empty();
  let userInputScreenHTML = `
					<header class="header_container">
						<h1>Avail-a-Bikes</h1>
					</header>
					<div class="main_container">
						<form>
							<label class="search">Search City, State</label>
							<input type="text" id="city_needed" placeholder="Atlanta, GA" required><br>
							<label class="numBikes"># Bikes Needed</label>
							<input type="number" id="bikes_needed" placeholder="5" required><br>
						
				 			<button id="searchbutton">Submit</button>
						</form>
						<section class="resultsContainer"></section>
					</div>`;
  $('.user_input').append(userInputScreenHTML);
}

function displayStations(stations) {
  console.log(stations);
  $('.resultsContainer').empty();
  let resultsHTML = '';
  let bikesNeeded = $('#bikes_needed').val();

  stations.forEach(function (station) {
    if (station.free_bikes >= bikesNeeded) {
      console.log(station.name + ' ' + station.free_bikes);
      resultsHTML += `
                        <ul>
                            <li>${station.name.substring(0, 25)} has ${station.free_bikes} bikes<br>
                            \t ${station.extra.address}</li>
                        </ul>`;
    }
  });
  $('.resultsContainer').append(resultsHTML);
}

// first thing that needs to be called
showStartScreen();

$(function () {


  $('.outer_container').on('click', '.start_button', function (event) {
    event.preventDefault();
    showInputScreen();
  });

  // attach to something always on the page, form wasn't already there to fire event listener
  $('.user_input').on('click', '#searchbutton', function (event) {
    event.preventDefault();
    // // displayStations(stations);
    const cityName = $('#city_needed').val();
    const numFreeBikes = parseInt($('#bikes_needed').val());
    console.log('CITY:', cityName, numFreeBikes, 'and type is', typeof numFreeBikes);
    // debugger;
    // put JSON request in directly

    fetchAllNetworks(cityName, appState);
  });
});


// function we declared on line 95 should be assigned to actual function instead of anonymous and then put JSON request directly in event listener







