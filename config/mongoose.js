const mongoose = require('mongoose');

//make your DB
mongoose.connect(`mongodb://localhost/completeAuthenticationMock_db`);

//connect it 

const db = mongoose.connection;

db.on('error',console.log.bind(console,"Error in connecting to the DB"));

//verify it 

db.once('open',function(){
    console.log("connected to the DB complete Authentication");
});