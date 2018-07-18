var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var cors = require('cors');
var path = require('path');

Genre = require('./models/genres');
Book = require('./models/books');

//adding middleware  -cors
app.use(cors());

//body - parser
app.use(bodyParser.json());


//static files
app.use(express.static(path.join(__dirname, 'public')));

//connect to mongoose 
mongoose.connect('mongodb://root:123@localhost:27017/bookstore?authSource=admin');
var db = mongoose.connection;



app.post('/api/posts',verifyToken,(req, res)=>{
    jwt.verify(req.token,'secretkey',function(err, authData){
       if(err){
        res.sendStatus(403);

       } else{
          res.json({
          authData
          });
       }
    });
    
});

app.post('/api/login',function(req, res){
    //Mock user
    const user ={
        id: 1,
        username:'Praveen',
        email:'praveenmalav1993@gmail.com'
    }
    jwt.sign({user},'secretkey',function(err, token){
        res.json({
            token
        });
    });
});

//Format of token
//Authorization:bearer<access_token>

//Verify Token
function verifyToken(req, res, next){

    //Get auth header value
    const bearerHeader = req.headers['authorization'];
    //check  if bearer is undefined
    if(typeof bearerHeader !== "Undefined"){
     //split at space
     const bearer = bearerHeader.split(' ');
     //Get token from array
     const bearerToken = bearer[1];
     //set the token
     req.token = bearerToken;
     //next middleware
     next();
    }
    else{
       //Forbidden
       res.sendStatus(403);
    }
}





//routes genre
app.get('/api/genres',function(req,res){
    Genre.getGenres(function(err, genres){
        if(err){
            throw err;
        }
        else{
            res.json(genres);
        }
    });
});


//ADD Genre
app.post('/api/genres', function(req,res){
    var genre = req.body;
    Genre.addGenre(genre,function(err, genre){
        if(err){
            throw err;
        }
        res.json(true);
    });
});


//routes particular Genre
app.get('/api/genres/:_id', function(req,res){
    Genre.getGenreById(req.params._id, function(err, genre){
        if(err){
            throw err;
        }
        else{
            res.json(genre);
        }
    });
});

//UPDATE Genre
app.put('/api/genres/:_id',function(req,res){
    var id = req.params._id;
    var genre = req.body;
    Genre.updateGenre(id,genre,{},function(err,genre){
     if(err){
        throw err;
     }
     res.json(true);
    });
});

//Delete Genre
app.delete('/api/genres/:_id',function(req,res){
   var id = req.params._id;
    Genre.removeGenre(id,function(err,genre){
     if(err){
        throw err;
     }
     res.json(true);
    });
});

//route books
app.get('/api/books',function(req,res){
    Book.getBooks(function(err, books){
        if(err){
            throw err;
        }
        else{
            res.json(books);
        }
    });
});

app.post('/api/books', function(req,res){
    var book = req.body;
    Book.addBook(book,function(err, book){
        if(err){
            throw err;
        }
        res.json(book);
    });
});

app.get('/api/books/:_id',function(req,res){
    Book.getBookById(req.params._id,function(err, book){
        if(err){
            throw err;
        }
        else{
            res.json(book);
        }
    });
});

app.put('/api/books/:_id',function(req,res){
    var id = req.params._id;
    var book = req.body;
    Genre.updateBook(id,book,{},function(err,book){
     if(err){
        throw err;
     }
     res.json(true);
    });
});

//Delete Book
app.delete('/api/books/:_id',function(req,res){
   var id = req.params._id;
    Book.removeBook(id,function(err,book){
     if(err){
        throw err;
     }
     res.json(true);
    });
});


app.listen(3000);
console.log("Running on port 3000");
