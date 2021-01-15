// Write your "actions" router here!

const express = require('express');
const Actions = require('./actions-model');
const router = express.Router();

const { validateActionId, validateAction } = require('../middleware/');

router.get('/', async (req,res, next) => {
    try {
        const getActions = await Actions.get();
        res.status(200).json(getActions);
    } catch(err) {
        next(err);
    }
});

router.get('/:id', validateActionId, async (req, res) => {
    res.status(200).json(req.action);
});

router.post('/', validateAction, (req, res, next) => {
    try {
        const newAction = req.body;
        Actions.insert(req.body);
        res.status(201).json(newAction);
    } catch(err) {
        next(err)
    }
})

module.exports = router;