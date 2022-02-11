// add middlewares here related to actions

const Act = require('./actions-model')

async function validateId(req, res, next) {
    const act = await Act.get(req.params.id) 
    if (!act) {
        res.status(404).json({message: "provide valid id"})
    } else {
        req.act = act
        next()
    }
}

function validateAct(req, res, next) {
    const { project_id, description, notes } = req.body
    if (!project_id || !description || !notes) {
        res.status(400).json({message: "name, description and notes are required"})
    } else {
        next()
    }
}

module.exports = {
    validateId,
    validateAct
}