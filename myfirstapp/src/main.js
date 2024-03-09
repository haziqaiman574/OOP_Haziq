function buttonClicked() {
    var searchData = document.getElementById("meal_input").value;

    fetch(`https://www.omdbapi.com/?apikey=c1aecf62&s=${searchData}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            // Clear previous results
            document.getElementById('demo').innerHTML = "";

            // Loop through search results
            data.Search.forEach((result) => {
                // Create a container for each search result
                var resultContainer = document.createElement('div');
                resultContainer.classList.add('search-result'); // Add 'search-result' class to the container

                // Display title
                var titleNode = document.createElement('p');
                titleNode.textContent = result.Title;
                resultContainer.appendChild(titleNode);

                // Display image
                var img = document.createElement('img');
                img.src = result.Poster;
                img.style.display = 'block';
                resultContainer.appendChild(img);

                // Create button
                var buttonNode = document.createElement('buttonjs');
                buttonNode.textContent = 'View Details';
                buttonNode.style.backgroundColor = '#4CAF50';
                buttonNode.style.color = 'white';
                buttonNode.style.borderRadius = '5px';
                buttonNode.style.cursor = 'pointer';
                // Attach event listener to the button
                buttonNode.addEventListener('click', function() {
                    // Redirect to another page passing imdbID as a query parameter
                    window.location.href = 'anotherPage.html?imdbID=' + result.imdbID;
                });
                resultContainer.appendChild(buttonNode);

                // Append the result container to the 'demo' element
                document.getElementById('demo').appendChild(resultContainer);
            });
        })
        .catch((error) => {
            console.error('Error fetching search results:', error);
        });
}
let slideIndex = 0;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let slides = document.querySelectorAll('.slides img');
    
    if (n >= slides.length) {
        slideIndex = 0;
    } else if (n < 0) {
        slideIndex = slides.length - 1;
    } else {
        slideIndex = n;
    }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    
    slides[slideIndex].style.display = 'block';
}
