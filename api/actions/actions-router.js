// Write your "actions" router here!
const express = require('express')
const Act = require('./actions-model')
const { validateId,
        validateAct 
    } = require('./actions-middlware');
const router = express.Router()
    
router.get('/', (req, res, next) => {
    Act.get()
    .then(act => {
        res.json(act)
    })
    .catch(next)
})

router.get('/:id', validateId, (req, res, next) => {
    Act.get(req.params.id)
    .then(act => {
        res.json(act)
    })
    .catch(next)
})

router.post('/', validateAct, (req, res, next) => {
    Act.insert(req.body)
    .then(act => {
        res.json(act)
    })
    .catch(next)
})

router.put('/:id', validateId, validateAct, (req, res, next) => {
    Act.update(req.params.id, req.body)
    .then(act => {
        res.json(act)
    })
    .catch(next)
})

router.delete('/:id', validateId, (req, res) => {
    Act.remove(req.params.id)
    .then(act => {
        return Act.get(req.params.id)
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