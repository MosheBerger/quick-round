const express = require('express')
const app = express()

require('dotenv').config()
const cors = require('cors')
const pathMake = require('path')

const assetsPath = pathMake.join(__dirname, 'assets')
const buildPath = pathMake.join(__dirname, 'build')

const port = process.env.PORT || 8080

app.use(cors())
app.use(express.json())

app.get('/wake-me-up',(req,res) => res.send("i'm awake"))

const apiRouter = require('./routes/router')
app.use('/api/', apiRouter)


app.use('/assets/', express.static(assetsPath))

app.use(express.static(buildPath))
app.get("/*", (req, res) => {
  res.sendFile(pathMake.join(buildPath, 'index.html'))
})



app.listen(port, () => {
  console.log('🚀 ', `we are on http://localhost:${port}`);
})