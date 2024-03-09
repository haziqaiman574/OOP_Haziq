function goBack() {
    // Go back to the previous page in the browser history
    history.back();
}

// Function to extract query parameters from URL
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Fetch movie details using IMDb ID from query parameter
var imdbID = getParameterByName('imdbID');
fetch(`https://www.omdbapi.com/?apikey=c1aecf62&i=${imdbID}`)
    .then((response) => response.json())
    .then((data) => {
        // Construct HTML to display movie details
        var movieDetailsHTML = `
            <h2>${data.Title}</h2>
            <img src="${data.Poster}" alt="${data.Title} Poster">
            <p><strong>Year:</strong> ${data.Year}</p>
            <p><strong>Rated:</strong> ${data.Rated}</p>
            <p><strong>Released:</strong> ${data.Released}</p>
            <p><strong>Runtime:</strong> ${data.Runtime}</p>
            <p><strong>Genre:</strong> ${data.Genre}</p>
            <p><strong>Director:</strong> ${data.Director}</p>
            <p><strong>Writer:</strong> ${data.Writer}</p>
            <p><strong>Actors:</strong> ${data.Actors}</p>
            <p><strong>Plot:</strong> ${data.Plot}</p>
            <p><strong>Language:</strong> ${data.Language}</p>
            <p><strong>Country:</strong> ${data.Country}</p>
            <p><strong>Awards:</strong> ${data.Awards}</p>
        `;
        // Append ratings if available
        if (data.Ratings && data.Ratings.length > 0) {
            movieDetailsHTML += '<p><strong>Ratings:</strong><ul>';
            data.Ratings.forEach(rating => {
                movieDetailsHTML += `<li>${rating.Source}: ${rating.Value}</li>`;
            });
            movieDetailsHTML += '</ul></p>';
        }
        // Display movie details
        document.getElementById('movieDetails').innerHTML = movieDetailsHTML;
    })
    .catch((error) => {
        console.error('Error fetching movie details:', error);
    });

    function goToCommentPage() {
        // Navigate to the commentPage.html
        window.location.href = 'commentPage.html';
    }
    