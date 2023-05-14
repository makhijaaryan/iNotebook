const express = require("express");
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');



const JWT_SECRET = process.env.JWT_SECRET;

// Route 1: Create a User using: Post "/api/auth/createuser". No login required

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
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        //Create new User
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,   
        });
        
        const data ={
            user:{
                id: user.id
            }
        }
        const authToken= jwt.sign(data, JWT_SECRET);

        // res.json(user)

        res.json({authToken});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("SInternal server error.");
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




// Route 2: Authenticate a User using: Post "/api/auth/login". No login required
router.post('/login', [
    body('email', 'Enter valid Email').isEmail(),
    body('password', 'Password cannot be black').exists(),
], async (req,res) =>{ 

    // If there are errors, return Bad request and errors 
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    
    //Check whether the User already exisits with a given Email

    const {email,password} = req.body;

    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error: "Login with correct credentials"});
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(400).json({error: "Login with correct credentials"});
        }

        const data ={
            user:{
                id: user.id
            }
        }
        const authToken= jwt.sign(data, JWT_SECRET);
        res.json({authToken});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error.");
    }

})


// Route 3: Get loggedIn User Details using: Post "/api/auth/getuser". Login required


router.post('/getuser', fetchuser, async (req,res) =>{ 

    try {
        userId=req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error.");
    }

})

module.exports = router