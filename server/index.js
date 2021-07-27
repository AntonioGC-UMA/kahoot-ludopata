
const express = require('express');
const app = express();
const http = require('http');
const path = require('path');

const PORT = process.env.PORT || 8080;

const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: { origin: "*" }
});



let retos = {}
retos["Normal"] = ["Reto CM 1", "Reto CM 2"]
retos[["Candy", "Morilla"]] = ["Reto CM 1", "Reto CM 2"]

const preguntas = {
    normales:
    {
        texto: ["Pregunta Normal 1", "Pregunta Normal 2", "Pregunta Normal 3", "Pregunta Normal 4"],
        tiempoPregunta: 5, tiempoRespuesta: 8
    },
    lentas:
    {
        texto: ["Pregunta Lenta 1", "Pregunta Lenta 2", "Pregunta Lenta 3", "Pregunta Lenta 4"],
        tiempoPregunta: 8, tiempoRespuesta: 20
    },
    //rapidas: ["Pregunta Rapida 1", "Pregunta Rapida 2", "Pregunta Rapida 3", "Pregunta Rapida 4"]
}

const usuarios = {
    Raul: { socket: null, votos: 0 },
    Carlos: { socket: null, votos: 0 },
    Elo: { socket: null, votos: 0 },
    Cabriada: { socket: null, votos: 0 },
    Kanian: { socket: null, votos: 0 },
    Morilla: { socket: null, votos: 0 },
    Candy: { socket: null, votos: 0 },
    Carmen: { socket: null, votos: 0 },
    Isa: { socket: null, votos: 0 },
    Helena: { socket: null, votos: 0 },
    Rafa: { socket: null, votos: 0 },
    Jenny: { socket: null, votos: 0 },
}



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

function shuffle(array) {
    var currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}




let tipoDePreguntas = "normales"

let setDePreguntas = []



const get_user = (socket) => {
    for (const key in usuarios)
        if (usuarios[key].socket === socket)
            return key;
    return null;
}

let conectados = []
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
    res.send(Object.keys(preguntas));
});

app.get('/resultado', (_, res) => {
    res.send(re)
});

app.get('/preguntas', (_, res) => {
    res.send(preguntas[tipoDePreguntas].texto)
});



io.on("connection", (socket) => {

    console.log("Usuario conectado")

    // Elegir personaje inicio
    socket.on("conectar", (c) => {
        console.log("seleccionado: ", c)
        if (!usuarios[c] || usuarios[c].socket) return;  // El usuario no existe o ya está conectado
        usuarios[c].socket = socket;
        conectados.push(c);
        socket.emit("conexion aceptada", c);
        io.emit("set conectados", conectados)
    })

    const onDesconectar = () => {
        const c = get_user(socket);
        console.log("des-seleccionado: ", c)
        if (c === null) return;
        usuarios[c].socket = null;
        removeA(conectados, c);
        socket.emit("desconectado");
        io.emit("set conectados", conectados)
    }

    socket.on("desconectar", onDesconectar)
    socket.on("disconnect", onDesconectar)

    // Elegir pool espera
    socket.on("set pool", (pool) => {
        tipoDePreguntas = pool
        io.emit("set pool", pool)
    })

    const recivir_voto = (votado, votador) => {
        if (!votado) console.log(votador + " no ha votado")
        else {
            usuarios[votado].votos += 1;
            console.log(votador + " ha respondido: " + votado);

            let totalDeVotos = 0
            let max = [{ nombre: conectados[0], votos: 0 }];
            for (const key in usuarios) {
                totalDeVotos += usuarios[key].votos
                if (usuarios[key].votos > max[0].votos) {
                    max = [{ nombre: key, votos: usuarios[key].votos }]
                }
                else if (usuarios[key].votos === max[0].votos) {
                    max.push({ nombre: key, votos: usuarios[key].votos })
                }
            }
            // Si ya han votado todos
            if (totalDeVotos >= conectados.length) {
                // Si hay empate
                if (max.length != 1) {
                    // Si existe reto personalizado
                    if (retos.hasOwnProperty(max)) {
                        io.emit("empate personalizado", retos[max])
                    }
                    io.emit("empate", max)
                }
            }

            io.emit("set resultados", Object.keys(usuarios).map((elem) => ({ nombre: elem, votos: usuarios[elem].votos })));
        }
    }

    // Una ronda de preguntas
    socket.on("start round", () => {

        setDePreguntas = shuffle(preguntas[tipoDePreguntas].texto)

        const contador = (left, onEnd) => {
            io.emit("time left", left);

            if (left == 0) onEnd()
            else setTimeout(() => contador(left - 1, onEnd), 1000);
        }

        io.emit("set pregunta", setDePreguntas.pop()); // Envia la prpegunta elegida a los participantes

        contador(preguntas[tipoDePreguntas].tiempoPregunta, () => {
            io.emit("timer done")
            contador(preguntas[tipoDePreguntas].tiempoRespuesta, () => {
                conectados.forEach((elem) => usuarios[elem].socket.once("respuesta", (v) => recivir_voto(v, elem)))

                Object.keys(usuarios).forEach((elem) => usuarios[elem].votos = 0); // Resetear los votos

                io.emit("set resultados", Object.keys(usuarios).map((elem) => ({ nombre: elem, votos: usuarios[elem].votos }))); // Por si nadie responde
                io.emit("pedir respuestas")
            })
        })
    })
})

server.listen(PORT, () => {
    console.log('listening on *:' + PORT);
});