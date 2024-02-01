var usermodel = require('../model/usermodel');
const storage = require('node-persist');
const bcrypt = require('bcrypt');
storage.init( /* options ... */);
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');


exports.login = async (req, res) => {

    var data = await usermodel.find({ "email": req.body.email });

    console.log(data);

    var login_status = await storage.getItem('user_id')

    if (login_status == undefined) {
        if (data.length == 1) {
            bcrypt.compare(req.body.password, data[0].password, async function (err, result) {
                if (result == true) {

                    var token = await jwt.sign({ id: data[0].id }, "cdmi");

                    var a = Math.floor(100000 + Math.random() * 900000);
                    console.log(a);
                    
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'sarthakvisalpara2614@gmail.com',
                            pass: 'mvrzdmrfdjxtodae'
                        }
                    });

                    var mailOptions = {
                        from: 'youremail@gmail.com',
                        to: 'myfriend@yahoo.com',
                        subject: 'Sending Email using Node.js',
                        text: 'That was easy!'
                    };

                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });




                    await storage.setItem('user_id', data[0].id)
                    res.status(200).json({
                        status: "login success",
                        token
                    })
                }
                else {
                    res.status(200).json({
                        status: "check your email and password"
                    })
                }
            });
        }
        else {
            res.status(200).json({
                status: "check your email and password"
            })
        }
    }

    else {
        res.status(200).json({
            status: "user is already login"
        })
    }
}

exports.logout = async (req, res) => {
    await storage.clear();
    res.status(200).json({
        status: "user logout"
    })
}