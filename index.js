const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const { sequelize } = require('./models');
const authRoute = require('./route/authRoute');
app.use(express.json());
app.use(cors());
// sequelize.sync({ force: true });
app.use('/', authRoute);
app.use((err, req, res, next) => {
  res.status(404).json({ message: err });
});

let port = process.env.PORT || 9999;
app.listen(port, () => console.log(`Server is Running on port ${port}`));
