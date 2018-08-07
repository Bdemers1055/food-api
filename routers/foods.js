const express = require('express');
const router = express.Router(); // tiny lego brick
const food = require('../models/food');

// routes
//get all foods
router.get('/foods', async (req, res, next) => {
    try {
        const foods = await food.find();
        res.status(200).json({
            foods: foods
        });
    } 
    catch(err) {
        next(err);
    }
});

// get one special et by id
router.get('/foods/:id', async (req, res, next) => {
    const { id } = req.params; 
    try {
        const foods = await food.find({ _id: id });
        res.status(200).json({
            foods: foods
        });
    }
    catch(err) {
        next(err);
    }
});

// create new food
router.post('/foods/', async (req, res, next) => {
    const { name, foodType, foodGroup } = req.body;
    try {
        const food = new food({ name, foodType, foodGroup });
        await food.save();
        res.status(201).json({
            msg: 'saved food',
            food
        });
    } catch(err){
        next(err);
    }
});

//update food by id
router.put('/foods/:id', async (req, res, next) => {
    const { id } = req.params;
    const { name, foodType, foodGroup } = req.body;
    try {
        const updatedfood = await food.findByIdAndUpdate( id, { name, foodType, foodGroup }, { new: true });
        res.status(200).json({
            msg: 'update successful',
            food: updatedfood
        });
    } catch(err) {
        next(err);
    }
});

//delete food by id
router.delete('/foods/:id', async (req, res, next) => {
    const { id } = req.params; 
    try {
        await food.findByIdAndRemove(id);
        res.status(200).json({
            msg: 'yay deleted!'
        });
    }
    catch(err) {
            next(err);
    }
});


module.exports = router;
