// Write your "projects" router here!
const express = require('express')
const Pj = require('./projects-model')
const { validateId,
        validatePj } = require('./projects-middleware');
const router = express.Router()
    
router.get('/', (req, res, next) => {
    Pj.get()
    .then(pj => {
        res.json(pj)
    })
    .catch(next)
})

router.get('/:id', validateId, (req, res, next) => {
    Pj.get(req.params.id)
    .then(pj => {
        res.json(pj)
    })
    .catch(next)
})

router.post('/', validatePj, (req, res, next) => {
    // const { name, description } = req.body
    Pj.insert(req.body)
    .then(p => {
        res.json(p)
    })
    .catch(next)
})

router.put('/:id', validateId, validatePj, (req, res, next) => {
    // const { name, description } = req.body
    Pj.update(req.params.id, req.body)
    .then(p => {
        res.json(p)
    })
    .catch(next)
})

router.delete('/:id', validateId, (req, res) => {
    Pj.remove(req.params.id)
    .then(p => {
        return Pj.get(req.params.id)
    })
    .catch(next)
})

router.get('/:id/actions', validateId, (req, res, next) => {
    Pj.getProjectActions(req.params.id)
    .then(pj => {
        res.json(pj)
    })
    .catch(next)
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: "something went wrong",
        error: err.message        
    })
})

module.exports = router;