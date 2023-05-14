const express = require("express");
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

// Route 1: Get all the note using : GET "/api/note/fetchallnote". Login required

router.get('/fetchallnote', fetchuser, async (req,res) =>{
    try {
        const note = await Note.find({user :req.user.id});
        res.json(note)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error.");
    }
    
})


// Route 2: Add a new note using : Post "/api/note/addnote". Login required

router.post('/addnote', fetchuser, [
    body('title', 'Enter valid title.').isLength({min : 3}),
    body('description', 'Description length too short.').isLength({min : 7}),
], async (req,res) =>{

    try {
        const {title, description, tag} = req.body;

        // If there are errors, return Bad request and errors 
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
    
        const note = new Note({
            title, description,tag, user: req.user.id
        })
        const savedNote = await note.save();
    
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error.");
    }
    

})

// Route 3: Update an existing note using : Post "/api/note/updatenote". Login required

router.put('/updatenote/:id', fetchuser, async (req,res) =>{
    const {title, description, tag} = req.body;
    
    //Creating a new node object
    const newNote ={};
    if(title){
        newNote.title = title;
    }
    if(description){
        newNote.description = description;
    }
    if(tag){
        newNote.tag = tag;
    }

    //find the note to be updated 
    let note= await Note.findById(req.params.id);
    if(!note){
        return res.status(404).send("Not Found!");
    }
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed!");
    }

    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
    res.json({note});

})

module.exports= router