let baseUrl = "http://api.citybik.es/v2/networks";

let query = '';


function getJSON(query){
	gdata = data;
	var settings = {
		href: baseUrl,
		id: "id",
		//name: "name",
		q: query
		};

	$.getJSON(baseUrl, query, function(data){
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
// $(document).ready(function(eventListner){
// 	//event listener 
// 	$('.someSelector').on('click', function() {
// 	})

// 	//event listner
// 	$('.someSelector').on('click', function() {
	
// 	})
// })