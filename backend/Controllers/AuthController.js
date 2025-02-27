const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const UserModel = require('../Models/User');

const signup = async (req, res) =>{
    try{
        const {name, email, password} = req.body;
        const user = await UserModel.findOne({email});
        if(user){
            return res.status(409)
                .json({message: "User is already exist, you can login", success: false});
        }
        const userModel = new UserModel ({ name, email, password});
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201)
            .json({
                message: "Signup Successfully",
                success: true
            })
    }catch (err){
        res.status(500)
        .json({
            message: "Internal Server Error",   
            success: false
        })
    }
}


// login controller
const  login = async (req, res, next) =>{
    try{    
        const {email, password} = req.body;
        const user = await UserModel.findOne({email});
        const errorMessage  = 'Auth is failed email or password is invalid';
        if(!user){
            return res.status(403)
                .json({message: errorMessage, success: false});
        }

        // password same check
        const isPassEqual = await bcrypt.compare(password, user.password);
        if(!isPassEqual){
            return res.status(403)
                .json({message: errorMessage, success: false});
        }

        // jwt token
        const jwtToken = jwt.sign(
            {email:user.email, id: user.id},
            process.env.JWT_SECRET,
            {expiresIn:'24h'}
        )

        res.status(200)
            .json({
                message: "Login Successfully",
                success:true,
                jwtToken,
                email,
                name: user.name
            })
    }catch(err){
        res.status(500)
        .json({
            message: "Internal Server Error",
            success: false
        })
    }
}

module.exports ={
    signup,
    login
}