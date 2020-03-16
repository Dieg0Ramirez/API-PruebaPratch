'use strict'
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//Inicializar variable
var app = express();

//CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", " GET, POST, PUT, OPTIONS,DELETE");
    next();
});
//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//importar rutas
var usuarioRouter = require('./routes/usuarioRouter');
var loginRouter = require('./routes/login')

//conexion a la base de datos

var hostMongo = 'localhost';
var portMongo = '27017';

// mongoose.connection.openUri(`mongodb://${hostMongo}:${portMongo}/prueba`, (err, res) => {
//     if (err) throw err;
//     console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');
// });
mongoose.connect('mongodb+srv://PruebaPratech:PruebaPratech@cluster0-ivxnt.mongodb.net/PruebaPratech?retryWrites=true&w=majority', {
        useNewUrlParser: true,
    }, ).then(() => console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online'))
    .catch(() => console.log('Error connection'))

//rutas
app.use('/api/', usuarioRouter);
app.use('/api/', loginRouter);


var io = require('socket.io').listen(app.listen(3000, () => {
    console.log('Corriendo puerto 3000: \x1b[32m%s\x1b[0m', 'online');
}), { log: false, origins: '*:*' });
mongoose.set('useCreateIndex', true)
io.sockets.on('connection', function(socket) {
    console.log('Cliente de Socket Conectado');
});

app.set('socketio', io);