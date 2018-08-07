const express = require ('express');
const server = express();
const dotenv = require ('dotenv');
const mongoose = require ('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require ('helmet');

// setup env variables
dotenv.config();

// connect to database
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});

// setup our port
const port = process.env.PORT || 2008;

// powere ups / middleware, 
server.use(helmet());
server.use(morgan("combined")); // status logging
server.use(bodyParser.json()); // accept json data
server.use(bodyParser.urlencoded({ extended: true })); // accept html format data

//routes
const foodRouter = require('./routers/foods');

//routes
server.use(foodRouter);

// kick it off

server.listen(port, () => { 
    console.log(`Now listening at port 2008`); 
});