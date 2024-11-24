const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/dbConfig');
require('dotenv').config();

const app = express();

dbConnection(process.env.MONGODB_URI);

const PORT = 4000;

app.use( express.static('public'))

app.use( cors() );

app.use( express.json() );

app.use('/api/auth', require('./routes/auth.routes'))

app.listen(PORT, () => {
    console.log(`App Running on port ${PORT}`);
})

