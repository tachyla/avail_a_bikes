let baseUrl = "http://api.citybik.es/v2/networks";

//let query = {
//}


$.getJSON(baseUrl,function(data){
	gdata = data;
	console.log(data);
})



//state modification functions
	only contain javascript no jquery


//render function 
	where the html elements are added
	element.append('what i wrote')


//event listeners
$(document).ready(function(eventListner){
	//event listener 
	$('.someSelector').on('click', function() {
	})

	//event listner
	$('.someSelector').on('click', function() {
	
	})
})