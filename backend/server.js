const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Esquema de Mongoose para Juegos

const GameSchema = new mongoose.Schema({
    name: { type: String, required: true },
    genre: { type: String, required: true },
    cost: { type: Number, required: true },
});

const Game = mongoose.model('Game', GameSchema);

// Rutas CRUD
const gameRoutes = require('./routes/games');
app.use('/games', gameRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});