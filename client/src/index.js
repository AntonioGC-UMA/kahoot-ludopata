import { React, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Inicio } from "./pantalla-inicio"
import { Espera } from "./pantalla-espera"
import { Resultados } from "./pantalla-resultados"
import { Pregunta } from './pantalla-pregunta';
import { Respuesta } from './pantalla-respuesta';
import { socket } from './socket';
import { Reto } from './pantalla-reto';


const App = () => {
  const [personas, setPersonas] = useState([]);
  const Host = "Carlos"

  const [id, setId] = useState("");
  const [pregunta, setPregunta] = useState("");
  const [reto, setReto] = useState("");
  const [resultados, setResultados] = useState([]);
  const [empatados, setEmpatados] = useState([]);
  const [estado, setEstado] = useState("eligiendo");
  const [conectados, setConectados] = useState([]);

  const [time, setTime] = useState(5)

  useEffect(() => {

    fetch("/usuarios").then(response => response.json()).then(data => setPersonas(data))

    window.onbeforeunload = () => {
      socket.disconnect()
    }

    socket.on("set conectados", (c) => {
      setConectados(c)
    })

    socket.on("time left", (t) => {
      setTime(t)
    })
    socket.on("timer done", () => {
      setEstado("respuesta")
    })


    socket.on("set pregunta", (p) => {
      setPregunta(p)
      setEstado("pregunta")
    })
    socket.on("set resultados", (res) => {
      setResultados(res)
    })
    socket.on("set empatados", (res) => {
      setEmpatados(res)
    })
    socket.on("set reto", (res) => {
      setReto(res)
      setEstado("reto")
      setEmpatados([]) // Lo reseteo aqui porque ya tenemos el reto y si no vuelve a salir el boton otra vez 
    })
  }, []);

  if (estado === "eligiendo") return (<Inicio personas={personas} conectados={conectados} setId={setId} setEstado={setEstado}></Inicio>)
  if (estado === "esperando") return (<Espera conectados={conectados} isHost={id === Host} setId={setId} setEstado={setEstado}></Espera>)
  if (estado === "pregunta") return (<Pregunta pregunta={pregunta} time={time}></Pregunta>)
  if (estado === "respuesta") return (<Respuesta time={time} conectados={personas} setEstado={setEstado}></Respuesta>)
  if (estado === "resultado") return (<Resultados resultados={resultados} empatados={empatados} isHost={id === Host}></Resultados>)
  if (estado === "reto") return (<Reto reto={reto} isHost={id === Host}></Reto>)
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);