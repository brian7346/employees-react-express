const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');
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

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();

  app.use(express.static(path.join(__dirname,'client/build')));
  
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
} else {
  app.get('/', (req, res) => res.send('Server is started'))
}

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});