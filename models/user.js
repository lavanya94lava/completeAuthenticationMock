const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    passwordToken:{
        type:String
    },
    tokenExpiry:{
        type:Date
    }
},{
    timestamps:true
});

const User = mongoose.model('User',userSchema);

module.exports = User;