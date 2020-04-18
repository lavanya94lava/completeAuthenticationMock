const User = require('../models/user');
const crypto = require("crypto");
const nodemailer = require("../config/nodemailer");
const bcrypt = require('bcrypt');

module.exports.signUp = function(req,res){
    return res.render('sign_up',{
        recaptcha: res.recaptcha,
        title:"Sign Up"
    });
}

module.exports.signIn = function(req,res){
    return res.render('sign_in',{
        recaptcha: res.recaptcha,
        title:"Sign In"
    });
}

//sign up data
module.exports.createUser = async function(req,res){
    if(req.body.password != req.body.confirm_password){
        req.flash('error', "Please check your passwords again");
        return res.redirect("back");
    }

    await User.findOne({
        email:req.body.email
    },function(err, user){
        if(err){
            console.log("error in signing up the user");
            return;
        }
        if(!user){
            bcrypt.genSalt(10, function(err,salt){
                bcrypt.hash(req.body.password,salt,function(err,hash){
                    if(err){
                        req.flash("error","error in generating hash");
                        return res.redirect("back");
                    }
                     User.create({
                        name:req.body.name,
                        email:req.body.email,
                        password:hash
                    }, function(err, user){
                        if(err){
                            console.log("error in creating a user");
                            return res.redirect("back");
                        }
                        req.flash("success", "new user created successfully");
                        return res.redirect("/users/sign-in");
                    });
                });
            })
        }
        else{
            req.flash('error',"username already exists, please choose another");
            return res.redirect("back");
        }
    });
}

//create-session after signing in
module.exports.createSession = function(req,res){
    req.flash('success',"You have loggedIn Successfully");
    return res.redirect('/');
}

//sign out fucntionality
module.exports.destroySession = function(req,res){
    req.flash('success',"You have loggedOut successfully");
    req.logout();

    return res.redirect('/');
}

//forgot password form views
module.exports.forgotPassword = function(req,res){
    return res.render('forgot_password',{
        title: "Forgot Password"
    });
}

//forgot password post action
module.exports.forgotPasswordAction = async function(req,res){
    try{
        var token = crypto.randomBytes(20).toString('hex');
        var person;
        await User.findOne({email:req.body.email},function(err,user){
            if(!user){
                req.flash("error","No such user exists, please set your password accordingly");
                return res.redirect("/users/forgot-password");
            }
            user.passwordToken = token;
            user.tokenExpiry = Date.now()+ 1800000;
            console.log("person -->");
            user.save();
            person = user;
        });

        await nodemailer.sendMail({
            to:person.email,
            subject:"Password Reset Email",
            text:'Click on the link below to reset your password :\n\n' + 'http://'+ req.headers.host + '/users/reset-password/'+token + '\n\n' 
        },function(err,info){
            if(err){
                req.flash("error","Error in sending mail");
                return;
            }
            req.flash("success","message sent successfully");
            console.log("message sent -->", info);
            return res.redirect('back');
        });
    }
    catch(err){
        req.flash("error","check the function again");
        return res.redirect('/users/forgot-password');
    }   
}

//reset form view
module.exports.resetPasswordForm = function(req,res){
    return res.render('password_reset',{
        title:"Reset Password",
        token:req.params.token
    });
}

//reset password post action
module.exports.resetPasswordAction = async function(req,res){
    try{    
        await User.findOne({passwordToken:req.params.token, tokenExpiry:{$gt: Date.now()}},function(err,user){
            if(!user){
                req.flash("error","Token has expired or is not valid");
                return res.redirect("back");
            }
            if(req.body.password === req.body.confirm_password){
                 bcrypt.genSalt(10,function(err,salt){
                    bcrypt.hash(req.body.password,salt,function(err,hash){
                        if(err){
                            req.flash("error","error in creating hash");
                            return res.redirect("back");
                        }
                        user.password = req.body.password;
                        user.save();
                    });
                })
                req.flash("success","Password changed successfully");
                return res.redirect("/");
            }
            else{
                req.flash("error","Passwords did not match");
                return res.redirect("back");
            }
        });
    }   
    catch(err){
        req.flash("error","some error");
        return res.redirect("back");
    }
}

//reset password after signin in
module.exports.resetPasswordAfterSignIn = async function(req,res){
    try{    
        await User.findOne({email:req.user.email},function(err,user){
            if(!user){
                req.flash("error","Please check your email again as you were already signed in");
                return res.redirect("back");
            }
            if(req.body.password === req.body.confirm_password){
                 bcrypt.genSalt(10,function(err,salt){
                    bcrypt.hash(req.body.password,salt,function(err,hash){
                        if(err){
                            req.flash("error","error in creating hash");
                            return res.redirect("back");
                        }
                        user.password = hash;
                        user.save();
                    });
                })
                req.flash("success","Password changed successfully");
                return res.redirect("/");
            }
            else{
                req.flash("error","Passwords did not match");
                return res.redirect("back");
            }
        });
    }   
    catch(err){
        req.flash("error","some error");
        return res.redirect("back");
    }   
}