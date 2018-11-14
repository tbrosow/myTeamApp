try {

    db.adminCommand('listDatabases')

    cursor = db.votes.find({_id:"5bea23ff5aa95039831ca1d1"},function(error, votes) {
        printjson( votes );
    });

    cursor = db.users.find({},function(error, votes) {
        printjson( votes );
    });


    cursor = db.users.find();
    while ( cursor.hasNext() ) {
        printjson( cursor.next() );
    }



    // db.votes.find({},function () {
        
    //})
} catch (e) {
    print (e);
};