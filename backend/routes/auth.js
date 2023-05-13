const express = require("express");
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

//Create a User using: Post "/api/auth/createuser". No login required

router.post('/createuser', [
    body('name', 'Enter valid name').isLength({min : 3}),
    body('email', 'Enter valid Email').isEmail(),
    body('password', 'Password length should be greater than 7').isLength({min : 7}),
], async (req,res) =>{ 
    // If there are errors, return Bad request and errors 
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    
    //Check whether the User already exisits with a given Email

    try {
    
        let user = await User.findOne({email : req.body.email});
        if(user){
            return res.status(400).json({error: 'User with this email already exists.'})
        }
        user = await User.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,   
        })
        
        res.json(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured.");
        //LOGGER
        //SQS
    }
    



})

    //     User.create({
    //     name: req.body.name,
    //     password: req.body.password,
    //     email: req.body.email,   
    // }).then(user => res.json(user)).catch(err => {console.log(err)
    //     res.json({error:'Error Occured!', message: err.message})}) 

    //Without async^^


// console.log(req.body);
// const user = User(req.body);
// user.save()
// res.send(req.body);

module.exports = router