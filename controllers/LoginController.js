var express = require('express');
var app = express();
var bcrypt = require('bcryptjs');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
usuarioModel = require('../models/UsuarioModel');
var SEED = require('../config/config').SEED;


function createLogin(req, res) {

    var body = req.body;
    // {email: body.email} = condicion de busqueda
    usuarioModel.findOne({ email: body.email }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error al buscar usuarios',
                errors: err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                message: 'credenciales incorrectas',
                errors: err
            });
        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                message: 'credenciales incorrectas',
                errors: err
            });
        }

        // crear un token 
        usuarioDB.password = '🙂';
        var token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 14400 }); // 4 horas

        res.status(200).json({
            ok: true,
            usuario: usuarioDB,
            token: token,
            id: usuarioDB._id
        });
    });
}
module.exports = {
    createLogin: createLogin
}