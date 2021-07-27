import React from 'react';
import { Timer } from './grid';

export const Pregunta = ({ pregunta, time }) => {
    return (
        <div >
            <Timer time={time}></Timer>

            <p style={{ borderRadius: "25px", top: "40%", padding: "2em", textAlign: "center", backgroundImage: "url(./bush.png)", fontSize: "larger" }}>
                <h1>Pregunta:</h1>
                <h2> {pregunta} </h2>
            </p>
        </div>
    )
}