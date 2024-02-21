const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
app.use(bodyParser.json());

app.get('/sendmail', (req, res) => {
    const emailFrom = req.body.emailFrm;
    const password = req.body.pass;
    const emailTo = req.body.emailTo;
    const sub = req.body.sub;
    const message = req.body.msg;

    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: emailFrom,
            pass: password
        }
    });

    var mailOptions = {
        from: emailFrom,
        to: emailTo,
        subject: sub,
        text: message
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    res.json({msg:"done"}).status(200);
})

app.listen(port, () => {
    console.log("server started");
})