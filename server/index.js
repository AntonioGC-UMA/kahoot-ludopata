const express = require('express');
const app = express();
const http = require('http');
const path = require('path');

const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: { origin: "*" }
});


//let usuarios = [{"Cabriada":{ foto:null, socket:null}}];
//let pool = "";
//let cont = 0;
///let respuestas = {}


function removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax = arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}


//const usuarios = ["Raul", "Carlos", "Elo", "Cabriada", "Kanian", "Morilla", "Candy", "Carmen", "Dan", "Isa"];

const usuarios = {
    Raul: {socket:null, votos:0},
    Carlos: {socket:null, votos:0},
    Elo: {socket:null, votos:0},
    Cabriada: {socket:null, votos:0},
    Kanian: {socket:null, votos:0},
    Morilla: {socket:null, votos:0},
    Candy: {socket:null, votos:0},
    Carmen: {socket:null, votos:0},
    Dan: {socket:null, votos:0},
    Isa: {socket:null, votos:0},
}

const get_user = (socket) =>
{
    for (const key in usuarios) 
        if (usuarios[key].socket === socket) 
            return key;
    return null;
} 

let conectados = [];
const pools = {Normales: false, Rapidas: false, Lentas: false, Dobles: false, Random: false};
const build_path = path.join(__dirname, '../client/build')
const index_path = path.join(build_path, 'index.html')

app.use(express.static(build_path));

app.get('/', (_, res) => {
    res.sendFile(index_path);
});

app.get('/usuarios', (_, res) => {
    res.send(Object.keys(usuarios));
});

app.get('/conectados', (_, res) => {
    res.send(conectados);
});

app.get('/pools', (_, res) => {
    res.send(pools);
});

app.get('/resultado', (_, res) =>{
    res.send(re)
});



io.on("connection", (socket) => {

    console.log("Usuario conectado")

    socket.emit("set usuarios", usuarios)

    // Elegir personaje inicio
    socket.on("conectar", (c) => {
        console.log("seleccionado: ", c)
        if(!usuarios[c] || usuarios[c].socket) return;  // El usuario no existe o ya está conectado
        usuarios[c].socket = socket;
        conectados.push(c);
        socket.emit("conexion aceptada", c);
        io.emit("set conectados", conectados)
    })

    const onDesconectar = () => {
        const c = get_user(socket);
        console.log("des-seleccionado: ", c)
        if(c === null) return;
        usuarios[c].socket = null;
        removeA(conectados, c);      
        socket.emit("desconectado");   
        io.emit("set conectados", conectados)
    }

    socket.on("desconectar", onDesconectar)
    socket.on("disconnect", onDesconectar)

    // Elegir pool espera
    socket.on("toggle pool", (pool) => {
        pools[pool] = !pools[pool];
        io.emit("set pools", pools)
    })

    const recivir_voto = (votado, votador) => {
        if(!votado) console.log(votador + " no ha votado")
        else
        {
            usuarios[votado].votos += 1;
            console.log(votador + " ha respondido: " + votado); 

            io.emit("set resultados", Object.keys(usuarios).map((elem) => ({nombre:elem, votos:usuarios[elem].votos})));
        }        
    }

    // Contador preguntas
    socket.on("start round", () => {

        const contador = (left, onEnd) => {
            io.emit("time left", left);

            if (left == 0) onEnd()
            else setTimeout(() => contador(left - 1, onEnd), 1000);
        }

        io.emit("set pregunta", "Texto pregunta");

        contador(5, () => {                 //  Muestra pregunta durante 5 segundos
            io.emit("timer done")
            contador(5, () => 
            {
                conectados.forEach((elem) => usuarios[elem].socket.once("respuesta", (v) => recivir_voto(v, elem))) 
                io.emit("pedir respuestas") //  Te da 5 segundos para responder
            })
        })
    })   
})

server.listen(8080, () => {
    console.log('listening on *:8080');
});