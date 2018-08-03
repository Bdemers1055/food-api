const express = require ('express');
const server = express();
const dotenv = require ('dotenv');
const mongoose = require ('mongoose');

// setup env variables
dotenv.config();

// connect to database
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});

// setup our port
const port = process.env.PORT || 2008;

// powere ups / middleware, 

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


// kick it off

server.listen(port, () => { 
    console.log(`Now listening at port 2008`); 
});