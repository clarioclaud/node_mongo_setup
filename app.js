const express = require('express');
const cors = require('cors');
const config = require('./config/config');
const { connect } = require('./app/models/index');
const routeUser = require('./routes/api');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', routeUser);

connect();

app.listen(config.PORT, () => {
    console.log(`App listen in port ${config.PORT}`)
});