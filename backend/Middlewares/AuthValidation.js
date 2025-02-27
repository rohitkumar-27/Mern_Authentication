const joi = require('joi');


// validation for data in signup page
const signupValidation = (req, res, next)=>{
    const schema = joi.object({
        name: joi.string().min(3).max(100).required(),
        email: joi.string().email().required(),
        password: joi.string().min(4).max(15).required(),
    });
    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400)
            .json({message: "Bad request", error})
    }
    next();
}

// validation for data in login page
const loginValidation = (req, res, next) =>{
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(4).max(15).required(),
    });
    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400).json({message: "Bad request", error})
    }
    next();
}

module.exports = {
    signupValidation,
    loginValidation
}

