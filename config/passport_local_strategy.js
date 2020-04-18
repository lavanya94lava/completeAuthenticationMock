const passport = require('passport');

const localStratgy = require('passport-local').Strategy;

const User = require('../models/user');

const bcrypt = require("bcrypt");

passport.use(new localStratgy({
    usernameField: 'email',
    passReqToCallback:true
},function(req,email,password, done){
    User.findOne({email:email},function(err, user){
        if(err){
            req.flash('error',err);
            return done(err);
        }
        bcrypt.compare(password,user.password,function(err,result){
            if(err){
                req.flash("error", "Error in deciphering the password using bcrypt");
                return done(err);
            }
            if(result){
                return done(null, user);
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


passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;