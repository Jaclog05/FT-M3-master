// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];

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

server.get('/posts', function(req, res){
    let { term } = req.query

    if(term){
        let matched_post = posts.filter(p => p.title.includes(term) || p.contents.includes(term))
        res.status(200).json(matched_post)
    }else{
        res.status(200).send(posts)
    }

})

server.get('/posts/:author', function(req, res){
   let {author} = req.params

   if(author){
        let author_picked = posts.filter(p => p.author === author)
        author_picked.length > 0 ? res.status(200).json(author_picked) : res.status(STATUS_USER_ERROR).json({error: "No existe ningun post del autor indicado"})
   }
})

server.get('/posts/:author/:title', function(req, res){
   let {author, title} = req.params

   if(author && title){
        let matched_post = posts.filter(p => p.author === author && p.title === title)
        matched_post.length > 0 ? res.status(200).json(matched_post) : res.status(STATUS_USER_ERROR).json({error: "No existe ningun post con dicho titulo y autor indicado"})
   }
})

server.put('/posts', function(req, res){
    let {id, title, contents} = req.body
    if(!id || !title || !contents){ 
        return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para modificar el Post"})   
    }

    let new_post = posts.find(p => p.id === id)

    if(!new_post){
        res.status(STATUS_USER_ERROR).json({error: "Id invalido"})
    }else{
        new_post.title = title
        new_post.contents = contents
        res.status(200).json(new_post)
    }
    
})

server.delete('/posts', function(req, res){
    let {id} = req.body

    let delete_post = posts.find(p => p.id == id)
    if(!id || !delete_post){
        return res.status(STATUS_USER_ERROR).json({error: "Mensaje de error"})
    }

    posts = posts.filter(p => p.id !== id)
    res.json({ success: true })
})

server.delete('/author', function(req, res){
    let {author} = req.body

    let author_found = posts.find(p => p.author === author)
    if(!author || !author_found){
       return res.status(STATUS_USER_ERROR).json({error: "No existe el autor indicado"})
    }

    let delete_authors = []

    delete_authors = posts.filter(p => p.author === author)
    posts = posts.filter(p => p.author !== author)
    return res.status(200).json(delete_authors)
})


module.exports = { posts, server };
