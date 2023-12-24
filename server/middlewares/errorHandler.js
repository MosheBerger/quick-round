
const errorHandler = (err, req, res, next) => {
    console.log('-----ERROR----');
    console.log(err);
    res.send({ error: err.message })
    console.log('--------------');
    next()
}

module.exports = errorHandler