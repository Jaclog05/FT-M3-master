// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];

let id = 0

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

// TODO: your code to handle requests

server.post('/posts', function(req, res){
    
    let { author, title, contents } = req.body;


    if(!author || !title || !contents){
        return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para crear el Post"})
    }

    let post = {
        author, title, contents, id: id++
    }
    
    posts.push(post)
    res.status(200).json(post)
})

server.post('/posts/author/:author', function(req, res){
    let {title, contents} = req.body
    let {author} = req.params

    if(!author || !title || !contents){
        return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para crear el Post"})
    }

    let post = {
        author, title, contents, id: id++
    }
    
    posts.push(post)
    res.status(200).json(post)
})

// server.get('/posts', function(req, res){
    
// })

// server.get('/posts/:author', function(req, res){
   
// })

// server.get('/posts/:author/:title', function(req, res){
   
// })

// server.put('/posts', function(req, res){
    
// })

// server.delete('/posts', function(req, res){
    
// })

// server.delete('/author', function(req, res){
    
// })


module.exports = { posts, server };
