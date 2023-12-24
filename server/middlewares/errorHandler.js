
const errorHandler = (err, req, res, next) => {
    if ('statusCode' in err){ console.log('I made this');}
    
    console.log('-----ERROR----');
    console.log(err);

    res.status(err.statusCode || 500).json(err)
    console.log('--------------');
    next()
}

module.exports = errorHandler