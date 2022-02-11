// add middlewares here related to projects
const Pj = require('./projects-model')

async function validateId(req, res, next) {
    const pj = await Pj.get(req.params.id) 
    if (!pj) {
        res.status(404).json({message: "provide valid id"})
    } else {
        req.pj = pj
        next()
    }
}

function validatePj(req, res, next) {
    const { name, description } = req.body
    if (!name || !description) {
        res.status(400).json({message: "both name and description are required"})
    } else {
        next()
    }

}
module.exports = {
    validateId,
    validatePj
}