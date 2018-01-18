var Mailgun = require('mailgun-js');

var mailgun = new Mailgun( {apiKey: process.env.MAILGUN_TEST_API, domain: "sandbox162dbbc554f24375bd48b39da41df307.mailgun.org" });

module.exports.sendMail = function(data) {
  mailgun.messages().send(data, function (err, body) {
    //If there is an error, render the error page
    if (err) {
      res.render('error', { error : err});
      console.log("got an error: ", err);
    }
    //Else we can greet    and leave
    else {
      //Here "submitted.jade" is the view file for this landing page 
      //We pass the variable "email" from the url parameter in an object rendered by Jade
      res.render('submitted', { email : req.params.mail });
      console.log(body);
    }
  });
}
