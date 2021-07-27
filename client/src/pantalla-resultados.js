import { React, useState, useEffect } from 'react';
import { socket } from './socket';

export const Resultados = ({ resultados, isHost }) => {
	resultados.sort((a, b) => b.votos - a.votos);

	const max = resultados[0].votos;
	const unidad = window.innerWidth / (max + 2);

	const [quedanPreguntas, setQuedanPreguntas] = useState(false);

	useEffect(() => {
		fetch("/preguntas").then(response => response.json()).then(data => {
			setQuedanPreguntas(data.length > 0)
			console.log(data)
		})
	}, [])

	return (
		<div>
			<div style={{ display: "flex", flexDirection: "column" }}>
				{
					resultados.map((elem, idx) => {
						return (
							<div key={elem.nombre} style={{ textAlign: "center", display: "flex", flexDirection: "row", width: "100%", margin: "1em" }}>
								<p style={{ width: unidad }}>{elem.nombre + (idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : "")}</p>
								<div style={{
									width: unidad * max
								}}>
									<div style={{ width: unidad * elem.votos, height: "100%", background: "#07820b", borderRadius: "25px" }}></div>
								</div>
								<p style={{ width: unidad }}>{elem.votos}</p>
							</div>
						)
					})
				}
			</div>
			{isHost && quedanPreguntas && <button onClick={() => socket.emit("start round")}>Siguiente</button>}
		</div>
	)
}