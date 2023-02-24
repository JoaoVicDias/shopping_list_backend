const express = require('express');
const cors = require('cors');
const { default: helmet } = require('helmet');
const { default: mongoose } = require('mongoose');
require('dotenv').config();

const errorHandler = require('./middlewares/errorHandler');
const notFound = require('./middlewares/notFound');
const routes = require('./routes/index');

const app = express();

app.use(express.json());

app.use(helmet());
app.use(cors({
  origin: '*',
  allowedHeaders: ['Content-Type'],
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
}));

app.use(routes);

app.use(errorHandler);
app.use(notFound);

mongoose.connect(process.env.DATABASE_LINK).then(() => {
  app.listen(process.env.PORT || 5000);
}).catch(() => {
});
