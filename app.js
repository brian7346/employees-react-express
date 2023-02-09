const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT

const app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/user', require("./routes/users"));
app.use('/api/employees', require("./routes/employees"));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});