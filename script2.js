// script2.js

// GET and POST requests
const axios = require('axios');

// URL for the Google Books API
const apiUrl = 'https://www.googleapis.com/books/v1/volumes';

// Data for the POST request
const postData = {
    "title": "computer",
    "authors": "Jone",
    "publisher": "net",
};


// GET request
axios.get(apiUrl)
    .then(response => {
        const data1 = response.data;
        console.log('GET Data', data1);
    })
    .catch(error => {
        console.log('GET Error', error);
    });


// POST request
axios.post(apiUrl, postData)
    .then(response => {
        const data2 = response.data;
        console.log('POST Data', data2);
    })
    .catch(error => {
        console.log('POST Error', error);
    });

