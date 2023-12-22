const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors')
const pathMake = require('path')

const assetsPath = pathMake.join(__dirname, 'assets')
const buildPath = pathMake.join(__dirname, 'build')

const port = process.env.PORT || 8080

app.use(cors())
app.use('/assets',cors())
app.use(express.json())


app.use('/assets',express.static(assetsPath))

 app.use('/',express.static(buildPath))

//app.get('/', (req, res) => {
  //  res.send('hello world')
//})

const apiRouter = require('./routes/api')
app.use('/api',apiRouter)

app.listen(port, () => {
    console.log(`we are on http://localhost:${port}`);
})