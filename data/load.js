try {

   db.games.remove({})
   db.games.insertOne( {goalsScored:1, number:1,location:"Hilton More Oval", homeGame:false, gameday:"08.04.2019", result:"1:1", oponent: "Woy Woy II" } );
   db.games.insertOne( {number:2,location:"Hilton More Oval", homegame:true, gameday:"28.04.2019", result:"2:1", oponent: "Woy Woy I" } );
   db.games.insertOne( {number:3,location:"Hilton More Oval", homegame:false, gameday:"18.04.2019", result:"1:2", oponent: "Woy Woy II" } );
   db.games.insertOne( {number:4,location:"Hilton More Oval", homegame:true, gameday:"04.04.2019", result:"1:3", oponent: "Woy Woy I" } );
   db.games.insertOne( {number:5,location:"James Brown",      homegame:true, gameday:"02.04.2019", result:"2:3", oponent: "Ettalong I" } );
   db.games.insertOne( {number:6,location:"James Brown",      homegame:false, gameday:"03.04.2019", result:"3:3", oponent: "Ettalong I" } );
   db.games.insertOne( {number:7,location:"James Brown",      homegame:true, gameday:"04.04.2019", result:"2:1", oponent: "Ettalong I" } );
   db.games.insertOne( {number:8,location:"James Brown",      homegame:false, gameday:"05.04.2019", result:"", oponent: "Ettalong I" } );

   db.players.remove({})
   db.players.insertOne({shirt:15,firstname:"Steve",lastname:"Austin",dob:"25 Jul 69 (49)",mobile:"431 503995",email:"austeve69@yahoo.com.au"   } );
   db.players.insertOne({shirt:18,firstname:"Mark",lastname:"Bowers",dob:"13 Apr 68 (50)",mobile:"467 008022",email:"Mark.bowers@bristile.com.au"   } );
   db.players.insertOne({shirt:8,firstname:"Paul",lastname:"Brandham",dob:"15 Mar 65 (53)",mobile:"497 645694",email:"fionabr@tpg.com.au"   } );
   db.players.insertOne({shirt:11,firstname:"Torsten",lastname:"Brosow",dob:"22 Dec 68 (50)",mobile:"423 539959",email:"torsten.brosow@gmail.com"   } );
   db.players.insertOne({shirt:10,firstname:"Mark",lastname:"Croft",dob:"2 Jul 76 (42)",mobile:"419 020776",email:"ihavefancypants@hotmail.com"   } );
   db.players.insertOne({shirt:19,firstname:"Adam",lastname:"Dabin",dob:"7 Feb 73 (45)",mobile:"404 005704",email:"adamdabin@gmail.com"   } );
   db.players.insertOne({shirt:14,firstname:"Paul",lastname:"Darbin",dob:"10 Mar 70 (48)",mobile:"438 514643",email:"darbinpaulm@hotmail.com"   } );
   db.players.insertOne({shirt:7,firstname:"Luigi",lastname:"Genovese",dob:"2 Sep 70 (48)",mobile:"421 413059",email:"cazgigi@gmail.com"   } );
   db.players.insertOne({shirt:12,firstname:"Brett",lastname:"Green",dob:"24 Apr 72 (46)",mobile:"414 983 116",email:"brett_green@autofire.com.au"   } );
   db.players.insertOne({shirt:6,firstname:"Anthony",lastname:"Johnson",dob:"29 Jul 71 (47)",mobile:"408 367261",email:"anthonyjohnson1@optusnet.com.au"   } );
   db.players.insertOne({shirt:17,firstname:"Darren",lastname:"Kimber",dob:"9 Mar 71 (47)",mobile:"427 179412",email:"darren@kimbers.info"   } );
   db.players.insertOne({shirt:3,firstname:"Robert",lastname:"McLeod",dob:"22 Jun 71 (47)",mobile:"402 303341",email:"robert.mcleod@kuehne-nagel.com"   } );
   db.players.insertOne({shirt:20,firstname:"Jon",lastname:"Williams",dob:"22 Aug 83 (35)",mobile:"491 097840",email:"oldjackhart@yahoo.com.au"   } );
   db.players.insertOne({shirt:16,firstname:"Gavin",lastname:"Robinson",dob:"18 Dec 74 (44)",mobile:"437 270588",email:"gbr@exemail.com.au"   } );
   db.players.insertOne({shirt:9,firstname:"Stephen",lastname:"Shields",dob:"22 Nov 63 (55)",mobile:"418 276797",email:"steve.shields@billbergia.com.au"   } );
   db.players.insertOne({shirt:1,firstname:"Darren",lastname:"Sloane",dob:"23 Jul 65 (53)",mobile:"427 754940",email:"itsasloaney@bigpond.com"   } );
   db.players.insertOne({shirt:2,firstname:"Wayne",lastname:"Stokeld",dob:"3 Oct 72 (46)",mobile:"404 023348",email:"stokes1072@outlook.com"   } );
    db.players.insertOne({shirt:5,firstname:"Antony",lastname:"Wardle",dob:"17 Jan 67 (51)",mobile:"402 792446",email:"antonywardle@gmail.com"  });

    db.votes.insertOne({games:1});

} catch (e) {
   print (e);
};