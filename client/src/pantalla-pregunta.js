import React from 'react';
import { Timer } from './grid';

export  const Pregunta = ({pregunta, time}) =>
{
    return (
        <div >
            <div style={{borderRadius:"25px", backgroundImage: "url(./bush.png)", textAlign: "center", display:"flex", alignItems:"center", justifyItems:"center", flexDirection:"column"}}>
                <h1>Pregunta:</h1>
                <h2> {pregunta} </h2>
            </div>
            <Timer time={time}></Timer>
        </div>
    )
}