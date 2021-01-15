const Actions = require('../actions/actions-model');

const validateActionId = async (req, res, next) => {
    const { id } = req.params;
    const action = await Actions.get(id);
    
    try {
        if(!action) {
            res.status(404).json({ message: `ID ${id} not found.` });
        } else {
            req.action = action;
            next();
        }
    } catch(err) {
        res.status(500).json({ errorMessage: 'Error finding that ID.'});
    }
};

const validateAction = async (req, res, next) => {
    const action = await req.body

    try {
        if(!action.body) {
            res.status(400).json({ message: 'No action data found.'});
        } else if (!action.notes) {
            res.status(400).json({ message: 'Notes are needed.' });
        } else if (!action.description) {
            res.status(400).json({ message: 'Descrition is needed.' });
        } else {
            req.action = action;
            next();
        }
    } catch (error) {
        res.status(500).json({ errorMessage: 'Error posting action'})
    }
}


module.exports = { validateActionId, validateAction };