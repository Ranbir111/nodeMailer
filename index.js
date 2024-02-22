const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
const cors = require('cors');
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post('/sendmail', (req, res) => {
    const emailFrom = req.body.emailFrm;
    const password = req.body.pass;
    const emailTo = req.body.emailTo;
    const sub = req.body.sub;
    const message = req.body.msg;
    const sendername = req.body.sendername;

    try {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: emailFrom,
                pass: password
            }
        });

        var mailOptions = {
            from: sendername,
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
        res.json({ msg: "done" }).status(200);
    } catch (error) {
        res.json(error).status(500);
    }

})

app.listen(port, () => {
    console.log("server started");
})