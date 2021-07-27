import { React, useState, useEffect } from 'react';
import { Grid, } from './grid';
import { socket } from './socket';
import { useMediaQuery } from 'react-responsive';

export const Espera = ({ isHost, conectados, setId, setEstado }) => {

    const [pool, setPool] = useState("normales");
    let [tipos, setTipos] = useState([])


    const movil = useMediaQuery({ query: "(max-width: 1224px)" });
    const portrait = useMediaQuery({ query: "(orientation: portrait)" });

    useEffect(() => {
        fetch("/pools").then(response => response.json()).then(data => setTipos(data))

        socket.on("set pool", setPool)

        const desconectar = () => {
            setId("");
            setEstado("eligiendo");
        }
        socket.on("desconectado", desconectar)

        return () => { socket.off("set pool", setPool); socket.off("desconectado", desconectar) }
    }, [setId, setEstado])


    return (
        <div>
            <Grid columnas={movil && portrait ? 2 : 5}>
                {
                    conectados.map((elem) => {
                        return (
                            <button key={elem}
                                style={{ aspectRatio: "1/1" }}>
                                {elem}
                            </button>
                        )
                    })
                }
            </Grid>
            <p>
                <button onClick={() => { socket.emit("desconectar"); }}>Cancelar</button>
                {isHost &&
                    <div>
                        <button onClick={() => { socket.emit("set pool", pool); socket.emit("start round") }}>
                            Empezar
                        </button>
                        <select onChange={(event) => { setPool(event.target.value) }}>
                            {
                                tipos.map((elem) => {
                                    return (<option key={elem}>{elem}</option>)
                                })
                            }
                        </select>
                    </div>
                }
            </p>
        </div>

    )
}