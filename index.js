const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
const cors = require('cors');
const port = 5000;

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.post('/sendmail', async (req, res) => {
    const emailFrom = await req.body.emailFrm;
    const password = await req.body.pass;
    const emailTo = await req.body.emailTo;
    const sub = await req.body.sub;
    const message = await req.body.msg;
    const sendername = await req.body.sendername;

    try {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: emailFrom,
                pass: password
            }
        });

        var mailOptions = {
            from: sendername + " - " + emailFrom,
            to: emailTo,
            subject: sub,
            html: message,
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