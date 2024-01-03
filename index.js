const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const port = 4000 || 7000;

// import routing file
const authRouter = require('./routes/auth.route');
// express app initialization
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// telling express use these router file
app.use(authRouter);

// mongodb uri
let uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lcblope.mongodb.net/manageUserRecords?retryWrites=true&w=majority`

// connectDB is a function that connect mongodb database
async function connectDB () {
    try{
       await mongoose.connect(uri)
       console.log('database connected')
    }
    catch{
        console.error('Error connecting to MongoDB:', error);
    }
}
connectDB();
  
// get root path and send a message
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// if path not match this middleware will catch the error
app.use((req, res, next) => {
    // when we will give inside next('somthing')
    // express will consider it as an error
    // this error will goes to our custom error handler
  next('requested url is not found');
})

// my custom error handler (middleware)
const errorHandler = ((err, req, res, next) => {
  if(res.headersSent){
    return next(err)
  }
  res.send({ error: err, message: 'error from my custom errorHndler' });
})
app.use(errorHandler);


// listening server on port 5000
app.listen(port)