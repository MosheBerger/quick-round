const express = require('express')
const app = express()
const cors = require('cors')
const pathMake = require('path')

const assetsPath = pathMake.join(__dirname, 'assets')
// const buildPath = pathMake.join(__dirname, 'build')

const port = process.env.PORT || 8080

app.use(cors())
app.use(express.static(assetsPath))

// app.use(express.static(buildPath))

app.get('/', (req, res) => {
    res.send('hello world')
})


app.listen(port, () => {
    console.log(`we are on http://localhost:${port}`);
})