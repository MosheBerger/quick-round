
const errorHandler = (err, req, res, next) => {
    
    console.log();
    console.log('✖️','-----ERROR----','✖️');
    if ('statusCode' in err){ console.log('(I made this error 😌)');}
    console.log('❌',err);
    
    res.status(err.statusCode || 500).json(err)
    console.log('✖️','--------------','✖️');
    console.log();
    next()
}

module.exports = errorHandler