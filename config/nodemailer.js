//this file contains nodemailer, wich is used for sending emails for various purposes

const nodemailer = require("nodemailer");

//setting up nodemailer 
let transporter = nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    post:587,
    source:false,
    auth:{
        user:'singhlavanya94',
        pass:''
    }
});

module.exports = transporter;