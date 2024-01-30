(() => {
    const movieBox = document.querySelector("#movie-box");
    const movieDetailsTemplate = document.querySelector("#movie-details-template");
    const movieDetailsCon = document.querySelector("#movie-details-con");
    const baseUrl = "https://swapi.dev/api";

    // Make AJAX call to get Star Wars characters
    function getCharacters() {
        fetch(`${baseUrl}/people/`)
            .then(response => response.json())
            .then(function(response) {
                const characters = response.results;
                const ul = document.createElement("ul");

                characters.forEach(character => {
                    const li = document.createElement("li");
                    const a = document.createElement("a");
                    a.textContent = character.name;
                    a.dataset.movieUrl = character.films[0]; // Assuming the first film in the list
                    li.appendChild(a);
                    ul.appendChild(li);
                });

                movieBox.appendChild(ul);

                const links = document.querySelectorAll("#movie-box li a");
                links.forEach(link => {
                    link.addEventListener("click", getMovieDetails);
                });
            })
            .catch(err => {
                console.log(err);
                // Handle error - display a message to the user
            });
    }

    // Make AJAX call to get movie details when character link is clicked
    function getMovieDetails(e) {
        const movieUrl = e.currentTarget.dataset.movieUrl;

        fetch(movieUrl)
            .then(response => response.json())
            .then(function(response) {
                const template = document.importNode(movieDetailsTemplate.content, true);
                const movieTitle = template.querySelector(".movie-title");
                const openingCrawl = template.querySelector(".opening-crawl");
                const moviePoster = template.querySelector(".movie-poster");

                movieTitle.textContent = response.title;
                openingCrawl.textContent = response.opening_crawl;

                // Add logic to get the movie poster URL from another source or use a placeholder

                movieDetailsCon.innerHTML = "";
                movieDetailsCon.appendChild(template);
            })
            .catch(error => {
                console.log(error);
                // Handle error - display a message to the user
            });
    }

    // Call the function to load Star Wars characters
    getCharacters();

})();