const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const indexRoutes = require('./routes/index');

dotenv.config();

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.use('/', authRoutes);
app.use('/', indexRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, (err) => {
    if (err) {
      console.log("Error in starting Node.js server");
    } else {
      console.log(`Server is running on port ${PORT}`);

      // Set up keep-alive ping
      setInterval(() => {
        app.fetch(`http://localhost:${PORT}/keep-alive`)
          .then(response => {
            console.log("Keep-alive ping successful:", response.data);
          })
          .catch(error => {
            console.error("Keep-alive ping failed:", error);
          });
      }, 300000); // Ping every 5 minutes
    }
});
