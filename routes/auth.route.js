const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require("bcrypt");
const userSchema = require('../Schema/userSchema');
const router = express.Router();
const User = new mongoose.model("User", userSchema);

// singup api
router.post('/signup', async (req, res) => {
    const {email, password, ...rest} = req.body;
    console.log(req.body);
    try {
        const oldUser = await User.findOne({email});
        if(oldUser){
          return res.send({message: 'user already exist'})
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
        const user = await User.findOne({email});
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

router.get('/users', async (req,res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        res.status(501).send({message: 'internal sever errror'})
    }
    
})

router.delete('/users/:id', async(req, res) => {
    const userId = req.params.id;
    const result = await User.deleteOne({_id: userId});
    res.send(result)
})

router.put('/user/:email', async (req, res) => {
    try {
      const email = req.params.email;
      const updatedData = req.body;
      // Find the user with the given email
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      // Update the user with the new data
      const result = await User.updateOne({ email: email }, { $set: updatedData });
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;