const insureAuthenticated = require('../Middlewares/Auth');

const router = require('express').Router();

router.get('/', insureAuthenticated, (req, res)=>{
    // to show the currently logedin user in console
    console.log('----logged in user detail----', req.user);
    res.status(200).json([
        {
            name: "Clothes",
            price: 800
        },
        {
            name: "Electronics",
            price: 1200
        },
        {
            name: "Food",
            price: 400
        }
        
    ])
});

module.exports = router;