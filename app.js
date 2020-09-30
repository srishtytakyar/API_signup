const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();

app.use(express.static('Public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', function (req, res) {
  var firstname = req.body.fname;
  var lastname = req.body.lname;
  var email = req.body.email;
  var data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge: {
          FNAME: firstname,
          LNAME: lastname,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);
  const url = 'https://us2.api.mailchimp.com/3.0/lists/27e9893aee';
  const options = {
    method: 'POST',
    auth: 'srishty:3d7e720ff97f9dd057a31d86e0bcec43-us2',
  };
  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(
        'https://srishtytakyar.github.io/API_signup/files/index.html'
      );
    } else {
      res.sendFile(
        'https://srishtytakyar.github.io/API_signup/files/failure.html'
      );
    }

    response.on('data', function (data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});

app.post('/failure', function (req, res) {
  res.redirect('/');
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.listen(3000, function () {
  console.log('started');
});
//3d7e720ff97f9dd057a31d86e0bcec43-us2
//27e9893aee
