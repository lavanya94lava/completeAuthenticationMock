//this file contains the local strategy for authentication using passport

const passport = require('passport');

const localStratgy = require('passport-local').Strategy;

const User = require('../models/user');

//used for hashing of our password
const bcrypt = require("bcrypt");

passport.use(new localStratgy({
    usernameField: 'email',
    passReqToCallback:true
},function(req,email,password, done){
    if (req.recaptcha.error) {
        req.flash("error","Captcha Error");
        return res.redirect("back");
    } 
    User.findOne({email:email},function(err, user){
        if(err){
            req.flash('error',err);
            return done(err);
        }
        bcrypt.compare(password,user.password,function(err,isMatch){
            if(err){
                req.flash("error", "Error in deciphering the password using bcrypt");
                return done(err);
            }
            if(isMatch){
                if(user.isVerified){
                    return done(null, user);
                }
            }

            req.flash("error","Invalid Password or couldn't decipher it using bcypt");
            return done(null,false);
        });
    })
}));


passport.serializeUser(function(user,done){
    done(null,user.id);
});


passport.deserializeUser(function(id, done){
    User.findById(id,function(err, user){
        if(err){
            console.log("Error in passport");
            return done(err);
        }
        return done(null,user);
    })
});


passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }

    return res.redirect('/users/sign-in');
} 

//set the user in locals so that we could use it for authentication purposes
passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;