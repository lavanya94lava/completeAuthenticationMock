const User = require("../models/user");

module.exports.home = async function(req,res){

    try{
        return res.render('home',{
            title: "title"
        });
    }
    catch(err){
        console.log('Error is', err);
        return;
    }
}