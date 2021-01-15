// Write your "projects" router here!

const express = require('express');
const Projects = require('../projects/projects-model');
const router = express.Router();

const { validateProjectId, validateProject } = require('../middleware');


router.get('/', async (req, res, next) => {
    try {
        const data = await Projects.get();
        res.status(200).json(data);
    } catch(err) {
        next(err);
    }
});

router.get('/:id', validateProjectId, async (req, res) => {
    res.status(200).json(req.project);
});

router.get('/:id/actions', validateProjectId, async (req, res, next) => {
    try {
        const data = await Projects.getProjectActions(req.params.id);
        res.status(200).json(data);
    } catch(err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    if (!req.body.name || !req.body.description) {
        res.status(400).json({ message: 'Missing required data.' });
    } else {
        try {
            const data = await Projects.insert(req.body);
            res.status(201).json(data);
        } catch(err) {
            next(err);
        }
    }
});

router.put('/:id', validateProjectId, async (req, res, next) => {
    try {
        const data = await Projects.update(req.params.id, req.body);
        res.status(200).json(data);
    } catch(err) {
        next(err);
    }
});

router.delete('/:id', validateProjectId, async (req, res, next) => {
    try {
        await Projects.remove(req.params.id);
        res.status(200).json({ message: 'Project deleted.'});
    } catch (err) {
        next(err);
    }
});

router.use((err, req, res, next) => {
    res.status(500).json({ message: 'Server side error' });
});

module.exports = router;