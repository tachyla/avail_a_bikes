function usFilter(station){
    return station.location.city === "San Francisco Bay Area, CA";

let baseUrl = "http://api.citybik.es/v2/networks";

var usLocations = [];

$.getJSON(baseUrl, function(data){
    console.log(data.networks.filter(usFilter));
    usLocations = data.networks.filter(usFilter);
});

usLocations.forEach(function(val){
    console.log( "http://api.citybik.es" + val.href)
});

let query = "";
let appState = {
				items: []
				};


function getJSON(query){
	gdata = data;
	
	var query = {
		href: baseUrl + "/" + id,
		id: id
		//location:  
		};

	$.getJSON(baseUrl, query, function(data){
		console.log(data);

		var item = gdata.networks[0].id;
		var newBase = baseUrl + "/" + gdata.networks[0].id;
		console.log(data);
		console.log(item);
		console.log(newBase);
	});
};

//state modification functions
// 	only contain javascript no jquery


// //render function 
// 	where the html elements are added
// 	element.append('what i wrote')
	// let userInput = $("#");
	// var result = userInput.val();

// //event listeners
	$("#searchbutton").on("click", function(event){
		event.preventDefault();
		query = $("#location_label").val();
	
	console.log("query=" + query);
	let appState = getJSON(query);
});