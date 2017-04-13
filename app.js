let baseUrl = "http://api.citybik.es/v2/networks";

let query = "hello";
let appState = {
				items: []
				};


function getJSON(query){
	gdata = data;
	var settings = {
		href: baseUrl,
		id: "id",
		name: query
		//q: query
		};

	$.getJSON(baseUrl, query, function(data){
		console.log(data);

		var item = gdata.networks[0].id;
		var newBase = baseUrl + "/" + gdata.networks[0].id;
		console.log(data);
		console.log(item);
		console.log(newBase);	
	});
	console.log(query, settings, data);	
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
	
	console.log("query" + query);
	let appState = getJSON(query);

})
// $(document).ready(function(eventListner){
// 	//event listener 
// 	$('.someSelector').on('click', function() {
// 	})

// 	//event listner
// 	$('.someSelector').on('click', function() {
	
// 	})
// })