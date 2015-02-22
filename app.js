var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var books = [
    {
        id: 1,
        title: "Developing Backbone.js Applications",
        author: "Addy Osmani"
    },
    {
        id: 2,
        title: "JavaScript: The Definitive Guide, 5th Edition",
        author: "David Flanagan"
    }
];

var nextId = 3;

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

app.get('/api/books/:id', function(req, res) {
    var book = books.filter(function(book) { return book.id == req.params.id; })[0];

    if(!book) {
        res.statusCode = 404;
        return res.json({ msg: "Book does not exist" });
    }

    res.json(book);
});

app.post('/api/books', function(req, res) {
    if(!req.body.author || !req.body.title) {
        res.statusCode = 400;
        return res.json({ msg: "Invalid params sent" });
    }

    var newBook = {
        author : req.body.author,
        title : req.body.title,
        id: nextId++
    };

    books.push(newBook);

    res.json(newBook);
});

app.put('/api/books/:id', function(req, res) {
    if(!req.body.author || !req.body.title) {
        res.statusCode = 400;
        return res.json({ msg: "Invalid params sent" });
    }

    var book = books.filter(function(book) { return book.id == req.params.id; })[0];

    if(!book) {
        res.statusCode = 404;
        return res.json({ msg: "Book does not exist" });
    }

    book.author = req.body.author;
    book.title = req.body.title;

    res.json(book);
});

app.delete('/api/books/:id', function(req, res) {
    var book = books.filter(function(book) { return book.id == req.params.id; })[0];

    if(!book) {
        res.statusCode = 404;
        return res.json({ msg: "Book does not exist" });
    }

    books.splice(books.indexOf(book), 1);

    res.statusCode = 204;
    res.send({});
});

app.listen(8000);