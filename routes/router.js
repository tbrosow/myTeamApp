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

router.get('/properties', function (req, res, next) {
    User.findById(req.session.userId).exec(function (error, user) {
        if (error) {
            return res.render('notfound');
        } else {
            if (user === null) {
                var err = new Error('Not authorized! Go back!');
                err.status = 400;
                res.redirect('/login');
            } else {
                getData(req, res, "properties", {user: user});


            }
        }
    });
});

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
                req.session.domainId = req.body.domain;
                Domain.find({_id: req.session.domainId}, function (err, domains) {
                    if (domains.length > 0) {
                        req.session.domainName = domains[0].name;
                    }
                    return res.redirect('/portal');
                })

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

            Domain.find({name:req.body.team}, function (error, domain) {
                if (domain.length > 0) {
                    res.render('register', { fields: fields, error: {msg: "Team " + req.body.team + " is already registered. Please check with your team manager and try again"}});
                } else {
                    let domainData = {
                        name: req.body.team
                    }

                    Domain.create(domainData, function (err, domain) {
                        var userData = {
                            email: req.body.email,
                            username: req.body.username,
                            password: req.body.password,
                            passwordConf: req.body.passwordConf,
                            domain: {
                                id: domain._id,
                                display: domain.name
                            }
                        }
                        User.create(userData, function (error, user) {
                            if (error) {
                                res.render('register', { fields: fields, error: {msg: "User already registered with this email"}});
                            } else {
                                req.session.userId = user._id;
                                req.session.domainId = domain._id;
                                req.session.domainName = domain.name;
                                return res.redirect('/portal');
                            }
                        });
                    })
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





function displayDate(_inDate) {
    let newDate = new Date(_inDate);
    let day = ("0" + newDate.getDate()).slice(-2);
    let month = ("0" + (newDate.getMonth()+1)).slice(-2);
    return (newDate.getFullYear() + "-" + month + "-" + day);

}

// MONGO GET DATA FOR THE FRONTEND
function getData(req, res, _page, _options) {
    var scored = 0;
    var played = 0;
    var stat = {gamesPlayed:0};
    var gamesVoted = [];
    var gamesPlayed = [];

    console.log(_page + " Session: " + JSON.stringify(req.session, null, 4))

    Property.find({}, function( err, props) {
        User.find({}, function (err, users) {
            console.log(_page + " Users: " + JSON.stringify(users, null, 4))

            Game.find({'domain.id': req.session.domainId}, function (err, games) {
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
                Player.find({'domain.id': req.session.domainId}, function (err, players) {
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
                                        template.html = template.html.replace(/\{\{DOMAIN_NAME\}\}/, req.session.domainName)
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

router.get('/freeDomains', function (req, res, next) {

   console.log("/freeDomains team: [" + req.query.team + "]")

    Domain.find({name: req.query.team}, function(err, domains) {
        if (err)
            console.log("/freeDomains Err: [" + err + "]")
        console.log("/freeDomains Domains: [" + domains.length + "]")
        res.send({domains: domains.length})
    })
});

router.get('/getGames', function (req, res, next) {

    console.log("/getGames Game: [" + req.query.game + "]")
    var voter = [];

    Game.find({'domain.id': req.session.domainId, played: true}, function (error, games) {
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

    Player.find({'domain.id': req.session.domainId }, function (error, players) {
        console.log("/getVoter: Players: " + JSON.stringify(players));

        Vote.find({'domain.id': req.session.domainId, game: req.query.game}, function (error, votes) {

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
        not_played: req.body.not_played || false,
        domain: {
            id: req.session.domainId,
            display: req.session.domainName
        }

    };

    Vote.create(voteData, function (error, votes) {
        if (error) console.log(error);
        console.log("/createVote: "+JSON.stringify(votes))

        Player.find({'domain.id': req.session.domainId}, function (error, players) {
            console.log("/createVote: Players: " + JSON.stringify(players));

            Vote.find({'domain.id': req.session.domainId, game: req.body.game}, function (error, votes) {

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

    Player.find({'domain.id': req.session.domainId}, function (error, players) {
        console.log("/getStatistics: Players: " + JSON.stringify(players));
        var query = {'domain.id': req.session.domainId};
        if (req.query.game != "all") {
            query.game = req.query.game;
        }
        Vote.find(query, function (error, votes) {
            console.log("/getStatistics: Votes: " + JSON.stringify(votes));
            players.forEach(function(player) {

                var tmpPlayer = JSON.parse(JSON.stringify(player));
                tmpPlayer.counter = 0;

                votes.forEach(function (vote) {
                    // console.log("/getStatistics: vote: " + JSON.stringify(vote));
                    if (!vote.not_played) {
                        //console.log("/getStatistics: tmpPlayer: " + tmpPlayer._id + " " + vote.gold);
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
        team: req.body.team,
        number: req.body.number,
        gameday: convertDate(req.body.gameday),
        domain: {
            id: req.session.domainId,
            display: req.session.domainName
        }
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
    if (req.body.team)
        gameData.team = req.body.team;
    if (req.body.gameday)
        gameData.gameday = convertDate(req.body.gameday);
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
        dob: convertDate(req.body.dob),
        email: req.body.email,
        mobile: req.body.mobile,
        domain: {
            id: req.session.domainId,
            display: req.session.domainName
        }
    };

    Player.create(playerData, function (error, player) {
        if (error) console.log(error);
        console.log("/newPlayer: "+JSON.stringify(player))
        res.send({created:true})
    });
});

function convertDate(_inDate) {
    let date = new Date(_inDate);
    return date.toUTCString()
}

router.put('/updatePlayer', function (req, res, next) {
    console.log("/updatePlayer: " + JSON.stringify(req.body))


    var playerData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        shirt: req.body.shirt,
        dob: convertDate(req.body.dob),
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

router.put('/dd_load_games', function (req, res, next) {
    console.log("/dd_load_games: " + JSON.stringify(req.session))
    let games = [
        {
            "gameday": "23-May-2018",
            "team": "Woy Woy",
            "homegame": true,
            "location": "Central Coast Stadium"
        },
        {
            "gameday": "15-April-2018",
            "team": "Ettalong",
            "homegame": true,
            "location": "Duffys Oval (TER)"
        },
        {
            "gameday": "16-April-2018",
            "team": "Avoca",
            "homegame": true,
            "location": "Gavenlock Oval (GOS)"
        },
        {
            "gameday": "29-May-2018",
            "team": "Gosford",
            "homegame": true,
            "location": "Duffys Oval (TER)"
        },
        {
            "gameday": "09-July-2018",
            "team": "East Gosford",
            "homegame": true,
            "location": "Central Coast Stadium"
        },
        {
            "gameday": "03-April-2018",
            "team": "Woy Woy",
            "homegame": false,
            "location": "Gavenlock Oval (GOS)"
        },
        {
            "gameday": "06-April-2018",
            "team": "Ettalong",
            "homegame": false,
            "location": "Duffys Oval (TER)"
        },
        {
            "gameday": "30-April-2018",
            "team": "Avoca",
            "homegame": false,
            "location": "Central Coast Stadium"
        },
        {
            "gameday": "26-July-2018",
            "team": "Gosford",
            "homegame": false,
            "location": "Gavenlock Oval (GOS)"
        },
        {
            "gameday": "02-May-2018",
            "team": "East Gosford",
            "homegame": false,
            "location": "Central Coast Stadium"
        }
    ]

    let number=1
    games.forEach(function (gameData) {

        gameData.domain = {
            id: req.session.domainId,
            display: req.session.domainName
        }
        gameData.number = number++;

        Game.create(gameData, function (error, game) {
            if (error) console.log(error);
            console.log("/newGame: " + JSON.stringify(game))

        });
    })
    res.send("Games loaded");
});

router.put('/dd_load_votes', function (req, res, next) {
    let voteCount = 0;
    Player.find({'domain.id': req.session.domainId}, function (err, players) {
        Player.find({'domain.id': req.session.domainId}, function (err, gold) {
            console.log("/newGame: PRE" + gold.length)
            Player.find({'domain.id': req.session.domainId}, function (err, silver) {
                Player.find({'domain.id': req.session.domainId}, function (err, bronze) {
                    Game.find({'domain.id': req.session.domainId}, function (err, games) {
                        games.forEach(function (game) {
                            gs = Math.floor(Math.random() * 4) + 1;
                            gc = Math.floor(Math.random() * 3) + 1;
                            let gameData = {
                                goalsscored: gs,
                                goalsconceded: gc,
                                played: true,
                                voted: true,
                                result: gs + ":" + gc
                            }
                            console.log("/newGame: PRE" + JSON.stringify(gameData))
                            Game.update({_id: game._id}, gameData, function (err, game) {
                                console.log("/newGame: POST" + JSON.stringify(game))
                            })
                            players.forEach(function (player) {

                            })

                            players.forEach(function(voter) {
                                sd = [];
                                let vp = Math.floor(Math.random() * 17) + 1
                                let gp = Math.floor(Math.random() * 17) + 1
                                let sp = Math.floor(Math.random() * 17) + 1
                                let bp = Math.floor(Math.random() * 17) + 1
                                console.log("/SCORE: POST" + vp + " " + gp + " " + sp + " " + bp)
                                let scoreData = {
                                    gold: gold[gp]._id,
                                    silver: silver[sp]._id,
                                    bronze: bronze[bp]._id,
                                    voter: voter._id,
                                    game: game._id
                                }
                                scoreData.domain = {
                                    id: req.session.domainId,
                                    display: req.session.domainName
                                }
                                sd.push(scoreData)
//                                console.log("/scoreData: scoreData" + JSON.stringify(scoreData))
                                sd.forEach(function (sdd) {
                                    Vote.create(sdd, function (error, voteData) {
                                        if (error) console.log(error);
                                        voteCount++;
                                    })
                                })

                            })

                        })
                        res.send("Votes generated ")
                    }).sort({gameday:-1}).limit( 6 )
                })
            })
        })
    })
});

router.put('/dd_load_players', function (req, res, next) {
    console.log("/dd_load_players: " + JSON.stringify(req.session))
    let players = [
        {
            "shirt": 15,
            "firstname": "Steve",
            "lastname": "Austin",
            "dob": "30-May-1964",
            "mobile": "046571995",
            "email": "Steve.Austin@gmail.com",
            "ff_number": 54634704
        },
        {
            "shirt": 18,
            "firstname": "Mark",
            "lastname": "Bowers",
            "dob": "17-November-1968",
            "mobile": "046571022",
            "email": "Mark.Bowers@gmail.com",
            "ff_number": 63766596
        },
        {
            "shirt": 8,
            "firstname": "Paul",
            "lastname": "Brandham",
            "dob": "02-October-1970",
            "mobile": "046571694",
            "email": "Paul.Brandham@gmail.com",
            "ff_number": 61142865
        },
        {
            "shirt": 11,
            "firstname": "Torsten",
            "lastname": "Brosow",
            "dob": "07-February-1960",
            "mobile": "046571959",
            "email": "Torsten.Brosow@gmail.com",
            "ff_number": 63776710
        },
        {
            "shirt": 10,
            "firstname": "Mark",
            "lastname": "Croft",
            "dob": "05-January-1970",
            "mobile": "046571776",
            "email": "Mark.Croft@gmail.com",
            "ff_number": 80535396
        },
        {
            "shirt": 19,
            "firstname": "Adam",
            "lastname": "Dabin",
            "dob": "05-August-1962",
            "mobile": "046571704",
            "email": "Adam.Dabin@gmail.com",
            "ff_number": 75265207
        },
        {
            "shirt": 14,
            "firstname": "Paul",
            "lastname": "Darbin",
            "dob": "15-May-1970",
            "mobile": "046571643",
            "email": "Paul.Darbin@gmail.com",
            "ff_number": 65827941
        },
        {
            "shirt": 7,
            "firstname": "Luigi",
            "lastname": "Genovese",
            "dob": "16-October-1966",
            "mobile": "046571059",
            "email": "Luigi.Genovese@gmail.com",
            "ff_number": 59479063
        },
        {
            "shirt": 12,
            "firstname": "Brett",
            "lastname": "Green",
            "dob": "09-February-1968",
            "mobile": "046571116",
            "email": "Brett.Green@gmail.com",
            "ff_number": 54658711
        },
        {
            "shirt": 6,
            "firstname": "Anthony",
            "lastname": "Johnson",
            "dob": "10-November-1963",
            "mobile": "046571261",
            "email": "Anthony.Johnson@gmail.com",
            "ff_number": 63776751
        },
        {
            "shirt": 17,
            "firstname": "Darren",
            "lastname": "Kimber",
            "dob": "25-August-1967",
            "mobile": "046571412",
            "email": "Darren.Kimber@gmail.com",
            "ff_number": 43808195
        },
        {
            "shirt": 3,
            "firstname": "Robert",
            "lastname": "McLeod",
            "dob": "13-December-1966",
            "mobile": "046571341",
            "email": "Robert.McLeod@gmail.com",
            "ff_number": 63776744
        },
        {
            "shirt": 20,
            "firstname": "Jon",
            "lastname": "Williams",
            "dob": "24-May-1966",
            "mobile": "046571840",
            "email": "Jon.Williams@gmail.com",
            "ff_number": 79973087
        },
        {
            "shirt": 16,
            "firstname": "Gavin",
            "lastname": "Robinson",
            "dob": "18-October-1963",
            "mobile": "046571588",
            "email": "Gavin.Robinson@gmail.com",
            "ff_number": 75015321
        },
        {
            "shirt": 9,
            "firstname": "Stephen",
            "lastname": "Shields",
            "dob": "03-July-1963",
            "mobile": "046571797",
            "email": "Stephen.Shields@gmail.com",
            "ff_number": 63776553
        },
        {
            "shirt": 1,
            "firstname": "Darren",
            "lastname": "Sloane",
            "dob": "12-June-1970",
            "mobile": "046571940",
            "email": "Darren.Sloane@gmail.com",
            "ff_number": 43814011
        },
        {
            "shirt": 2,
            "firstname": "Wayne",
            "lastname": "Stokeld",
            "dob": "18-August-1970",
            "mobile": "046571348",
            "email": "Wayne.Stokeld@gmail.com",
            "ff_number": 66297276
        },
        {
            "shirt": 5,
            "firstname": "Antony",
            "lastname": "Wardle",
            "dob": "28-September-1961",
            "mobile": "046571446",
            "email": "Antony.Wardle@gmail.com",
            "ff_number": 54656350
        }
    ];

    players.forEach(function (playerData) {
        playerData.domain = {
            id: req.session.domainId,
            display: req.session.domainName
        }

        Player.create(playerData, function (error, player) {
            if (error) console.log(error);
            console.log("/dd_load_players: " + JSON.stringify(player))

        });
    })
    res.send("Players loaded");
});

router.put('/dd_delete', function (req, res, next) {

    console.log("/dd_delete: " + JSON.stringify(req.session))
    let data = {};

    Game.remove({'domain.id': req.session.domainId}, function (err, resp) {

        console.log("/del loadDemoData: " + JSON.stringify(resp))
        data.games_deleted = resp.n;

        Player.remove({'domain.id': req.session.domainId}, function (err, resp) {

            console.log("/del loadDemoData: " + JSON.stringify(resp))
            data.players_deleted = resp.n;

            Vote.remove({'domain.id': req.session.domainId}, function (err, resp) {

                console.log("/del loadDemoData: " + JSON.stringify(resp))
                data.votes_deleted = resp.n;
                res.send(data)
            });
        });
    });
});

module.exports = router;

router.get('/user', function( req, res) {
    User.find({'domain.id': req.session.domainId}, function (err, data) {
        res.json(data)
    })
});

router.get('*', function(req, res){
    console.log("/root1:" + req.url + ";")

    res.send('what???', 404);
});
