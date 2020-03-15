var mongoose = require('mongoose');

var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema
    // npm install mongoose-unique-validator --save =========== para las validaciones de correo;
var usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerida']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El email es requerida']
    },
    password: {
        type: String,
        required: [true, 'La constraseña es requerida']
    },
    genero: {
        type: String,
        required: [true, 'El genero es requerido']
    },
    fechaNacimiento: {
        type: Date,
        required: [true, 'La fecha de nacimiento es requerida']
    },
    paisNacimiento: {
        type: String,
        required: [true, 'Pais de nacimiento es requerido']
    },
    disponible: {
        type: Boolean,
        default: true
    },
});

usuarioSchema.plugin(uniqueValidator, { message: 'El email debe ser unico' });

module.exports = mongoose.model('Usuario', usuarioSchema);