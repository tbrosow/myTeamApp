var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Game = require('../models/game');
var Player = require('../models/player');
var Vote = require('../models/votes');
var WebTemplate = require('../models/webtemplate');
var Property = require('../models/property');
var Domain = require('../models/domain');

// router.get('*', function(req, res){
//     console.log("/root1:" + req.url + ";")
//
//     res.send('what???', 404);
// });

// GET route for reading data
router.get('/', function (req, res, next) {
    console.log("/ root")
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
            res.redirect('/portal');
        }
      }
    }); });

// PAGES

router.get('/games', function (req, res, next) {
    User.findById(req.session.userId).exec(function (error, user) {
        if (error) {
            return res.render('notfound');
        } else {
            if (user === null) {
                var err = new Error('Not authorized! Go back!');
                err.status = 400;
                res.redirect('/login');
            } else {
                getData(req, res, "games", {user: user});


            }
        }
    });
});

router.get('/players', function (req, res, next) {
    User.findById(req.session.userId).exec(function (error, user) {
        if (error) {
            return res.render('notfound');
        } else {
            if (user === null) {
                var err = new Error('Not authorized! Go back!');
                err.status = 400;
                res.redirect('/login');
            } else {
                getData(req, res, "players", {user: user});


            }
        }
    });
});
router.get('/vote321', function (req, res, next) {
    Property.create({name:"D"})
    User.findById(req.session.userId).exec(function (error, user) {
        if (error) {
            return res.render('notfound');
        } else {
            if (user === null) {
                var err = new Error('Not authorized! Go back!');
                err.status = 400;
                res.redirect('/login');
            } else {
                getData(req, res, "vote321", {user: user});


            }
        }
    });
});

router.get('/statistics', function (req, res, next) {
    User.findById(req.session.userId).exec(function (error, user) {
        if (error) {
            return res.render('notfound');
        } else {
            if (user === null) {
                var err = new Error('Not authorized! Go back!');
                err.status = 400;
                res.redirect('/login');
            } else {
                getData(req, res, "statistics", {user: user});


            }
        }
    });
});

router.get('/portal', function (req, res, next) {
    User.findById(req.session.userId).exec(function (error, user) {
        if (error) {
            return res.render('notfound');
        } else {
            if (user === null) {
                var err = new Error('Not authorized! Go back!');
                err.status = 400;
                res.redirect('/login');
            } else {
                getData(req, res, "portal", {user: user});


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

            Team.find({name:req.body.team}, function (error, team) {
                if (team.length <= 0) {
                    res.render('register', { fields: fields, error: {msg: "Team " + req.body.team + " is not registered. Please check with your team manager and try again"}});
                } else {
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
                            return res.redirect('/portal');
                        }
                    });
                }
            });



        }
    }
});

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







// MONGO GET DATA FOR THE FRONTEND
function getData(req, res, _page, _options) {
    var scored = 0;
    var played = 0;
    var stat = {gamesPlayed:0};
    var gamesVoted = [];
    var gamesPlayed = [];
    Property.find({}, function( err, props) {
        User.find({}, function (err, users) {
            console.log(_page + " Users: " + JSON.stringify(users, null, 4))

            Game.find({}, function (err, games) {
                console.log(_page + " Games: " + JSON.stringify(games, null, 4))
                games.forEach(function (game) {
                    if (game.played) {
                        scored += parseInt(game.goalsscored);
                        played++;
                    }
                    if (game.voted) {
                        gamesVoted.push(game)
                    }
                    if (game.played) {
                        gamesPlayed.push(game)
                    }
                })
                Player.find({}, function (err, players) {
                    for (var idx = 0; idx < games.length; idx++) {
                        if (games[idx].result != "") {
                            stat.gamesPlayed++;
                        }
                    }
                    WebTemplate.find({}, function (err, webtemplates) {
                        var wt = {};
                        webtemplates.forEach(function (template) {
                            if (template.name == "header") {
                                console.log(_page + " E" + "page.title" + _page);
                                props.forEach(function (prop) {
                                    if (prop.name == "page.title." + _page) {
                                        template.html = template.html.replace(/\{\{HEADER\}\}/, prop.value)
                                    }
                                })
                            }
                            if (template.name == "market") {
                                template.html = template.html.replace(/\{\{USERS\}\}/, players.length)
                                template.html = template.html.replace(/\{\{GAMES\}\}/, played)
                                template.html = template.html.replace(/\{\{GOALS\}\}/, scored)
                            }
                            wt[template.name] = template.html;
                        })
                        console.log(_page + " gameVoted: " + JSON.stringify(gamesVoted, null, 4))
                        res.render(_page, {
                            user: _options.user,
                            users: users,
                            games: games,
                            gamesVoted: gamesVoted,
                            gamesPlayed: gamesPlayed,
                            players: players,
                            stat: stat,
                            html: wt
                        });
                    });
                });
            });

        });
    });
}

// MONGO DB AJAX FUNCTIONS

// Get last games for chart
router.get('/getDomains', function (req, res, next) {

    let data = {domain:[]}
    console.log("/getDomains Email: [" + req.query.email + "]")

    User.find({email: req.query.email}, function(err, users) {

        console.log("/getDomains Domains: [" + users.length + "]")
        if (users.length > 0) {
            console.log("/getDomains Domains: [" + users[0].domain + "]")
            Domain.find({_id: { $in: users[0].domain}}, function (err, domains) {
                console.log("/getDomains Domains: [" + domains + "]")
                data.domain = domains;
                res.send(data)
            })
        } else {
            res.send(data)
        }
    })
});

router.get('/getGames', function (req, res, next) {

    console.log("/getGames Game: [" + req.query.game + "]")
    var voter = [];

    Game.find({played: true}, function (error, games) {
        console.log("/getGames: Games: " + JSON.stringify(games));

        function compare(a,b) {
            if (a.gameday < b.gameday)
                return -1;
            if (a.gameday > b.gameday)
                return 1;
            return 0;
        }

        games.sort(compare)

        res.send({games:games})
    }).sort({gameday:-1}).limit( 6 );
});

router.get('/getVoter', function (req, res, next) {

    console.log("/getVoter Game: [" + req.query.game + "]")
    var voter = [];

    Player.find({}, function (error, players) {
        console.log("/getVoter: Players: " + JSON.stringify(players));

        Vote.find({game: req.query.game}, function (error, votes) {

            players.forEach(function (player) {
                var voted = false;
                votes.forEach(function (vote) {
                    if (String(player._id) == vote.voter) {
                        voted = true;
                    }
                });
                if (voted) {
                    console.log("player " + player.email + " Voted")
                } else {
                    voter.push(player)
                }
            });

            console.log("/getVoter [" + voter.length + "]\n" + JSON.stringify(voter))
            console.log("/getVoter [" + votes.length + "]\n" + JSON.stringify(votes))
            res.send({votes:votes, players:voter})
        });

    });
});

router.put('/createVote', function (req, res, next) {
    console.log("/createVote: " + JSON.stringify(req.body))
    var voter = [];

    const voteData = {
        voter: req.body.voter,
        gold: req.body.gold,
        silver: req.body.silver,
        bronze: req.body.bronze,
        game: req.body.game,
        not_played: req.body.not_played || false

    };

    Vote.create(voteData, function (error, votes) {
        if (error) console.log(error);
        console.log("/createVote: "+JSON.stringify(votes))

        Player.find({}, function (error, players) {
            console.log("/createVote: Players: " + JSON.stringify(players));

            Vote.find({game: req.body.game}, function (error, votes) {

                players.forEach(function (player) {
                    var voted = false;
                    votes.forEach(function (vote) {
                        if (String(player._id) == vote.voter) {
                            voted = true;
                        }
                    });
                    if (voted) {
                        console.log("player " + player.email + " Voted")
                    } else {
                        voter.push(player)
                    }
                });

                if (voter.length == 0) {
                    var gameData = {voted: true};
                    Game.update({_id: req.body.game}, gameData, function (error, game) {
                        if (error) console.log(error);
                        console.log("/updateGame: " + JSON.stringify(game))
                    });

                }
                console.log("/createVote [" + voter.length + "]\n" + JSON.stringify(voter))
                res.send(voter)
            });

        });
    });
});

router.get('/getStatistics', function (req, res, next) {

    console.log("/getStatistics Game: [" + req.query.game + "]")
    var data = [];

    Player.find({}, function (error, players) {
        console.log("/getStatistics: Players: " + JSON.stringify(players));
        var query = {};
        if (req.query.game != "all") {
            query = {game: req.query.game};
        }
        Vote.find(query, function (error, votes) {

            players.forEach(function(player) {

                var tmpPlayer = JSON.parse(JSON.stringify(player));
                tmpPlayer.counter = 0;

                votes.forEach(function (vote) {
                    // console.log("/getStatistics: vote: " + JSON.stringify(vote));
                    if (!vote.not_played) {
                        console.log("/getStatistics: tmpPlayer: " + tmpPlayer._id + " " + vote.gold);
                        if (String(tmpPlayer._id) == vote.gold) {
                            tmpPlayer.counter += 3;
                        }
                        if (String(tmpPlayer._id) == vote.silver) {
                            tmpPlayer.counter += 2;
                        }
                        if (String(tmpPlayer._id) == vote.bronze) {
                            tmpPlayer.counter += 1;
                        }
                    }
                });

                if (tmpPlayer.counter > 0) {
                    data.push(tmpPlayer);
                    console.log("/getStatistics: tmpPlayer: " + JSON.stringify(tmpPlayer));
                }
            });

            function compare(a,b) {
                if (a.counter < b.counter)
                    return 1;
                if (a.counter > b.counter)
                    return -1;
                return 0;
            }
            console.log("/getStatistics: data: " + JSON.stringify(data, null, 4));
            data.sort(compare)
            console.log("/getStatistics: data: " + JSON.stringify(data, null, 4));
            res.send({data:data})
        });


    });
});

router.put('/createGame', function (req, res, next) {
    console.log("/createGame: " + JSON.stringify(req.body))

    var gameData = {
        homegame: req.body.homegame == "true" ? true : false,
        location: req.body.location,
        oponent: req.body.oponent,
        number: req.body.number,
        gameday: req.body.gameday
    };

    Game.create(gameData, function (error, game) {
        if (error) console.log(error);
        console.log("/createGame: " + JSON.stringify(game))
        res.send({created:true})
    });
});

router.put('/updateGame', function (req, res, next) {
    console.log("/updateGame: " + JSON.stringify(req.body))
    var gameData = {
    };

    if (req.body.location)
        gameData.location = req.body.location;
    if (req.body.oponent)
        gameData.oponent = req.body.oponent;
    if (req.body.gameday)
        gameData.gameday = req.body.gameday;
    if (req.body.number)
        gameData.number = req.body.number;
    if (req.body.homegame)
        gameData.homegame = req.body.homegame == "true" ? true : false;

    if (req.body.goalsscored && req.body.goalsconceded) {
        gameData.goalsscored = req.body.goalsscored;
        gameData.goalsconceded = req.body.goalsconceded
        gameData.result = req.body.goalsscored + ":" + req.body.goalsconceded;
        gameData.played = true;
    };

    Game.update({_id: req.body._id}, gameData, function (error, player) {
        if (error) console.log(error);
        console.log("/updateGame: " + JSON.stringify(player))
        res.send({updated:true})
    });
});

router.put('/deleteGame', function (req, res, next) {
    console.log("/deleteGame: " + JSON.stringify(req.body))

    Game.remove({_id: req.body._id}, function (error, player) {
        if (error) console.log(error);
        console.log("/deleteGame: "+JSON.stringify(player))
        res.send({deleted:true})
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
        res.send({created:true})
    });
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
        res.send({updated:true})
    });
});

router.put('/deletePlayer', function (req, res, next) {
    console.log("/deletePlayer: " + JSON.stringify(req.body))

    Player.remove({_id: req.body._id}, function (error, player) {
        if (error) console.log(error);
        console.log("/deletePlayer: "+JSON.stringify(player))
        res.send({deleted:true})
    });
});

module.exports = router;

router.get('/user', function( req, res) {
    User.find({}, function (err, data) {
        res.json(data)
    })
});

router.get('*', function(req, res){
    console.log("/root1:" + req.url + ";")

    res.send('what???', 404);
});
