const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../models');
const User = db.user;

function sendOtpMail(email, otp) {
    //send email of booking confirmation
    const nodemailer = require("nodemailer");
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "harshadaa1997@gmail.com", //process.env.NODEMAILER_EMAIL,
            pass: "pvrwfvhuibgplogr", //req.body.email,
        },
    });

    let mailOptions = {
        from: "harshadaa1997@gmail.com", //process.env.NODEMAILER_EMAIL,
        to: email,
        subject: "OTP verificaion for Get Stake",
        // text: `
        //         Hello from Get Stake,
        //         Verification Code=${otp}
        //         Thanks.
        //         `,
        html: `
            <div>
            <h1 style="font-size:24px">Hello From Get Stake<h1>
            <p style="font-size:18px; margin-top:50px;">Verification Code 
            <span style="padding:25px; background-color:#5bf1ff4a; font-size:36px; font-weight:900">
            ${otp}
            </span>
            </p>
            <section style= "margin-top:50px">
            <img src = "https://getstake.com/assets/stake-logo.svg" 
             style="width:100px;height:100px"/>
            </section>
            </div>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return { error: error };
        } else {
            console.log("Email sent: " + info.response);
            return { success: true, message: info.response };
        }
    });

}

router.post('/registration', async (req, res) => {
    try {
        const userData = req.body;

        //edge case if user not verified =>
        const userFoundButNotVerified = await User.findOne({ where: { email: userData.email, verified: false } });
        if (userFoundButNotVerified) {
            console.log("userFoundButNotVerified => ", userFoundButNotVerified);
            sendOtpMail(userFoundButNotVerified.email, userFoundButNotVerified.otp);
            return res.status(200).json({ success: false, message: 'email not verified' });
        }

        //edge case if email already in use =>
        const emailAlreadyInUse = await User.findOne({ where: { email: userData.email } });
        if (emailAlreadyInUse) {
            console.log("emailAlreadyInUse => ", emailAlreadyInUse);
            return res.status(200).json({ success: false, message: 'email already in use' });
        }
        const otp = parseInt(1000 + Math.random() * 9999).toString().substring(0, 4);
        userData.otp = otp;
        let password = userData.password
        const saltRounds = 10
        const salt = await bcrypt.genSalt(saltRounds)
        const hashedPassword = await bcrypt.hash(password, salt)
        password = hashedPassword
        userData.password = password;
        const registeredData = await User.create(userData);
        sendOtpMail(userData.email, otp);
        return res.status(200).json({ success: true, message: registeredData })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, error: err });
    }
})

module.exports = router;