//Adding an event listener for the submit
$(document).ready(() => {
	$('#searchForm').on('submit', (e) => {
		let searchText = $('#searchText').val();		
		getMovies(searchText);
e.preventDefault()
	});
});



//Getting the movies from the imdb server through the api
function getMovies(searchText){

	//Pulling a request with axios
  axios.get('https://www.omdbapi.com?apikey=cb57c02b&s='+searchText)
    .then((response) => {
      console.log(response);

      let movies = response.data.Search;
      let output = '';
      $.each(movies, (index, movie) => {
      	output += 
      	`<div class="col-md-3">
      	   <div class="well text-center">
      	   <img src="${movie.Poster}">
      	    <h6>${movie.Title}</h6>
      	    <a href="#" onclick = "movieSelected('${movie.imdbID}')" class="btn btn-primary">View Movie Details</a>
      	   </div>
      	</div> 
      	 `
      });


$('#movies').html(output);

  })
    .catch((err) => {
      console.log(err);
    });
}



//Viewing a single movies details
function movieSelected(id) {

	//Using session storage
    sessionStorage.setItem('movieId', id);
	window.location = 'movie.html';
	return false;
	
}


//Getting the movie from the session storage
function getMovie() {
	let movieId = sessionStorage.getItem('movieId');

   
   //Pulling another request with axios
  axios.get('https://www.omdbapi.com?apikey=cb57c02b&i='+movieId)
    .then((response) => {
      console.log(response);

      let movie = response.data;

      let output =  `
         <div class="row">
         <div class="col-md-4">
         <img src="${movie.Poster}" class="thumbnail">
         </div>   
         <div class="col-md-8">
         <h3>${movie.Title}</h3>
         <ul class="list-group">
         <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
         <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
         <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
         <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
         <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
         <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
         <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
         </ul>
         </div>
         </div>
         <br><br>
         <div class="row">
         <div class="well">
         <h4>Plot</h4>
         ${movie.Plot}
         <hr>
         <a href="https://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
         <a href="index.html" class="btn btn-default">Back to Search</a>

         </div>
         
       
         </div>

        `

      $('#movie').html(output);

  })
    .catch((err) => {
      console.log(err);
    });

}
