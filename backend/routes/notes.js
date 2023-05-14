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

module.exports= router