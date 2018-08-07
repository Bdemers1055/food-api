const express = require('express');
const router = express.Router(); // tiny lego brick
const Food = require('../models/food');

// routes
//get all foods
router.get('/foods', async (req, res, next) => {
    try {
        const foods = await Food.find();
        res.status(200).json({
            foods: foods
        });
    } 
    catch(err) {
        next(err);
    }
});

// get one special food by id
router.get('/foods/:id', async (req, res, next) => {
    const { id } = req.params; 
    try {
        const foods = await Food.find({ _id: id });
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
        const food = new Food({ name, foodType, foodGroup });
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
        const updatedfood = await Food.findByIdAndUpdate( id, { name, foodType, foodGroup }, { new: true });
        res.status(200).json({
            msg: 'update successful',
            food: updatedFood
        });
    } catch(err) {
        next(err);
    }
});

//delete food by id
router.delete('/foods/:id', async (req, res, next) => {
    const { id } = req.params; 
    try {
        await Food.findByIdAndRemove(id);
        res.status(200).json({
            msg: 'yay deleted!'
        });
    }
    catch(err) {
            next(err);
    }
});


module.exports = router;
