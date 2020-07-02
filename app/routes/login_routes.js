var User = require('../models/user_model.js');
const isLoggedIn = require("./middleware.js");
const jwt = require("jsonwebtoken");
const secret = "dingdingsjdfkdsvbdsvs8v9sdvhnksdjnvkjdsnvkjdv";
var bcrypt = require('bcrypt');
const saltRounds = 10;


//  use it in the client side to decode the token    ==================================================================
//      import jwt_decode from "jwt-decode";    ====== use this package for decoding
//     const decode = jwt_decode(c);
//     const id = decode._id,
//        ========================================

module.exports = function (app) {



  // =====================================
  // LOGIN ===============================
  // =====================================
  app.post('/login', function (req, res) {


    User.findOne({ username: req.body.username }).then(user => {
      if (user) {
        bcrypt.compare(req.body.password, user.password, function (err, result) {

          if (result) {
            const payload = {
              _id: user._id,
              username: user.username
            };
            // Authenticate using JWT
            let token = jwt.sign(payload, secret, {
              expiresIn: 2000
            });
            // send encrypted token to client
            res.json({
              status: "success",
              token: token,
              message:
                user.username +
                " is successfully logged in"
            });

          }
          else {
            res.json({
              // Duplicate account
              status: "error",
              message: "Incorrect Password or Username!"
            });

          }
         });

      }
      else {
        res.json({
          // Duplicate account
          status: "error",
          message: req.body.username + "not exists!"
        });
      }

    });

  });



  // =====================================
  // SIGNUP ==============================
  // =====================================

  app.post('/signup', function (req, res) {
    console.log(req.body);

    const newUser = {
      username: req.body.username,
      password: req.body.password
    }

    User.findOne({ username: newUser.username }).then(user => {
      if (!user) {
        bcrypt.hash(newUser.password, saltRounds, function (err, hash) {

          newUser.password = hash;

          User.create(newUser).then(usr => {
            const payload = {
              _id: usr._id,
              username: newUser.username
            };
            // Authenticate using JWT
            let token = jwt.sign(payload, secret, {
              expiresIn: 2000
            });
            // send encrypted token to client
            res.json({
              status: "success",
              token: token,
              message:
                newUser.username +
                " is successfully registered!"
            });
          });
        })


      } else {
        res.json({
          // Duplicate account
          status: "error",
          message: newUser.username + " already exists!"
        });
      }
    })

      .catch(err => {
        res.json({ status: "error", message: "Oops :( Please try again" });
      });

  });


    // =====================================
    // CHECK USER ROUTE =====================
    // =====================================
  app.get('/checkusername/:username', function (req, res) {
    User.findOne({ username: req.params.username}).then(user => {
      
      if (user) {
        res.json({
          status: "error",
          message: "Already Exists"
        })

      }
      else {
        res.json({
          status: "success",
          message: "Valid username"
          
        })
      }
    })
  })



    // =====================================
    // CHAT LIST ROUTE =====================
    // =====================================

    app.get("/:id/:username",isLoggedIn,function(req,res)
    {    
        User.find( { 'username' : { '$regex' : req.params.username, '$options' : 'i' } },{
            "username": 1
          } ).then(docs =>
            {  
                    if(docs.length>0)
                    {
                        res.json({
                            status:"success",
                             data:docs
                        })
                    }
                    else
                    {
                          res.json({

                            status:"error",
                            message:"No such user"
                          })

                    }

            } )
    })
  }
