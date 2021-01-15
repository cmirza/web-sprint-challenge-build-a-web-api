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
        Actions.insert(req.body);
        res.status(201).json(req.body);
    } catch(err) {
        next(err);
    }
});

router.put('/:id', validateActionId, async (req, res, next) => {
    try {
        Actions.update(req.params.id, req.body);
        res.status(200).json(req.action);
    } catch(err) {
        next(err);
    }
});

router.delete('/:id', validateActionId, async (req, res, next) => {
    try {
        Actions.remove(req.params.id);
        res.status(200).json({ message: 'Action deleted.'})
    } catch(err) {
        next(err);
    }
});

router.use((err, req, res, next) => {
    res.status(500).json({ message: 'Server side error' });
});

module.exports = router;