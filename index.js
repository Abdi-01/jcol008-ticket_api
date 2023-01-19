const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const PORT = process.env.PORT || 2000;
const app = express();

const cors = require('cors');
const bearerToken = require('express-bearer-token');
const { checkSequelize } = require('./src/config/db');

app.use(cors());
app.use(bearerToken());

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('<h1>TICKET API</h1>');
});

// CHECK DB CONNECTION
checkSequelize();

// ROUTING LIST
const { usersRouter } = require('./src/routers');
app.use('/users', usersRouter);

app.listen(PORT, () => console.log(`RUNNING API at ${PORT} ✅`));