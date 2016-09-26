const nodemailer = require('nodemailer')

export default function (options) {
  var transporter = nodemailer.createTransport({
    host: 'email.baidu.com',
    port: 587,
    auth: {
      user: options.username,
      pass: options.password
    }
  })

  var mailOptions = {
    from: `${options.username}@baidu.com`, // sender address
    to: options.to, // list of receivers
    cc: options.cc
    subject: options.title, // Subject line
    html: options.content // html body
  }

  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);
  });
}
