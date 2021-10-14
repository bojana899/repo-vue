const Router = require('express').Router()

Router.post('/users', (req, res) => {
    console.log(req.body)
})

Router.get('/users/:id', (req, res) => {
    console.log("Single user endpoint")
    res.end()
})

Router.get('*', (req, res) => {
    res.status(204)
    res.end()
})

module.exports = Router
