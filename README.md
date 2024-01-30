# Star Wars Character/Movie Guide

## Overview
This project utilizes the Star Wars API (SWAPI) to create a responsive character/movie guide. The guide displays information about Star Wars characters and their associated movies. Users can click on a character's name to fetch details about the movie they appeared in, including the movie title, opening crawl, and movie poster.

Technologies Used
- HTML5
- CSS3 (including media queries for responsiveness)
- JavaScript (ES6+)
- AJAX for API calls
- GreenSock Animation Platform (GSAP) for enhanced features
- HTML Template Element for rendering dynamic content

## Features
1. Character List:
- An unordered list displays 10 or more Star Wars characters.
- Each character's name is a clickable link.

2. Movie Details:
- Clicking on a character link triggers a separate AJAX call to fetch movie details.
- Movie details include the title, opening crawl, and a movie poster.

3. Responsive Design:
- The guide is designed to be responsive, adapting to various screen sizes from mobile to desktop.

4. GreenSock Enhancements:
- Implemented GreenSock Animation Platform for enhanced visual effects and smooth transitions.

5. HTML Template Element:
- Utilized HTML Template Element to dynamically render content based on API responses.

6. AJAX Request Handling:
- Implemented separate functions/handlers for different stages of an AJAX request.
- Gracefully handles scenarios where the request fails.

7. Loading Icon:
- A loading icon is displayed to indicate that content is being fetched.

## Credits
Star Wars API: SWAPI

## License
This project is licensed under the MIT License - see the LICENSE file for details.