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

// models
const Food = mongoose.model('Food', { name:String, type: String });

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
    const { id } = req.params;
    try {
        const foods = await Food.find({ _id: id });
        res.status(200).json({
            foods: foods
        });
    } catch (error) {
        res.status(500).json({
            ms: 'food not found'
        });
        
    }
});

//create one food item
server.post('/foods/', async (req, res) => {
    const { name, type } = req.body;
    try {
        const food = new Food({ name, type });
        await food.save();
        res.status(201).json({
            msg: 'food saved',
            food
        });
    } catch(err){
            res.status(500).json({
            msg: 'food was not created'
        });
    }
});

//update food by id
server.put('/foods/:id', async (req, res) => {
    const { id } = req.params;
    const { name, type } = req.body;
    try {
        const updatedFood = await Food.findByIdAndUpdate( id, { name, type }, { new: true });
        res.status(200).json({
            msg: 'update food item',
            food: updatedFood
        });
    } catch (error) {
        res.status(500).json({
            msg: 'food item was not updated, try again'
        });
    }
});

// delete food by id
server.delete('/foods/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Food.findByIdAndRemove(id);
        res.status(200).json({
            msg: 'yay deleted'
        });
    }
    catch(err) {
            res.status(500).json({
                msg: 'no delete'
            });
        }
});

// kick it off

server.listen(port, () => { 
    console.log(`Now listening at port 2008`); 
});