const nodemailer = require("nodemailer");

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