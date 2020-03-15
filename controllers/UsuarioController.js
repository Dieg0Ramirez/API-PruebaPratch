var express = require('express');
var app = express();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
usuarioModel = require('./../models/UsuarioModel')



function getUsuario(req, res) {

    usuarioModel.find({}, 'nombre email rol disponible genero fechaNacimiento paisNacimiento').exec(
        (err, usuarios) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando usuarios',
                    errors: err
                });
            }

            usuarioModel.count({}, (err, conteo) => {
                res.status(200).json({
                    ok: true,
                    usuarios: usuarios,
                    otros: req.usuario,
                    total: conteo,
                });

            });

        });
}

function saveUsuario(req, res) {
    var body = req.body;
    var usuario = new usuarioModel({
        nombre: body.nombre,
        email: body.email,
        genero: body.genero,
        fechaNacimiento: body.fechaNacimiento,
        paisNacimiento: body.paisNacimiento,
        password: bcrypt.hashSync(body.password, 10),
    });
    console.log(body);

    usuario.save((err, usuarioGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear usuario',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            usuario: usuarioGuardado,
            usuariotoken: req.usuario
        });
    });
}

function updateUsuario(req, res) {

    var id = req.params.id
    var body = req.body;

    usuarioModel.findByIdAndUpdate(id, body, { new: true }, (err, usuario) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: 'el usuario con el id ' + id + ' no existe',
                errors: err
            });
        }
        usuario.nombre = body.nombre;
        usuario.save((err, usuarioGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar usuario',
                    errors: err
                });
            }

            usuarioGuardado.password = '🙂'; // se mostrar esto como la contraseña, pero solo es en la respuesta del guardado

            res.status(200).json({
                ok: true,
                usuario: usuarioGuardado
            });

        });

    });
}

function deleteUser(req, res) {
    var id = req.params.id;
    usuarioModel.findByIdAndDelete(id, (err, deleteUserId) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al elinar el usuario',
                errors: err
            });
        }

        if (!deleteUserId) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id ' + id + ' no existe',
                errors: err
            });
        }
        res.status(200).json({
            ok: true,
            message: 'El siguiente usuario fue elininado correctamente',
            usuario: id
        });
    });
};


module.exports = {
    saveUsuario: saveUsuario,
    getUsuario: getUsuario,
    updateUsuario: updateUsuario,
    deleteUser: deleteUser
}