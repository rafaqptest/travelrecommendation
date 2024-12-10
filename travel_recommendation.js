// Fetch travel recommendations and implement search functionality
document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const clearButton = document.getElementById('clear-button');
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById('results-container');

    // Fetch data from the JSON file
    const fetchData = async () => {
        try {
            const response = await fetch('travel_recommendation_api.json');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            console.log('Fetched data:', data);
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('Failed to fetch recommendations. Please check your network or server setup.');
            return [];
        }
    };

    // Render recommendations based on keyword
    const renderRecommendations = (data, keyword) => {
        resultsContainer.innerHTML = ''; // Clear previous results
        const lowerKeyword = keyword.toLowerCase();
        const matches = data.filter(item =>
            item.category.toLowerCase().includes(lowerKeyword)
        );

        if (matches.length === 0) {
            resultsContainer.innerHTML = '<p>No results found.</p>';
            return;
        }

        matches.forEach(item => {
            const recommendation = document.createElement('div');
            recommendation.className = 'recommendation';

            recommendation.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.name}" class="recommendation-image" />
                <div class="recommendation-details">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                </div>
            `;
            resultsContainer.appendChild(recommendation);
        });
    };

    // Search functionality
    const handleSearch = async () => {
        const keyword = searchInput.value.trim();
        if (!keyword) return;

        const data = await fetchData();
        renderRecommendations(data, keyword);
    };

    // Clear functionality
    const clearResults = () => {
        searchInput.value = '';
        resultsContainer.innerHTML = '';
    };

    // Event listeners
    searchButton.addEventListener('click', handleSearch);
    clearButton.addEventListener('click', clearResults);
});
