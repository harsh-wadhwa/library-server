const express = require('express');
const app = express();
const PORT = 5000;
const booksData = require('./data.json');

// API endpoint to retrieve books
app.get('/books', (req, res) => {

    const { page, pageSize } = req.query;

    const pageNumber = parseInt(page);
    const limit = parseInt(pageSize);

    const startIndex = (pageNumber - 1) * limit;

    const booksSubset = booksData.books.slice(startIndex, startIndex + limit);

    res.json(booksSubset);

});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});