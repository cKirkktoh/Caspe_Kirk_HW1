    (() => {
        const movieBox = document.querySelector("#movie-box");
        const movieDetailsTemplate = document.querySelector("#movie-details-template");
        const movieDetailsCon = document.querySelector("#movie-details-con");
        const baseUrl = "https://swapi.dev/api";

        // Make AJAX call to get Star Wars characters
        function getCharacters() {
            fetch(`${baseUrl}/people/`)
                .then(response => response.json())
                .then(handleSuccess)
                .catch(handleError);
        }

        // Make AJAX call to get movie details when character link is clicked
        function getMovieDetails(e) {
            const movieUrl = e.currentTarget.dataset.movieUrl;
            const characterName = e.currentTarget.textContent;

            showLoader(); // Show loader while fetching movie details

            fetch(movieUrl)
                .then(response => response.json())
                .then(function(response) {
                    const template = document.importNode(movieDetailsTemplate.content, true);
                    const movieTitle = template.querySelector(".movie-title");
                    const openingCrawl = template.querySelector(".opening-crawl");
                    const moviePoster = template.querySelector(".movie-poster");

                    movieTitle.textContent = response.title;

                    // Format and display the opening crawl
                    openingCrawl.innerHTML = formatOpeningCrawl(response.opening_crawl);

                    const posterUrl = getPosterUrl(response);
                    moviePoster.src = posterUrl;


                    const characterImageUrl = getCharacterImageUrl(characterName);
                    const characterImage = document.createElement("img");
                    characterImage.src = characterImageUrl;
                    characterImage.alt = `${characterName} Poster`;
                    characterImage.classList.add("character-image");


                    movieDetailsCon.innerHTML = "";
                    movieDetailsCon.appendChild(template);
                    movieDetailsCon.appendChild(characterImage);

                    hideLoader(); // Hide loader once movie details are loaded
                })
                .catch(handleError);
        }

        function formatOpeningCrawl(crawlText) {

            const paragraphs = crawlText.split('\r\n').filter(Boolean);


            const formattedCrawl = paragraphs.map(paragraph => `<p>${paragraph}</p>`).join('');

            return formattedCrawl;
        }

        function getPosterUrl(movieDetails) {

            return "images/to/poster.jpg";
        }

        function getCharacterImageUrl(characterName) {
            // Add logic to determine the character image URL based on the character name
            // For demonstration purposes, assuming character images are in the "images" folder
            return `images/${characterName.toLowerCase()}.jpg`;
        }

        function handleSuccess(response) {
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
        }

        function handleError(error) {
            console.error(error);
            // Handle error - display a message to the user
        }

        function showLoader() {
            const loader = document.querySelector(".loader");
            loader.style.display = "block";
        }

        function hideLoader() {
            const loader = document.querySelector(".loader");
            loader.style.display = "none";
        }

        // Call the function to load Star Wars characters
        getCharacters();

    })();