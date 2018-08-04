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
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true })); // accept html format data

// models
const Food = mongoose.model('Food', { name:String });

//routes
//get all foods
server.get('/foods', async (req, res) => {
    try { 
        const foods = await Food.find();
        res.status(200).json({
            foods: foods
        });
    }
    catch(err) {
        res.status(500).json({
            msg: 'broken'
        });
    }
});
//get one special food
server.get('/foods/:id', async (req, res) => {
        res.send(`getting ${req.params.id} food`);
});

//create one special food
server.post('/foods/:food', async (req, res) => {
    res.send('new food');
});

//update food by id
server.put('/foods/:id', (req, res) => {
    res.send(`updating ${req.params.id} food`);
});

// delete food by id
server.delete('/foods/:id', (req, res) => {
    res.send(`deleting ${req.params.id} food`);
});

// kick it off

server.listen(port, () => { 
    console.log(`Now listening at port 2008`); 
});