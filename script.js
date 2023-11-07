// script.js

// Define my Google Books API key
const apiKey = 'AIzaSyA2UMP1RxoUW9leh7L5cceRfWITSdhrCxI';

// Define a search query
let bookData = {};

// Define an asynchronous function to fetch data from the Google Books API
const fetchBookData = async (searchQuery) => {
    try {
        // Construct the API URL by combining the search query and API key
        const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&key=${apiKey}`;

        // Send a network request to the API endpoint and await the response
        const response = await fetch(apiUrl);

        // Log the response body
        console.log('Response body', response.body);

        // Parse the response as JSON to get the actual data
        const data = await response.json();

        // Log the retrieved data
        console.log('data', data);

        // Return the data to the caller
        return data;
    } catch (error) {
        // Handle any errors that may occur during the fetch operation e.g., show an error message to the user.
        console.error('Fetch error ', error);
        throw error;
    }
}


// Function to display book search results
// Function to update the content of existing elements with new data
function updateBookResults(data, searchQuery) {
    const mainContainer = document.getElementsByClassName('main-container')[0];

    if (!data) {
        mainContainer.innerHTML = 'Error fetching book data.';
        return;
    }

    // Check if there are existing result elements
    const existingBookDiv = document.getElementsByClassName('results')[0];

    if (existingBookDiv) {
        // Update the existing results if they exist
        // Update the content of existing elements with new data
        existingBookDiv.childNodes[0].textContent = searchQuery ? searchQuery : '';
        existingBookDiv.childNodes[1].textContent = data.items[0].volumeInfo.title;
        existingBookDiv.childNodes[2].textContent = data.items[0].volumeInfo.authors ? data.items[0].volumeInfo.authors.join(', ') : 'Unknown';
        existingBookDiv.childNodes[3].textContent = data.items[0].volumeInfo.publisher || 'Unknown';
    } else {
        // Create a new div and insert it as a child of the main Container if results don't exist
        // If there are no existing elements, create and append new ones
        const bookDiv = document.createElement('div');
        const h1Elem = document.createElement('h1');
        const p1Elem = document.createElement('p');
        const p2Elem = document.createElement('p');
        const p3Elem = document.createElement('p');

        // Set the content of the elements
        h1Elem.textContent = searchQuery ? searchQuery : '';
        p1Elem.textContent = data.items[0].volumeInfo.title;
        p2Elem.textContent = data.items[0].volumeInfo.authors ? data.items[0].volumeInfo.authors.join(', ') : 'Unknown';
        p3Elem.textContent = data.items[0].volumeInfo.publisher || 'Unknown';

        // Append elements to the new div
        bookDiv.appendChild(h1Elem);
        bookDiv.appendChild(p1Elem);
        bookDiv.appendChild(p2Elem);
        bookDiv.appendChild(p3Elem);
        bookDiv.className = 'results';
        mainContainer.appendChild(bookDiv);
    }
}

// Find the search button and add a click event listener
// Example usage when the user triggers a new search
const searchButton = document.getElementById('search-button');

searchButton.addEventListener('click', async (e) => {
    e.preventDefault();
    const searchInput = document.getElementById('search-input');
    const searchQuery = searchInput.value;
    searchInput.value = '';

    try {
        // Fetch book data and display results
        const bookData = await fetchBookData(searchQuery);
        updateBookResults(bookData, searchQuery);
    } catch (error) {
        // Handle errors and show an alert
        console.error('Error fetching book data: ', error);
        alert('An error occurred while fetching data. Please try again.');
    }
});