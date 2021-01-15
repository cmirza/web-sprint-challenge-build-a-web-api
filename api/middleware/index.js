const Actions = require('../actions/actions-model');
const Projects = require('../projects/projects-model');

const validateActionId = async (req, res, next) => {
    const action = await Actions.get(req.params.id);
    try {
        if(!action) {
            res.status(404).json({ message: `Action with that ID not found.` });
        } else {
            req.action = action;
            next();
        }
    } catch(err) {
        res.status(500).json({ errorMessage: 'Error finding that ID.'});
    }
};

const validateAction = (req, res, next) => {
    try {
        if (!req.body.project_id || !req.body.description || !req.body.notes) {
            res.status(400).json({ message: 'ID, description and notes required.' });
        } else {
            next();
        }
    } catch (err) {
        res.status(500).json({ errorMessage: 'Error posting action' });
    }
};

const validateProject = async (req, res, next) => {
    if (!req.body) {
        res.status(400).json({ message: 'Missing required data.' });
    } else if (!req.body.name || !req.body.description) {
        res.status(400).json({ message: 'Name and description required.'});
    } else {
        next();
    }
};

const validateProjectId = async (req, res, next) => {
    const project = await Projects.get(req.params.id);
    try {
        if (!project) {
            res.status(404).json({ Message: 'Project with that ID not found.' });
        } else {
            req.project = project;
            next();
        }
    } catch (err) {
        res.status(500).json({ message: 'Error getting project data.' });
    }
};

module.exports = { validateActionId, validateAction, validateProjectId, validateProject };