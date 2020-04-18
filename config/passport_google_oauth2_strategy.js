const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


passport.use(new googleStrategy({
    clientID:"947498779648-1d5qss42olaueurfno0di2ol4gsps2j9.apps.googleusercontent.com",
    clientSecret:"BprRPykIHDq42UTwDHo5Xfgf",
    callbackURL:"http://localhost:8000/users/auth/google/callback"
},
function(accessToken,refreshToken, profile, done){
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
        if(err){
            console.log("Error in google-Oauth-Strategy",err);
            return;
        }
        if(user){
            return done(null,user);
        }
        else{
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                passport:crypto.randomBytes(20).toString("hex")
            },function(err, user){
                if(err){
                    console.log("error in creating user google strategy",err);
                    return;
                }
                else{
                    return done(null,user);
                }
            });
        }
    }
    )
}));