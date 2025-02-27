const jwt = require('jsonwebtoken');

const insureAuthenticated = (req, res, next) =>{
    const auth = req.headers['authorization'];
    if(!auth){
        return res.status(401)
            .json({message: 'Unauthorized, JWT token is require'});
    }
    try{
        // verify the user
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(err){
        return res.status(401)
            .json({ message: "Unauthorized, JWT Token wrong or expired "});
    }
} 


module.exports = insureAuthenticated;