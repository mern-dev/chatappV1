var User = require('../models/user_model.js');
var Room = require('../models/room_model.js');
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
    console.log(newUser.username);

    User.findOne({ username: newUser.username }).then(user => {
      if (!user) {
        bcrypt.hash(newUser.password, saltRounds, function (err, hash) {

          newUser.password = hash;

          User.create(newUser).then(usr => {
            Room.create({ _id: usr._id }).then(room => {

              // console.log(room._id,"roomid");
              // console.log(usr._id,"userid");
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

        });


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
    User.findOne({ username: req.params.username }).then(user => {
      console.log('ss');
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

  app.get("/:id/search/:username", isLoggedIn, function (req, res) {
    User.find({ 'username': { '$regex': new RegExp('^' + req.params.username, "i") }, _id: { $ne: req.params.id } }, { password: 0 })
      .then(docs => {
        if (docs.length > 0) {
          res.json({
            status: "success",
            users: docs
          })
        }
        else {
          res.json({

            status: "error",
            message: "No such user"
          })

        }

      })
  })

  // =====================================
  // USER DETAIL =====================
  // =====================================

  app.get('/getDetail/:id', function (req, res) {
    User.findOne({ _id: req.params.id }, { password: 0, messagesActive: 0, }).then(user => {

      if (user) {
        res.json({
          status: "success",
          detail: user
        })

      }
      else {
        res.json({
          status: "error"


        })
      }
    })
  })


  // =====================================
  // last 10 messages ======================
  // =======================================

  app.get('/:id/getmsg/:rid/:msgid', function (req, resp) {

    Room.find({ _id: req.params.id, "chats.Id": req.params.rid }, { "chats.$.messages": 1, _id: 0 }).then(res => {

      var messages = []
      for (let i = 0; res[0].chats[0].messages[i].id != req.params.msgid; i++) {
        messages.push(res[0].chats[0].messages[i])
      }

      if (messages.length < 7)
        resp.json(
          {
            messages: messages
          }
        )
      else

        resp.json({
          messages: messages.slice(-7)
        })

    })
  })
  app.get('/getWord/:sid/:rid/:word', function (req, res) {
    console.log('yyyyy', req.params.sid, req.params.rid, 'yyyy');
    Room.find({ _id: req.params.sid, 'chats.Id': req.params.rid }, { 'chats.$.messages': 1, _id: 0 }).then(
      (info) => {


        var n;
        var f = 0;
        var arrId = [];
        const arrNo = [];
        const arrMsg = [];
        const arrPos = [];
        const arrMsgId = [];
        var x = req.params.word.split(" ")

        const xArray = x.filter((val) => {
          if (val[0] != ' ')
            return val;
        })
        console.log(xArray);

        info.map((i) => {
          i.chats.map(chat => {
            chat.messages.map((msg) => {

              y = msg.msgBody.trim().split(" ")

              const yArray = y.filter((val) => {
                if (val[0] != ' ')
                  return val;
              })
              console.log(yArray);

              arrNo.push(msg)


              for (var k = 0; k < xArray.length; k++) {
                  var bol = false;
                for (var m = 0; m < yArray.length; m++) {
                  if (xArray[k] === yArray[m].slice(0,xArray[k].length)) {
                    arrId.push(msg.id)


                    if (f == 0) {
                      n = arrNo.length - 1;
                      f = 1;
                    }
                    bol = true;
                    break;
                  }
                }
                if(bol)
                break;
              }

            })
          })
        })
        var l = n - 4;
        l < 0 ? l = 0 : l = l;

        for (var i = l; i < arrNo.length; i++) {
          arrMsg.push(arrNo[i]);
          arrMsgId.push(arrNo[i].id);

        }
        for (var i = 0; i < arrId.length; i++) {
          arrPos[i] = arrMsgId.indexOf(arrId[i])
        }

        if (info) {
          res.json({

            status: "success",
            arrId: arrId,
            arrMsg: arrMsg,
            arrPos: arrPos


          })
        }
        else {
          res.json({
            status: "error"
          })
        }
      }
    )
  })

  app.get('/getWord/:sid/:rid/:word/:start/:end', function (req, res) {
    console.log( 'with');
    Room.find({ _id: req.params.sid, 'chats.Id': req.params.rid }, { 'chats.$.messages': 1, _id: 0 }).then(
      (info) => {


        var n;
        var f = 0;
        var arrId = [];
        const arrNo = [];
        const arrMsg = [];
        const arrPos = [];
        const arrMsgId = [];
        var t;
        var ZS = new Date(req.params.start);
        var ZE = new Date(req.params.end);
        var k;
        console.log('before ', ZS, ZE);

        if (ZS > ZE) {
          t = ZS;
          ZS = ZE;
          ZE = t;
        }
        console.log('after', ZS, ZE);
        k = new Date(ZE.getTime())
        k.setDate(k.getDate() + 1);

        ZE = k;
        console.log('k', ZE, k);
        var x = req.params.word.split(" ")

        const xArray = x.filter((val) => {
          if (val[0] != ' ')
            return val;
        })

        info.map((i) => {
          i.chats.map(chat => {
            chat.messages.map((msg) => {
              y = msg.msgBody.trim().split(" ")

              const yArray = y.filter((val) => {
                if (val[0] != ' ')
                  return val;
              })
              console.log(yArray);
              
              z = msg.sentTime;


              arrNo.push(msg)

              var Y = z.getFullYear()
              M = z.getMonth()
              D = z.getDate()
              HH = z.getHours()
              MM = z.getMinutes()
              SS = z.getSeconds()
              var ZD = new Date(Y, M, D, HH, MM, SS);

              console.log(ZD, ZS, ZE);

              if (ZD >= ZS && ZD <= ZE) {
                
               
              for (var k = 0; k < xArray.length; k++) {
                var bol = false;
              for (var m = 0; m < yArray.length; m++) {
                if (xArray[k] === yArray[m].slice(0,xArray[k].length)) {
                  arrId.push(msg.id)


                  if (f == 0) {
                    n = arrNo.length - 1;
                    f = 1;
                  }
                  bol = true;
                  break;
                }
              }
              if(bol)
              break;
            }
              }
            })
          })
        })
        var l = n - 4;
        l < 0 ? l = 0 : l = l;

        for (var i = l; i < arrNo.length; i++) {
          arrMsg.push(arrNo[i]);
          arrMsgId.push(arrNo[i].id);

        }
        for (var i = 0; i < arrId.length; i++) {
          arrPos[i] = arrMsgId.indexOf(arrId[i])
        }

        if (info) {
          res.json({

            status: "success",
            arrId: arrId,
            arrMsg: arrMsg,
            arrPos: arrPos


          })
        }
        else {
          res.json({
            status: "error"
          })
        }
      }
    )
  })

}    