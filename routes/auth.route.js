const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require("bcrypt");
const userSchema = require('../Schema/userSchema');
const router = express.Router();
const User = new mongoose.model("User", userSchema);

// singup api
router.post('/signup', async (req, res) => {
    const {email, password, ...rest} = req.body;
    try {
        const oldUser = await User.findOne({email});
        if(oldUser){
          return res.send({error: 'user already exist'})
        }else{
            const hashPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
               email, password: hashPassword, ...rest
            })
            const data = await newUser.save();
            res.send(data)
        }
        
    } catch (error) {
        res.status(401).send({message: 'authentication failed'})
    }
})

// login rest api
router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email}).select({_id:0});
        if(user){
            const validPassword = await bcrypt.compare(password, user.password);
            if(validPassword){
              res.send(user);
            }else{
              return res.send({message: 'password did not match'})
            }
        }else{
            return res.send({message: 'user not found'})
        }
    } catch (error) {

        res.status(401).send({message: 'authentication failed line 77'})
    }
})

module.exports = router;