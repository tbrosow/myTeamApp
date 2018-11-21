# motm
# Start Mongo DB
~/Programs/mongodb/bin/mongod --dbpath ~/Programs/mongodb/db

# Start Mondo UI
cd ~/Programs/mongoui
npm run start-dev

#Mongo Client
~/Programs/mongodb/bin/mongo

~/Programs/mongodb/bin/mongo data/load.js

# Start the server
node node_modules/nodemon/bin/nodemon.js app


<canvas id="bar" height="600" width="800" ></canvas>

<div class="form-group">
                                <label for="gameSelector">Game:</label>
                                <select id="game" class="form-control">
                                    <option disabled selected value> -- Select a game -- </option>
                                    <%
                                    games.forEach(function(game) {

                                    %> <option value="<%= game._id %>"> <%= game.number %> <%= game.oponent %> <%= game.gameday %> </option> <%
                                    });
                                    %>
                                    <option value="all">Overall Standing</option>
                                </select>
                            </div>

