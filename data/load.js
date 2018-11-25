try {

    conn = new Mongo();
    db = conn.getDB("gameApp");
    let domain = { id : "5bf70a043f578a554076af01", display : "Umina O35" }

    // db.games.remove({});
   // db.players.remove({});
   // db.votes.remove({});

    db.webtemplates.remove({});
    db.webtemplates.insertOne({"name":"market", html:'<div class="market-updates"> <div class="col-md-4 market-update-gd"> <div class="market-update-block clr-block-1"> <div class="col-md-8 market-update-left"> <h3>{{USERS}}</h3> <h4>Registered Players</h4> </div><div class="col-md-4 market-update-right"> <i class="fa fa-users"> </i> </div><div class="clearfix"> </div></div></div><div class="col-md-4 market-update-gd"> <div class="market-update-block clr-block-2"> <div class="col-md-8 market-update-left"> <h3>{{GAMES}}</h3> <h4>Games Played</h4> </div><div class="col-md-4 market-update-right" > <i class="fa fa-futbol"> </i> </div><div class="clearfix"> </div></div></div><div class="col-md-4 market-update-gd"> <div class="market-update-block clr-block-3"> <div class="col-md-8 market-update-left"> <h3>{{GOALS}}</h3> <h4>Goals Scored</h4> </div><div class="col-md-4 market-update-right"> <i class="fa fa-bullseye"> </i> </div><div class="clearfix"> </div></div></div><div class="clearfix"> </div></div>'})
    db.webtemplates.insertOne({"name":"menu", html:' <div class="sidebar-menu">\n' +
            '        <div class="logo"> <a href="#" class="sidebar-icon"> <span class="fa fa-bars"></span> </a> <a href="#"> <span id="logo" ></span> </a> </div>\n' +
            '        <div class="menu">\n' +
            '            <ul id="menu" >\n' +
            '                <li id="menu-home" ><a href="portal"><i class="fa fa-tachometer-alt"></i><span>Dashboard</span></a></li>\n' +
            '                <li>\n' +
            '                    <a href="#"> <i class="fab fa-hubspot"></i> <span>Manage</span> <span class="fa fa-angle-right" style="float: right"></span> </a>\n' +
            '                    <ul>\n' +
            '                        <li><a href="games">Games</a></li>\n' +
            '                        <li><a href="players">Players</a></li>\n' +
            '                    </ul>\n' +
            '                </li>\n' +
            '                <li id="menu-home" ><a href="vote321"><i class="fa fa-person-booth"></i><span>Vote 3-2-1</span></a></li>\n' +
            '                <li id="menu-home" ><a href="statistics"><i class="fas fa-flag-checkered"></i><span>Reports</span></a></li>\n' +
            '                <li id="menu-home" ><a href="properties"><i class="fas fa-cogs"></i><span>Preferences</span></a></li>\n' +
            '                <li id="menu-home" ><a href="logout"><i class="fas fa-sign-out-alt"></i><span>Logout</span></a></li>\n' +
            '            </ul>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '    <div class="clearfix"> </div>'})
    db.webtemplates.insertOne({"name":"header", html:'' +
            '<div class="header-main"> ' +
            '<div class="header-left"> <div class="logo-name"> <a href="t-index.html"> <h1>{{HEADER}}</h1> </a> </div><div class="clearfix"> </div></div>' +
            '<div class="header-right"><div class="domain-name"><a href="t-index.html"> <h1>{{DOMAIN_NAME}}</h1> </a></div></div>' +
            '<div class="clearfix"></div>' +
            '</div>'})

    db.properties.remove({});
    db.properties.insertOne({name:"page.title.vote321", value:"Vote Man of the Match"})
    db.properties.insertOne({name:"page.title.portal", value:"My Team App - Portal"})
    db.properties.insertOne({name:"page.title.players", value:"Manage Players"})
    db.properties.insertOne({name:"page.title.games", value:"Manage Games"})
    db.properties.insertOne({name:"page.title.statistics", value:"Game Reports"})
    db.properties.insertOne({name:"page.title.properties", value:"Preferences"})

    // db.domains.remove({});
    // db.domains.insertOne({name:"Umina O35"})
    // db.domains.insertOne({name:"Umina O45"})

} catch (e) {
   print (e);
};