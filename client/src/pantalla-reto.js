import { React, useState, useEffect } from 'react';
import { socket } from './socket';

export const Reto = ({ isHost, reto }) => {

	const [quedanPreguntas, setQuedanPreguntas] = useState(false);


	useEffect(() => {
		fetch("/preguntasRestantes").then(response => response.json()).then(data => {
			setQuedanPreguntas(data > 0)
		})
	}, [])

	return (
		<div >
			<p style={{ borderRadius: "25px", top: "40%", padding: "2em", textAlign: "center", backgroundImage: "url(./bush.png)", fontSize: "larger" }}>
				<h1>Reto:</h1>
				<h2> {reto} </h2>
				{isHost && quedanPreguntas && <button onClick={() => socket.emit("start round")}>Siguiente</button>}
			</p>
		</div>
	)
}