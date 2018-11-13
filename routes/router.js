var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Game = require('../models/game');
var Player = require('../models/player');
var Vote = require('../models/votes');


// GET route for reading data
router.get('/', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          //return next(err);
          res.redirect('/login');
        } else {
          User.find({}, function (err, docs) {
          res.render('portal', {user:user, users: docs});
            
          });
          //return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
        }
      }
    }); });

router.get('/portal', function (req, res, next) {
    User.findById(req.session.userId).exec(function (error, user) {
        if (error) {
            return next(error);
        } else {
            if (user === null) {
                var err = new Error('Not authorized! Go back!');
                err.status = 400;
                return next(err);
            } else {

                // Game.find().distinct('number', function(error, ids) {
                //     console.log("Game: " + JSON.stringify(ids, null, 4));
                //     var nextNumber = ids.length + 100;
                //     Game.create({
                //         number:nextNumber, 
                //         location:"Hilton Oval",
                //         homeGame:false, 
                //         gameDay:"08.04.2019",
                //         result:"21:1",
                //         oponent: "Woy Woy II"
                //         }, function (error, game) {
                //             if (error) {
                //             console.log("Game: " + error);
                //         } else {

                //         }
                //     });
                // });
                var stat = {gamesPlayed:0};
                User.find({}, function (err, docs) {
                    Game.find({}, function (err, games) {
                        Player.find({}, function (err, players) {
                            for (var idx = 0; idx < games.length; idx++) {
                                console.log(games.length + games[idx].result)
                                if (games[idx].result != "") {
                                    stat.gamesPlayed++;
                                }
                            }
                            res.render('portal', {user:user, users: docs, games: games, players: players, stat: stat});
                        });
                    });
                });

                Game.find({}, function (err, docs) {
                    console.log("Game: " + JSON.stringify(docs, null, 4));
                });
                //return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
            }
        }
    });
});

router.get('/vote321', function (req, res, next) {
    User.findById(req.session.userId).exec(function (error, user) {
        if (error) {
            return next(error);
        } else {
            if (user === null) {
                var err = new Error('Not authorized! Go back!');
                err.status = 400;
                return next(err);
            } else {

                var stat = {gamesPlayed:0};
                User.find({}, function (err, docs) {
                    Game.find({}, function (err, games) {
                        Vote.find({}, function (err, players) {
                            Player.find({}, function (err, players) {
                                for (var idx = 0; idx < games.length; idx++) {
                                    console.log(games.length + games[idx].result)
                                    if (games[idx].result != "") {
                                        stat.gamesPlayed++;
                                    }
                                }
                                res.render('vote321', {
                                    user: user,
                                    users: docs,
                                    games: games,
                                    players: players,
                                    stat: stat
                                });
                            });
                        });
                    });
                });
            }
        }
    });
});

router.get('/users', function (req, res, next) {
    User.find({}, function (err, docs) {
        console.log("/users: " + JSON.stringify(docs, null, 4));
        res.render('users', {users: docs});
        //res.send("passwords dont match");
    });
   
});

router.get('/register', function (req, res, next) {
        res.render('register', {fields: {}, error:{}});
});

router.get('/login', function (req, res, next) {
    res.render('login', { error: {}});
});
 

//POST route for updating data
router.post('/login', function (req, res, next) {
  // confirm that user typed same password twice
  
    if (req.body.email && req.body.password) {
        User.authenticate(req.body.email, req.body.password, function (error, user) {
            if (error || !user) {
                var err = new Error('Wrong email or password.');
                err.status = 401;
                // return next(err);
                res.render('login', { error: {msg: "Wrong email or password."}});
            } else {
                req.session.userId = user._id;
                return res.redirect('/portal');
            }
        });
    } else {
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
  } 
});

router.post('/register', function (req, res, next) {
  // confirm that user typed same password twice
    var fields = {};
    if (req.body.email) { fields.email = req.body.email}
    if (req.body.username) { fields.username = req.body.username}
    if (req.body.password !== req.body.passwordConf) {
        res.render('register', { fields: fields, error: {msg: "Passwords do not match."}});
    } else {
    
        if (req.body.email && req.body.username && req.body.password && req.body.passwordConf) {

            var userData = {
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
                passwordConf: req.body.passwordConf,
            }

            User.create(userData, function (error, user) {
                if (error) {
                    res.render('register', { fields: fields, error: {msg: "User already registered with this email address"}});
                } else {
                    req.session.userId = user._id;
                    return res.redirect('/profile');
                }
            });

        }
    }
});

//POST route for updating data
router.post('/dd', function (req, res, next) {
  // confirm that user typed same password twice
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    res.send("passwords dont match");
    return next(err);
  }

  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {

    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
    }

    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });

  } else if (req.body.logemail && req.body.logpassword) {
    User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/portal');
      }
    });
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
})

// GET route after registering
router.get('/profile', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
        }
      }
    });
});

// GET for logout logout
router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/login');
      }
    });
  }
});

router.put('/updatePlayer', function (req, res, next) {
    console.log("/updatePlayer: " + JSON.stringify(req.body))

    var playerData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        shirt: req.body.shirt,
        dob: req.body.dob,
        email: req.body.email,
        mobile: req.body.mobile

    };

    Player.update({_id: req.body._id}, playerData, function (error, player) {
        if (error) console.log(error);
        console.log("/updatePlayer: " + JSON.stringify(player))
    });
});

router.put('/updateGame', function (req, res, next) {
    console.log("/updateGame: " + JSON.stringify(req.body))

    var gameData = {
        goalsscored: req.body.goalsscored,
        goalsconceded: req.body.goalsconceded
    };

    Game.update({_id: req.body._id}, gameData, function (error, player) {
        if (error) console.log(error);
        console.log("/updateGame: " + JSON.stringify(player))
    });
});

router.put('/deletePlayer', function (req, res, next) {
    console.log("/deletePlayer: " + JSON.stringify(req.body))

    Player.remove({_id: req.body._id}, function (error, player) {
        if (error) console.log(error);
        console.log("/deletePlayer: "+JSON.stringify(player))
    });
});

router.put('/newPlayer', function (req, res, next) {
    console.log("/newPlayer: " + JSON.stringify(req.body))

    var playerData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        shirt: req.body.shirt,
        dob: req.body.dob,
        email: req.body.email,
        mobile: req.body.mobile

    };

    Player.create(playerData, function (error, player) {
        if (error) console.log(error);
        console.log("/newPlayer: "+JSON.stringify(player))
    });
});

router.get('/getVotes', function (req, res, next) {

    console.log("/getVotes Game: [" + req.query.game + "]")

    Vote.find({game: req.query.game}, function (error, votes) {
        if (error) console.log(error);
        console.log("/getVotes: " + JSON.stringify(votes))
        res.send(votes); 
    });
});

router.put('/createVote', function (req, res, next) {
    console.log("/createVote: " + JSON.stringify(req.body))

    var voteData = {
        voter: req.body.voter,
        gold: req.body.gold,
        silver: req.body.silver,
        bronze: req.body.bronze,
        game: req.body.game

    };

    Vote.create(voteData, function (error, votes) {
        if (error) console.log(error);
        console.log("/createVote: "+JSON.stringify(votes))
    });
});

module.exports = router;