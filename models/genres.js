var mongoose = require('mongoose');

// Genre Schema
var genreSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

var Genre = module.exports = mongoose.model('Genre',genreSchema);

//database query

//get Genres

module.exports.getGenres = function(callback, limit){
    Genre.find(callback).limit(limit);
}

module.exports.getGenreById = function(id, callback){
    Genre.findById(id, callback);
}

module.exports.addGenre = function(genre, callback){
    Genre.create(genre, callback);
}

module.exports.updateGenre = function(id, genre, callback, options){
    var  query = {_id: id};
    var update = {
        name: genre.name
    }
    Genre.findOneAndUpdate(query, update,options,callback);
}

module.exports.removeGenre = function(id, callback){
    var  query = {_id: id};
    Genre.remove(query,callback);
}