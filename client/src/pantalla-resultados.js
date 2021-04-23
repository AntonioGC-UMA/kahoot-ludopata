import { React } from 'react';
import {Grid} from "./grid"
import {useMediaQuery} from 'react-responsive';
import {socket} from './socket';

export const Resultados = ({resultados, isHost}) =>
{
    const movil = useMediaQuery({ query : "(max-width: 1224px)"});
    const portrait = useMediaQuery({ query : "(orientation: portrait)"});

    return (
		<div>
			<Grid columnas={movil && portrait ? 2 : 5}>
				{
					resultados.map((elem) =>{
						return (
							<p key={elem.nombre}>{elem.nombre + " " + elem.votos}</p>
						)
					})
				}  
			</Grid>
			{isHost && <button onClick={() => socket.emit("start round")}>Siguiente</button>}
		</div>
    )
}