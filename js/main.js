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

                // Add logic to get the movie poster URL from another source or use a placeholder
                const posterUrl = getPosterUrl(response);
                moviePoster.src = posterUrl;

                // Add logic to get the character image URL based on the character name
                const characterImageUrl = getCharacterImageUrl(characterName);
                const characterImage = document.createElement("img");
                characterImage.src = characterImageUrl;
                characterImage.alt = `${characterName} Poster`;
                characterImage.classList.add("character-image");

                // Append character image to the movie details container
                movieDetailsCon.innerHTML = "";
                movieDetailsCon.appendChild(template);
                movieDetailsCon.appendChild(characterImage);

                hideLoader(); // Hide loader once movie details are loaded
            })
            .catch(handleError);
    }

    function formatOpeningCrawl(crawlText) {
        // Split the opening crawl text into paragraphs for better readability
        const paragraphs = crawlText.split('\r\n').filter(Boolean);

        // Wrap each paragraph in <p> tags
        const formattedCrawl = paragraphs.map(paragraph => `<p>${paragraph}</p>`).join('');

        return formattedCrawl;
    }

    function getPosterUrl(movieDetails) {
        // Add logic to determine the movie poster URL
        // You may need to fetch it from another API or use a placeholder
        return "path/to/poster.jpg";
    }

    function getCharacterImageUrl(characterName) {
        // Replace this with the actual path to your character images
        const formattedCharacterName = characterName.replace(/\s+/g, '-').toLowerCase();
        const imageUrl = `images/${formattedCharacterName}.jpeg`;
        console.log('Generated Image URL:', imageUrl);
        return imageUrl;
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