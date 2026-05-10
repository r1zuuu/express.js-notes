const validateNote = (req, res, next) =>{
    const content = req.body.tresc
    if(!content || content.trim().length === 0){
        return res.status(400).json({message: 'Empty string'})
    }

    req.body.tresc = content.trim()
    next()
}

module.exports = validateNote