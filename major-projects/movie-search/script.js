const API_KEY = "20526355";

const form = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const status = document.querySelector("#status");
const results = document.querySelector("#movie-results");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const query = searchInput.value.trim();
    if (!query) return;

    status.textContent = "Searching...";
    results.replaceChildren();

    try {
        const response = await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`
        );

        if (!response.ok) {
            throw new Error("Unable to contact the movie service.");
        }

        const data = await response.json();

        if (data.Response === "False") {
            throw new Error(data.Error || "No movies found.");
        }

        status.textContent = `Found ${data.Search.length} results.`;

        data.Search.forEach(movie => {
            const card = document.createElement("article");
            card.className = "movie-card";

            const img = document.createElement("img");
            img.alt = `Poster for ${movie.Title}`;
            img.loading = "lazy";

            if (movie.Poster && movie.Poster !== "N/A") {
                img.src = movie.Poster;
            } else {
                img.alt = "No poster available";
            }

            const info = document.createElement("div");
            info.className = "movie-info";

            const title = document.createElement("h2");
            title.textContent = movie.Title;

            const year = document.createElement("p");
            year.textContent = `Year: ${movie.Year}`;

            const type = document.createElement("p");
            type.textContent = `Type: ${movie.Type}`;

            info.append(title, year, type);
            card.append(img, info);
            results.appendChild(card);
        });
    } catch (error) {
        status.textContent = error.message;
    }
});