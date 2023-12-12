const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path').join(__dirname,'assets') 

const port = process.env.PORT || 8080

app.use(cors())
app.use(express.static(path))

app.get('/', (req, res) => {
    res.send('hello world')
})


app.listen(port, () => {
    console.log(`we are on http://localhost:${port}`);
})