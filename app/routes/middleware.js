var User = require('../models/user_model.js');
const e = require('express');

module.exports = function isLoggedIn(req, res, next) {
    
   User.findById(req.params.id,function(err,doc){

    if(err)
    {
           res.status(401).send("UnAuthorized");
    }
    if (doc) {
        // user is authenticated
        next();
      } 
        
      
    })
}
   