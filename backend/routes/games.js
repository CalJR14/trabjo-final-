const express = require('express');
const router = express.Router();
const Game = require('../models/Game');


// GET /games
router.get('/', async (req, res) => {
try {
    const games = await Game.find().sort({ name: 1 });
    res.json(games);
} catch (error) {
    res.status(500).json({ message: 'Error al obtener juegos' });
}
});

// POST /games
router.post('/', async (req, res) => {
try {
    const newGame = new Game(req.body);
    await newGame.save();
    res.json(newGame);
} catch (error) {
    res.status(400).json({ message: 'Error al crear juego' });
}
});

// DELETE /games/:id
router.delete('/:id', async (req, res) => {
try {
    await Game.findByIdAndDelete(req.params.id);
    res.json({ message: 'Juego eliminado con éxito' });
} catch (error) {
    res.status(404).json({ message: 'Juego no encontrado' });
}
});

module.exports = router;