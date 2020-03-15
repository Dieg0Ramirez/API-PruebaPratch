var express = require('express');
var app = express();

var usuarioController = require('./../controllers/UsuarioController');
var mdAutenticacion = require('./../middlewares/autenticacion');

// ==========================================
// obtener todos los usuarios
// ==========================================
app.get('/usuario/', mdAutenticacion.verificaToken, usuarioController.getUsuario);

// ==========================================
// actualizar un usuario
// ==========================================
app.put('/usuario/:id', mdAutenticacion.verificaToken, usuarioController.updateUsuario);

// ==========================================
// crear un nuevo usuarios 
// ==========================================

app.post('/usuario/', usuarioController.saveUsuario);

//============================================
// eliminar usuario
//============================================
app.delete('/usuario/:id', usuarioController.deleteUser);

module.exports = app;