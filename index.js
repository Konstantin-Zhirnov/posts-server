const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const postRoutes = require('./routes/post-routes');

dotenv.config();

const PORT = process.env.PORT || 80;
const app = express();

app.use(express.json());

const corsOptions = {
  origin(origin, callback) {
    callback(null, true);
  },
  credentials: true
};
app.use(cors(corsOptions));

const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'https://kostya-zhirnov.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,token');
  res.header('Access-Control-Allow-Credentials', true);
  next();
}
app.use(allowCrossDomain);

app.use(postRoutes);


const start = async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() => {
        console.log('Connected to DB!');
      }).catch((err) => {
        console.log(err.message);
      });

    app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}

start();
