const express = require('express');
const app = express();
const PORT = 5000;
const booksData = require('./data.json');
const cors = require('cors');

//Enabling CORS for all routes for now
app.use(cors());

// API endpoint to retrieve books
app.get('/books', (req, res) => {

    const { page, pageSize, title, author, minPages, publishYear } = req.query;

    const pageNumber = parseInt(page);
    const limit = parseInt(pageSize);

    const startIndex = (pageNumber - 1) * limit;

    let filteredBooks = booksData.books.slice(startIndex, startIndex + limit);

    if (title) {
        filteredBooks = filteredBooks.filter((book) =>
            book.title.toLowerCase().includes(title.toLowerCase())
        );
    }

    if (author) {
        filteredBooks = filteredBooks.filter((book) =>
            book.author.toLowerCase().includes(author.toLowerCase())
        );
    }

    if (minPages) {
        const minPageCount = parseInt(minPages);
        filteredBooks = filteredBooks.filter((book) =>
            book.pages >= minPageCount
        );
    }

    if (publishYear) {
        filteredBooks = filteredBooks.filter((book) =>
            book.year === parseInt(publishYear)
        );
    }

    res.json(filteredBooks);

});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});