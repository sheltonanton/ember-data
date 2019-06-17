module.exports = (req, res, next) => {
    if(req.body){
        req.body = req.body[Object.keys(req.body)[0]]
    }
    next();
}