const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoute');


const app = express();
const port = 3000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3001', // Permitir solicitudes desde http://localhost:3001
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
  credentials: true, // Permitir credenciales
  optionsSuccessStatus: 204
}));
app.use(bodyParser.json());
app.use('/users', userRoutes);

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/mern', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
