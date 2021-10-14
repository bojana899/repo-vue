let fs = require('fs')

const Router = require('express').Router()

let dataJson

Router.get('/users', (req, res) => {
    fs.readFile('./db.json', (err, data) => {
        dataJson = JSON.parse(JSON.stringify(data.toString()))
        console.log(dataJson)
        res.setHeader('Content-type', 'application/json')
        res.send(dataJson).end()
    })
})

Router.get('/user/:id', (req, res) => {
    fs.readFile('./db.json', (err, data) => {
        dataJson = JSON.parse(JSON.stringify(data.toString()))
        console.log(dataJson)
        res.setHeader('Content-type', 'application/json')
        res.send(dataJson).end()
    })
})

Router.get('*', (req, res) => {
    res.status(204)
    res.end()
})

module.exports = Router
