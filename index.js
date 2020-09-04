// import express from 'express';   // ES6 MODULES
const express = require('express');  // CommonJS module, equivalent to above
const shortid = require('shortid');

// Creating a server calling express and will give back a server instance
const server = express();

// adding middleware  -- don't forget to invoke it as a function
// teaches express how to read JSON from the body
server.use(express.json());  

let hubs = [
    {
        id: shortid.generate(),
        name: 'web 17 node intro',
        lessonId: 1,
        cohort: 'web 17'
    },
    {
        id: shortid.generate(),
        name: 'web 17 java intro',
        lessonId: 101,
        cohort: 'web 17'
    }

]

// defining post api hubs
let nextHubId = 3;

// defining post api lessons
let nextLessonId = 3;



// defining get api lessons
let lessons = [
    {
        id: shortid.generate(),
        name: 'Intro to Node.js & Express'
    },
    {
        id: 101,
        name: 'Intro to Java'
    },
]

// handle a get request
server.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')
});

// create a get endpoint request to send response with array
// api will send back JSON so we know we are sending JSON, you can use res.json

// creating get api for hubs
server.get('/api/hubs', (req, res) => {
    res.status(200).json(hubs);
})

// creating get api for lessons
server.get('/api/lessons', (req, res) => {
    res.status(200).json(lessons);
})

// creating post api for hubs
server.post('/api/hubs', (req, res) => {
    const newHub = req.body;  // needs express.json() middleware  

    newHub.id = shortid.generate();

    hubs.push(newHub)  // adding newHub to the array of hubs

    res.status(201).json(newHub);  // sending response object back to the requester/caller  
                      // in this example we are sending back the "newHub" object as JSON
});


// creating post api for lessons
server.post('/api/lessons', (req, res) => {
    const newLesson = req.body;  /// needs express.json() middleware

    newLesson.id = shortid.generate();

    lessons.push(newLesson)

    res.status(201).json(newLesson);
});

// creating delete api for hubs
server.delete('/api/hubs/:id', (req, res) => {
    const id = req.params.id;
    const deleted = hubs.find(h => h.id === id);

    hubs = hubs.filter(h => h.id !== id);

    res.status(200).json(deleted);
})

// creating a put (edit) api request for hubs


server.put('/api/hubs/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;

   
    let found = hubs.find(h => h.id === id);

    // we can go into the array through the index and update it once we have the index
    // if that index is different than -1 -- if the index is -1 than I found it
    // if it is not -1 that mean I could not find that
    
    if(found) {
        // found a hub
        // need to change the hub that we found
       Object.assign(found, changes);
       res.status(200).json(found);

    } else {
        // did not find a hub
        res.status(404).json({message: "Hub not found" });

    }


    res.json(found);
})

// Defining PORT
const PORT = 8000;  // we visit localhost (http://localhost:8000/) to see the api

// To run the server we want to listening to server
server.listen(PORT, ()  => console.log(`server running on port ${PORT}`))


// console.log('server running....');