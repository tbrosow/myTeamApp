# motm
# Start Mongo DB
~/Programs/mongodb/bin/mongod --dbpath ~/Programs/mongodb/db

# Start Mongo UI
cd ~/Programs/mongoui
npm run start-dev

#Mongo Client
~/Programs/mongodb/bin/mongo

~/Programs/mongodb/bin/mongo data/load.js

# Start the server
node node_modules/nodemon/bin/nodemon.js app


