import { React, useState, useEffect } from 'react';
import { Timer } from './grid';
import { socket } from './socket';

export const Respuesta = ({ time, personas, setEstado }) => {
    const [respuesta, setRespuesta] = useState("");

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
            <ul>
                {
                    personas.map((elem) => {
                        return (
                            <li key={elem}>
                                <button onClick={() => setRespuesta(elem)} style={{ color: elem === respuesta ? 'green' : 'black' }}>
                                    {elem}
                                </button>
                            </li>)
                    })
                }
            </ul>
        </div>
    )
}