const Mailgun = require('mailgun-js');

var mailgun = new Mailgun( {apiKey: process.env.MAILGUN_TEST_API, domain: "sandbox162dbbc554f24375bd48b39da41df307.mailgun.org" });

//add some validations to avoid exploits, maybe rate-limiting?

module.exports.sendMail = function(data) {
  var mailData = data || {
    from: "inventor487@gmail.com",
    to: "inventor487@gmail.com",
    subject: "blablabla.  This is a test email.  Hi, Mom.",
    html: "<h1>Hello Bob.</h1>  <p>Hope you're doing well, and thanks for joining!</p>"
  };

  mailgun.messages().send(mailData, function (err, body) {
    if(err) {
      res.render('error', { error: err});
      console.log("got an error: ", err);
    } else {
      console.log("Email sent successfully.");
    }
  });
}
