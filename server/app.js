const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const path = require('path');
const http = require('http');

const config = require('./config');
const socketIO = require('./scripts/socketio');
const webhook = require('./controllers/webhook');
const api = require('./routes');
const request = require('request');
const sharp = require('sharp');
const UserModel = require('./models/userModel');

mongoose
  .connect(config.MongoURL)
  .then(async () => {
    await UserModel.updateMany({}, { $set: { socketId: [] } });
    console.log('MONGODB connected!');
  })
  .catch(console.log);

const app = express();
const server = http.createServer(app);
socketIO.init(server);
app.set('io', socketIO.getSocketIO());
app.set('view engine', 'ejs');
app.use(cors({ origin: '*' }));
app.post(
  '/stripe/webhook',
  express.raw({ type: 'application/json' }),
  webhook.index,
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(express.static(`${__dirname}/public`));

app.use("/image/:token/:filename", (req, res) => {
  const { token, filename } = req.params;
  const { w, h } = req.query;
  const url = `https://cl.imagineapi.dev/assets/${token}/${filename}`;
  if (w && h) {
    request({ url, encoding: null }, (err, response, body) => {
      if (err || res.statusCode !== 200) {
        console.log("Error:", err || res.statusCode);
        return;
      }

      sharp(body)
        .resize(Number(w), Number(h))
        .toBuffer()
        .then((data) => {
          res.writeHead(200, {
            "Content-Type": "image/jpeg",
            "Content-Length": data.length,
          });
          res.end(data);
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send("Internal Server Error");
        });
    });
  } else {
    req.pipe(request(url)).pipe(res);
  }
});

app.use('/api', api);
app.get('/*', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

// Handle errors.
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, async () => {
  console.log(`Server is running on port : ${PORT}`);
});
