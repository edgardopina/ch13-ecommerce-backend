const express = require('express'); // import express.js
const routes = require('./routes'); // import /api/routes for all models
const sequelize = require('./config/connection'); // import sequelize connection

const app = express(); // instanciates express
const PORT = process.env.PORT || 3001; // PORT: environment variable or default 3001

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes); // express to use /api/routes

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
   app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});
