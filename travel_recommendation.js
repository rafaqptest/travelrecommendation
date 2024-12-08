// Select DOM elements
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");
const clearButton = document.querySelector("#clear-button");
const resultsContainer = document.querySelector("#results-container");

// Fetch data from the travel_recommendation_api.json
async function fetchTravelData() {
    try {
        const response = await fetch("travel_recommendation_api.json");
        if (!response.ok) {
            throw new Error("Failed to fetch the travel data.");
        }
        const data = await response.json();
        console.log("Travel Data:", data); // For debugging
        return data;
    } catch (error) {
        console.error("Error fetching travel data:", error);
    }
}

// Filter recommendations based on the keyword
function filterRecommendations(data, keyword) {
    const lowerKeyword = keyword.toLowerCase();
    return data.filter(item => {
        return (
            item.type.toLowerCase().includes(lowerKeyword) ||
            item.name.toLowerCase().includes(lowerKeyword) ||
            item.description.toLowerCase().includes(lowerKeyword)
        );
    });
}

// Render the recommendations to the DOM
function renderRecommendations(recommendations) {
    resultsContainer.innerHTML = ""; // Clear previous results
    if (recommendations.length === 0) {
        resultsContainer.innerHTML = "<p>No results found.</p>";
        return;
    }
    recommendations.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("recommendation-card");
        card.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}" class="recommendation-image" />
            <div class="recommendation-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
            </div>
        `;
        resultsContainer.appendChild(card);
    });
}

// Handle the Search button click
async function handleSearch() {
    const keyword = searchInput.value.trim();
    if (!keyword) {
        alert("Please enter a keyword to search.");
        return;
    }

    const data = await fetchTravelData();
    if (data) {
        const recommendations = filterRecommendations(data, keyword);
        renderRecommendations(recommendations);
    }
}

// Handle the Clear button click
function handleClear() {
    searchInput.value = ""; // Clear the search input
    resultsContainer.innerHTML = ""; // Clear the results container
}

// Event listeners
searchButton.addEventListener("click", handleSearch);
clearButton.addEventListener("click", handleClear);
