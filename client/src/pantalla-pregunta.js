import React, { useState } from 'react';
import { Row, Timer } from './grid';

export  const Pregunta = ({pregunta, time}) =>
{


    return (
        <div>
            <Row>
                <h1>Pregunta:</h1>
                <h2> {pregunta} </h2>
            </Row>
            <Timer time={time}></Timer>
        </div>
    )
}