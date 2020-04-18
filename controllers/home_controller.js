// this file contains the controller which would be used to render the first page when the project loads
const User = require("../models/user");

//
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