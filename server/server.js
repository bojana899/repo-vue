const Express = require('express')
const Cors = require('cors')
const router = require( './router.js')

let app = Express()

app.use((req, res, next) => {
    res.setHeader('Connection', 'close')
    next()
})

// Close all /favicon.ico requests
app.use((req, res, next) => {
    if(req.url == '/favicon.ico') {
        res.status(204)
	return res.end()
    }
    next()
})
app.use(Express.json())
app.use(Express.urlencoded({ extended: true }))

let corsOptions = {
	origin: '*',
	methods: ['GET', 'POST']
}

app.use(Cors(corsOptions))
app.use(router)
let server = app.listen(3000)

console.log(`Listening on ${ server._connectionKey }`)

