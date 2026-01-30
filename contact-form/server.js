const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Serve index.html from project root
app.use(express.static(path.join(__dirname, '..')));

// Handle form submission
app.post('/send-mail', async (req, res) => {
  const { name, email, subject, message } = req.body;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'yourgmail@gmail.com',   // replace with your Gmail
      pass: 'your-app-password'      // use App Password if 2FA enabled
    }
  });

  let mailOptions = {
    from: email,
    to: 'ronops@gmail.com',
    subject: subject || `New Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send('Message sent successfully!');
  } catch (error) {
    console.error(error);
    res.send('Error sending message.');
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});