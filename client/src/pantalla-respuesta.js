import { React, useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Timer, Grid } from './grid';
import { socket } from './socket';

export const Respuesta = ({ time, conectados, setEstado }) => {
    const [respuesta, setRespuesta] = useState("");

    const movil = useMediaQuery({ query: "(max-width: 1224px)" });
    const portrait = useMediaQuery({ query: "(orientation: portrait)" });

    useEffect(() => {
        const f = () => {
            socket.emit("respuesta", respuesta);
            setEstado("resultado")
        }
        socket.once("pedir respuestas", f)

        return () => socket.off("pedir respuestas", f)
    })

    return (
        <div>
            <Timer time={time}></Timer>

            <h1>Introduce la respuesta</h1>

            <Grid columnas={movil && portrait ? 2 : 5}>
                {
                    conectados.map((elem) => {
                        return (
                            <button key={elem}
                                style={{ aspectRatio: "1/1", backgroundColor: elem === respuesta ? 'green' : 'rgb(239, 239, 239)' }}
                                onClick={() => setRespuesta(elem)}>
                                {elem}
                            </button>
                        )
                    })
                }
            </Grid>
        </div>
    )
}