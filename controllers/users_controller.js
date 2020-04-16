const User = require('../models/user');


module.exports.signUp = function(req,res){
    return res.render('sign_up',{
        title:"Sign Up"
    });
}


module.exports.signIn = function(req,res){
    return res.render('sign_in',{
        title:"Sign In"
    });
}

//sign up data
module.exports.createUser = function(req,res){
    if(req.body.password != req.body.confirm_password){
        console.log("check password again");
        return res.redirect("back");
    }

    User.findOne({
        email:req.body.email
    },function(err, user){
        if(err){
            console.log("error in signing up the user");
            return;
        }
        if(!user){
            User.create(req.body, function(err, user){
                if(err){
                    console.log("error in creating a user");
                    return;
                }
                return res.redirect("/users/sign-in");
            });
        }
        else{
            return res.redirect("back");
        }
    });
}

//create-session after signing in
module.exports.createSession = function(req,res){
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout();

    return res.redirect('/');
}