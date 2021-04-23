import { React, useState, useEffect } from 'react';
import { Column, Grid, } from './grid';
import {socket} from './socket';

export  const Espera = ({isHost, conectados, setId, setEstado}) =>
{

    const [pools, setPools] = useState({Normales: false, Rapidas: false, Lentas: false, Dobles: false, Random: false});

    useEffect(() =>
    {
        fetch("/pools").then(response => response.json()).then(data => setPools(data))   
  
        socket.on("set pools",  setPools)
        
        const desconectar = () => {
            debugger;
            setId(""); 
            setEstado("eligiendo");
        }
        socket.on("desconectado", desconectar)

        return () => {socket.off("set pools", setPools); socket.off("desconectado", desconectar)}
    })


    return (
        <Grid columnas={3}>
            <Column>
                {conectados.map((elem) => (<p key={elem} style={{aspectRatio:"1/1"}}> {elem} </p>))}
            </Column>
            <Column>
                <button onClick={() => {socket.emit("desconectar");}}>Cancelar</button>
                {isHost && <button onClick={() => {socket.emit("set pool", pools); socket.emit("start round")}}>Empezar</button>}
            </Column>
            <Column>
            {
                Object.keys(pools).map((elem) => {                    
                    return (
                    <button key={elem} onClick={() => {
                            if(isHost) 
                            {   
                                socket.emit("toggle pool", elem);
                            }
                        }}
                        style = {{ textDecoration: pools[elem] ? "none" : "line-through" }}
                        >
                        {elem}
                    </button>)
                })
            }
            </Column>
        </Grid>
    )
}