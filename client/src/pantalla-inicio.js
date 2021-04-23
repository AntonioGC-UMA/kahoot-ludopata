import { React, useState, useEffect } from 'react';
import {Grid, User} from "./grid"
import {useMediaQuery} from 'react-responsive';
import {socket} from './socket';

export const Inicio = ({personas, conectados, setId, setEstado}) =>
{
    const movil = useMediaQuery({ query : "(max-width: 1224px)"});
    const portrait = useMediaQuery({ query : "(orientation: portrait)"});

    useEffect(() =>
    {
      socket.once("conexion aceptada", (e) => 
      {
        setId(e); setEstado("esperando");
      })
    })

    return (
        <Grid columnas={movil && portrait ? 2 : 5}>
            {
                personas.map((elem) =>
                {
                    const disponible = !conectados.includes(elem);

                    return (
                        <button key={elem} 
                        onClick={() => {if(disponible) {socket.emit("conectar", elem);}}} 
                        style={{aspectRatio:"1/1",  textDecoration: disponible ? "none" : "line-through"}}>
                            {elem}
                        </button>
                    )
                })
            }  
        </Grid>
    )
}