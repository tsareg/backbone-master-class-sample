var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var books = [
    {
        isbn: "978-1449328252",
        title: "Developing Backbone.js Applications",
        author: "Addy Osmani"
    },
    {
        isbn: "978-0-596-10199-2",
        title: "JavaScript: The Definitive Guide, 5th Edition",
        author: "David Flanagan"
    }
];

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    if(req.url.indexOf("/api") === 0 ||
        req.url.indexOf("/bower-components") === 0 ||
        req.url.indexOf("/scripts") === 0) {
        return next();
    }

    res.sendFile(__dirname + '/public/index.html');
});

app.get('/api/books', function(req, res) {
    res.json(books);
});

app.get('/api/books/:isbn', function(req, res) {
    var book = books.filter(function(book) { return book.isbn === req.params.isbn; })[0];

    if(!book) {
        res.statusCode = 404;
        return res.json({ msg: "Book does not exist" });
    }

    res.json(book);
});

app.post('/api/books', function(req, res) {
    if(!req.body.hasOwnProperty('author') ||
        !req.body.hasOwnProperty('title') ||
        !req.body.hasOwnProperty('isbn')) {
        res.statusCode = 400;
        return res.json({ msg: "Invalid params sent" });
    }

    var newBook = {
        author : req.body.author,
        title : req.body.title,
        isbn: req.body.isbn
    };

    books.push(newBook);

    res.json(newBook);
});

app.put('/api/books/:isbn', function(req, res) {
    if(!req.body.hasOwnProperty('author') ||
        !req.body.hasOwnProperty('title')) {
        res.statusCode = 400;
        return res.json({ msg: "Invalid params sent" });
    }

    var book = books.filter(function(book) { return book.isbn === req.params.isbn; })[0];

    if(!book) {
        res.statusCode = 404;
        return res.json({ msg: "Book does not exist" });
    }

    book.author = req.body.author;
    book.title = req.body.title;

    res.json(book);
});

app.delete('/api/books/:isbn', function(req, res) {
    var book = books.filter(function(book) { return book.isbn === req.params.isbn; })[0];

    if(!book) {
        res.statusCode = 404;
        return res.json({ msg: "Book does not exist" });
    }

    books = books.slice(books.indexOf(book), 1);

    res.statusCode = 204;
    res.send({});
});

app.listen(8000);