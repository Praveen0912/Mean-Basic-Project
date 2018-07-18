var mongoose = require('mongoose');
// Genre Schema
var booksSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre:{
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    author: {
        type: String,
        required:true
    },
    publisher: {
        type: String,
    },
    image_url: {
        type: String
    }
});

var Book = module.exports = mongoose.model('Book',booksSchema);

//database query

//get Books

module.exports.getBooks = function(callback, limit){
    Book.find(callback).limit(limit);
}

module.exports.getBookById = function(id, callback){
    Book.findById(id, callback);
}

module.exports.addBook = function(book, callback){
    Book.create(book, callback);
}

module.exports.updateBook = function(id, book, callback, options){
    var  query = {_id: id};
    var update = {
        name: book.name
    }
    Genre.findOneAndUpdate(query, update,options,callback);
}

module.exports.removeBook = function(id, callback){
    var  query = {_id: id};
    Book.remove(query,callback);
}