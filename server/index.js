
const express = require('express');
const app = express();
const http = require('http');
const path = require('path');

const PORT = process.env.PORT || 8080;

const server = http.createServer(app);
const io = require('socket.io')(server, {
	cors: { origin: "*" }
});

function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}


let retos = {}
retos["Normal"] = ["Alguien ajeno dice algo que dibuja. En 1 minuto el mejor dibujo a ojos del público gana.",
	"Pelea en el borde de la piscina, pierde el que caiga primero al agua.",
	"Toques con el balón de volley gana quién de más toques.",
	"Gana quién aguante más la respiración.",
	"Jugar al pollito inglés ese.",
	"Dos personas se ponen mirándose con la boca llena de agua, el resto debe intentar hacerles reír para que escupa el agua.",
	"A ver quién aguanta más haciendo el baile ruso de cuclillas."
]
retos["CandyElo"] = ["Guitarra Master (A elección del populacho deberán aprenderse ambos una canción a guitarra en 4 min).",
	"El Bisho Juego (Ganará aquel que sea capaz de escribir más “sonidos” de bichos del Hollow Knight. En caso de empate gana quien los “interprete mejor”)"
]
retos["CandyRaul"] = ["Metal Rainbows (A elección de ambos se elegirá canción de Heavy Metal y deberán 'interpretarla'. Quien haga mejor 'actuación' gana)",
	"El camino del Metal (Gana aquella persona que escriba más grupos de Heavy Metal. En caso de empate gana quien sepa más integrantes de grupos)"
]
retos["CandyCarlos"] = ["Wilfredo, el Cartografo (Ambos deberán dibujar el mapa de Hollow Knight lo mejor posible en 3 minutos. Eloy valorará cuál es el mejor).",
	"Una del club (Ganará aquella persona que escriba la letra del opening de las Winx Club con menos errores o carencias, en caso de empate gana quien acabe antes)"
]
retos["CabriadaCandy"] = ["2X2 no es cuatro (Gana aquella persona que resuelva el cubo 2X2 en menos tiempo)."]
retos["CandyIsa"] = ["Hey Adora (Tienen 4 minutos para prepararse una imitación de un personaje de Shera. Raúl, Elo y Carlos valoraran).",
	"Rompecristales (Gana aquella persona que alcance un sonido más alto. Warning Loud Noise)"
]
retos["CandyCarmen"] = ["Adriana será una diseñadora famosa (Deberán reinventar un diseño del traje de Lady Lal, a votación del populacho se elegirá la ganadora)"]
retos["CandyMorilla"] = ["Dibujo Técnico II (Deberán ambos dibujar un plano del campo de Cabriada lo más exacto posible)"]
retos["EloRaul"] = ["HistoriAns (A elección del grupo, deberán explicar un acontecimiento histórico. Quien lo “explique mejor” gana)."]
retos["CarlosElo"] = ["Hesitation is defeat (Aquel que se pase un Boss con menos golpes).",
"Pulso Jagger (Hacer un pulso con los guantes de boxeo puestos)"
]
retos["CabriadaElo"] = ["La Pietat (Gana aquel que pueda aguantar con el presentador más tiempo en brazos)",
" Pan y Carne (Deberán elaborar una carta de restaurante con platos que solo ellos pudieran comer. Ganara aquella carta que de menos pena)"
]
retos["EloIsa"] = ["Maldito Llorica (Gana quien raje más basto de Neruda).",
"Eres bajita (Durante 20 minutos, Elo tendrá que estar a la altura de Isa e Isa a la de Elo)"
]
retos["CarmenElo"] = [""] // TODO
retos["EloMorilla"] = ["Lo juego todo el día (Aquel que haga el mejor baile del Fortnite).",
"“?” (Morilla gankeo la Midlane y salió mal. Deben discutir improvisando que ocurrió lo más agresivo posible. El más convincente gana)"
]
retos["CarlosRaul"] = ["El debate interminable (Carlos y Raúl deberán retomar una de sus discusiones más absurdas y continuarlo. El populacho decidirá el vencedor).",
	"Besto Frendo (El populacho elaborará 10 preguntas simples genéricas sobre personas. Gana aquel que acierte más sobre qué respondería el otro)"
]
retos["CabriadaRaul"] = ["YouTube Master (Deberán exponer ante el populacho un dato curioso que sepan, el que más guste gana).",
	"You Fucking Donkey (Escogen a alguien a quien deberán roastear durante un minuto por ser imbécil, quien destroce más emocionalmente al sujeto gana)"
]
retos["IsaRaul"] = ["Como debió haber ocurrido (Tanto Raúl como Isa escenificarán un intento de “declaración”, el más bonito gana)."]
retos["CarmenRaul"] = ["C₂H₆O y Sodio (Deberán seleccionar un objetivo y decirle algo con el objetivo de hacerle llorar, aquel que afecte más al objetivo gana)"]
retos["MorillaRaul"] = ["Jar Jar Sith (Deberán recrear el diálogo final de Anakin y Obi Wan en la Venganza de los Sith, el que más guste gana)."]
retos["CabriadaCarlos"] = ["Flexeo definitivo (Carlos y Cabriada deberán rememorar una serie completa de sus ejercicios del piso, aquel que “gane” en más actividades será nombrado vencedor)."]
retos["CarlosIsa"] = ["Windmill Poetry (Se elegirá un poema y ambos deberán recitarlo de la forma más épica posible).",
"Letrasados just wanna have fun (Cabriada y Candi expondrán a los participantes una complicada ecuación matemática o química, quien más entiende gana)"
]
retos["CarlosCarmen"] = ["Yo me quedo a Pipo (Deberán escenificar una pelea en los juzgados mientra se procesa su matrimonio, aquel que parezca que tiene más derecho a quedarse todos los bienes gana).",
"Stand Proud (Se deben escribir todas las cartas del Tarot en un papel, el que acabe antes y con menos errores gana)"
]
retos["CarlosMorilla"] = ["Dame Dame (Escogen un opening popular, el que más se adecue a la letra en japonés gana)"]
retos["CabriadaIsa"] = [""] // TODO
retos["CabriadaCarmen"] = [""] // TODO
retos["CabriadaMorilla"] = ["El señor de las moscas (Deberán describir el manga o doujinshi más raro que han leído, el que más eche para atrás al populacho gana)"]
retos["IsaCarmen"] = [""] // TODO
retos["IsaMorilla"] = ["Cringe God/Godess (Dirán la frase más perturbada que se les ocurra y supongo que ese es el ganador)"]
retos["CarmenMorilla"] = [""] // TODO


const preguntas = {
	normales:
	{
		texto: ["¿Quién es el/la más rapid@?", "¿Quién es el/la más inteligente?", "¿Quién es el/la más resistente?", "¿Quién es el/la más zorrón?", "¿Quién es el/la más rata?", "¿Quién es el/la más creativ@?", "¿Quién es el/la más THICC?", "¿Quién es el/la más epicard@", "¿Quién es el/la más fanboy/girl?", "¿Quién es el/la más deportista?", "¿Quién es el/la más extremista radical?", "¿Quién es el/la más cariños@?", "¿Quién es el/la más extrovertid@?", "¿Quién es el/la más introvertid@?", "¿Quién es el/la más orgullos@?", "¿Quién es el/la más coleric@?", "¿Quién es el/la más cobarde?", "¿Quién es el/la más valiente?", "¿Quién es el/la más caballeros@?", "¿Quién es el/la más grande?", "¿Quién es el/la más pequñ@?", "¿Quién es el/la más bestia?", "¿Quién es el/la más adinerado?", "¿Quién es el/la más alegre?", "¿Quién es el/la más triste?", "¿Quién es el/la más estoic@?", "¿Quién es el/la más borracho?", "¿Quién es el/la más perfeccionista?", "¿Quién es el/la más pelota?", "¿Quién es el/la más trabajador/a?", "¿Quién es el/la más vag@?", "¿Quién es el/la más pervertid@?", "¿Quién es el/la más CHAD?", "¿Quién es el/la más VIRGIN?", "¿Quién es el/la más creyente?", "¿Quién es el/la más sexy?", "¿Quién es el/la más constante?", "¿Quién es el/la más bocachancla?", "¿Quién es el/la más débil?", "¿Quién es el/la más niñ@de mamá/papá?", "¿Quién es el/la más gAMeR?", "¿Quién es el/la más pij@?", "¿Quién es el/la más emocional?", "¿Quién es el/la más soso?", "¿Quién es el/la más justo?", "¿Quién es el/la más líder?", "¿Quién es el/la más puntual?", "¿Quién es el/la más futbolero?", "¿Quién es el/la más pacifista?", "¿Quién es el/la más music@?", "¿Quién es el/la más edgy?", "¿Quién es el/la más weaboo?", "¿Quién es el/la más fiester@?", "¿Quién es el/la más padre/madre?", "¿Quién es el/la más controlador/a?", "¿Quién es el/la más cringe?", "¿Quién es el/la más vergonzos@?", "¿Quién es el/la más humilde?", "¿Quién es el/la más machista opresor/a?", "¿Quién es el/la más old school?", "¿Quién es el/la más de campo?", "¿Quién es el/la más autista?", "¿Quién es el/la más madur@?", "¿Quién es el/la más dramas?", "¿Quién es el/la más pupas?", "¿Quién es el/la más superviviente?", "¿Quién es el/la más lector?", "¿Quién es el/la más leal?", "¿Quién es el/la más traidor?", "¿Quién es el/la más supremacista?", "¿Quién es el/la más guap@?", "¿Quién es el/la más ordenad@?", "¿Quién es el/la más perroflauta?", "¿Quién es el/la más sibarita?", "¿Quién es el/la más infantil?", "¿Quién es el/la más kamikaze?", "¿Quién es el/la más quejica?", "¿Quién es el/la más OP?", "¿Quién es el/la más muert@de hambre?", "¿Quién es el/la más olvidadiz@?", "¿Quién tiene más pluma?", "¿Quién es el/la más am@de casa?", "¿Quién es el/la más cute?", "¿Quién es el/la más criminal?", "¿Quién es el/la más rastrer@?", "¿Quién es el/la más dominante?", "¿Quién es el/la más sumis@?", "¿Quién es el/la más nocturn@?", "¿Quién es el/la más diurno?", "¿Quién es el/la más abuelo cebolleta?", "¿Quién es el/la más complicad@?", "¿Quién es el/la más simple?", "¿Quién es el/la más escéptic@?", "¿Quién es el/la más random?", "¿Quién es el/la más delgad@?", "¿Quién es el/la más histeric@?", "¿Quién es el/la más andaluz/a?", "¿Quién es el/la más ESPAÑOL/A?", "¿Quién es el/la más generos@?", "¿Quién es el/la más lógic@?", "¿Quién es el/la más didactic@?"],
		tiempoPregunta: 5, tiempoRespuesta: 8
	},
	lentas:
	{
		texto: ["¿Quién es el más probable que literalmente diga 'literalmente' en cada frase?", "¿Quién es más probable que salude a un extraño por la calle creyendo que lo conoce?", "¿Quién es más probable que acabe vendiendo droga en la esquina fondo del parque San Agustín?", "¿Quién es más probable que haya dejado todas sus cosas desordenadas antes de venir?", "¿Quién es más probable que haya pensado su disfraz dos minutos antes de venir?", "¿Quién es más probable que compre ropa que no es de su talla porque se le ha olvidado mirar la talla en sí?", "¿Quién es más probable que se queme a parches cual dálmata este finde?", "¿Quién es más probable que acabe prostituido?", "¿Quién es más probable que rechace unos macarrones con tomatico?", "¿Quién es más probable que siga viendo Dallas reseñas?", "¿Quién es más probable que pillé una indigestión por comer algo en mal estado?", "¿Quién es más probable que gane una apuesta sea cual sea dicha apuesta?", "¿Quién es más probable que se pida comida picante y luego no sea capaz de comérsela porque pica demasiado?", "¿Quién es más probable que conquiste Europa?", "¿Quién es más probable que se ponga Ladylal en bucle antes de dormir?", "¿Quién es más probable que se quede dormido en una sala de espera antes de ser atendido?", "¿Quién es más probable que sobreviva un apocalipsis de zombies unicornio?", "¿A quién es más probable que se baje Elo?", "¿Quién es más probable que se convierta en YouTuber?", "¿Quién es más probable que se pelee con un mapache por un trozo de pizza de la basura?", "¿Quién es más probable que suspenda un examen por faltas de ortografía?", "¿Quién es más probable que acabe bailando a las cuatro de la mañana al son del opening de doraemon?", "¿Quién es más probable que muera de muerte por hormigas?", "¿- Quién es más probable que se coma una hormiga por gusto?", "¿Quién es más probable que se invente tres preguntas seguidas sobre hormigas para este juego?", "¿Quién es más probable que sea asesinado por una mariquita(LadyLal)?", "¿Quién es más probable que cometa crímenes de guerra?", "¿Quién es más probable que acabe como dictador para una empresa de hacer dictados?", "¿Quién es más probable que mate a alguien de una indigestión?", "¿Quién es más probable que se vea enzarzado en una feroz batalla con un animal salvaje?", "¿Quién es más probable que consuma LOS PORROS?", "¿Quién es más probable que se compre gilipolleces por Amazon?", "¿Quién es más probable que se mude a otro país en el futuro?", "¿Quién es más probable que consiga un Récord Guiness?", "¿Quién es más probable que finja su muerte?", "¿Quién es más probable que llore viendo un drama bielorruso sobre una pareja disfuncional debido a sus gustos por las bebidas energéticas?", "¿Quién es más probable que haga balconing?", "¿Quién es más probable que se compre una almohada antiducha?", "¿Quién es mas probable que se pegue de ostias con un fisicoculturista porque va borrach@?", "¿Quién tiene más papeletas de ser un villano de Disney?", "¿Quién sería más capaz de subir el Everest por un 'no hay huevos'?", "¿Quién sería más capaz de comerse hasta la mezcla de una hormigonera?", "¿Quién aguantaría más en un reality show?", "¿Quién es más capaz de empezar un conflicto armado por motivos absurdos?", "¿Quién tiene más papeletas de ser contratado por un servicio de inteligencia?", "¿Quién sería más capaz de pedir 'abrazos gratis' en una Expomanga?", "¿ Quién, si se lo propusiera, sería un éxito ligando en plan casanova?", "¿Quién es el más posible que acabe haciendo un tiroteo en un centro comercial?", "¿Quién es el más posible que beba lodo por 60 leuros?", "¿Quién es el más posible que se coma un plato de arañitas vivas?", "¿Quién es el más posible que deje todo y desaparezca si le dan un buen trabajo?", "¿Quién es el más posible que se cargue a alguien a sangre fría?", "¿Quién es el más posible que acabe siendo un borracho compulsivo fomentador de violencia intrafamiliar?", "¿Quién es el más posible que se saque el carnet el último?", "¿Quién es el más posible que moriría el primero de enfermedad en el medievo?", "¿Quién es el más posible que acabe metido en prisión por robar cereales?", "¿Quién es el más probable que le multen en el coche y si no tiene aun cuando lo tenga?", "¿Quién es el más posible que acabe en bancarrota por una mala decisión?", "¿Quién es el más posible que pida empleo en el isturk en caso de que no encuentre nada?", "¿Quién es el más posible que entre todos se quede en Coín?", "¿Quién es el más posible que acabe siendo religios@musulman extremista?", "¿Quien es el más posible que hubiera participado en la Inquisición?"
			, "¿Quién tiene más posibilidades de literalmente cometer sepukku?", "¿Quién tiene más posibilidades de ir a trabajar(trabajo serio) sin literalmente haber dormido la noche anterior?", "¿Quién tiene más posibilidades de morir antes de los 30?", "¿Quién tiene más posibilidades de participar en una orgia(5 o más peña)?", "¿Quién tiene más posibilidades de ser el primero del grupo en tener un hijo?", "¿Quién tiene más posibilidades de hacerse speedrunner?", "¿Quién tiene más posibilidades de ponerse to gordo?", "¿Quién tiene más posibilidades de ganar un duelo a muerte con cuchillos contra un monke?", "¿Quién tiene más posibilidades de hacerse un doctorado en algo?", "¿Quién tiene más posibilidades de hacerse actor porno(incluyendo Solo Ventiladores)?", "¿Quién tiene más posibilidades de cambiarse el género?", "¿Quién tiene más posibilidades de desnudarse por una apuesta en público o semipúblico?", "¿Quién tiene más posibilidades de romper su móvil por una furia de monke?", "¿Quién tiene más posibilidades de literalmente comerse a la abuela de alguien?", "¿Quién tiene más posibilidades de llegar a los 100 años de vida?", "¿Quién tiene más posibilidades de ser presidente?", "¿Quién tiene más posibilidades de hacerse deportista de profesión?", "¿Quién tiene más posibilidades de abrir un isturk?", "¿Quién tiene más posibilidades de convertirse en fanta y regresar al inicio y final de la humanidad?", "¿Quién tiene más posibilidades de cometer un acto terrorista?", "¿Quién es más probable que rompa el teclado si pierde una partida?", "¿Quién es más probable que se bañe en la piscina a las 3a.m.?", "¿Quién es más probable que se sepa el diálogo de una película antes que aprenderse un tema de cualquier asignatura?", "¿Quién es más probable que haya pillado a sus padres haciendo el delicioso?", "¿Quién es más probable que haya roto o rompa en un futuro un router?", "¿Quién es el más sucio de esta sala?", "¿Quién es más probable que por alguna razón se sepa los nombres y apellidos de todos los personajes secundarios de una serie cualquiera?", "¿Quién es más probable que se deje la placa encendida?", "¿Quién es más probable que provoque un incendio sin querer?", "¿Quién es más probable que le tire una bolsa de excremento a una vieja o a un niño?", "¿Quién es más probable que corra una maratón y al llegar a la linea de meta vomite?", "¿Quién es más probable que haga un viaje en globo aerostático?", "¿Quién es más probable que se rompa una extremidad ayudando a otra persona?", "¿Quién es más probable que se quede calvo / a?", "¿Quién es más probable que mate a un animal?", "¿Quién es más probable que tenga un accidente con el coche?", "¿Quién es más probable que se rasque sus partes y se huela las manos frente a todos sin darse cuenta?", "¿Quién es más probable que tenga que hacersele un lavado de estómago porque se comió un Lego?", "¿Quién bebería algún producto tóxico por accidente?"],
		tiempoPregunta: 8, tiempoRespuesta: 20
	},
}

const usuarios = {
	Raul: { socket: null, votos: 0 },
	Carlos: { socket: null, votos: 0 },
	Elo: { socket: null, votos: 0 },
	Cabriada: { socket: null, votos: 0 },
	Kanian: { socket: null, votos: 0 },
	Morilla: { socket: null, votos: 0 },
	Candy: { socket: null, votos: 0 },
	Carmen: { socket: null, votos: 0 },
	Isa: { socket: null, votos: 0 },
	Helena: { socket: null, votos: 0 },
	Rafa: { socket: null, votos: 0 },
	Jenny: { socket: null, votos: 0 },
}



function removeA(arr) {
	var what, a = arguments, L = a.length, ax;
	while (L > 1 && arr.length) {
		what = a[--L];
		while ((ax = arr.indexOf(what)) !== -1) {
			arr.splice(ax, 1);
		}
	}
	return arr;
}

function shuffle(array) {
	var currentIndex = array.length, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex], array[currentIndex]];
	}

	return array;
}




let tipoDePreguntas = "normales"

let setDePreguntas = []



const get_user = (socket) => {
	for (const key in usuarios)
		if (usuarios[key].socket === socket)
			return key;
	return null;
}

let timeouts = []

let conectados = []
const build_path = path.join(__dirname, '../client/build')
const index_path = path.join(build_path, 'index.html')

app.use(express.static(build_path));

app.get('/', (_, res) => {
	res.sendFile(index_path);
});

app.get('/usuarios', (_, res) => {
	res.send(Object.keys(usuarios));
});

app.get('/conectados', (_, res) => {
	res.send(conectados);
});

app.get('/pools', (_, res) => {
	res.send(Object.keys(preguntas));
});

app.get('/empates', (_, res) => {
	res.send(retos)
});

app.get('/preguntasRestantes', (_, res) => {
	res.send(setDePreguntas.length.toString())
});



io.on("connection", (socket) => {

	console.log("Usuario conectado")

	// Elegir personaje inicio
	socket.on("conectar", (c) => {
		console.log("seleccionado: ", c)
		if (!usuarios[c] || usuarios[c].socket) return;  // El usuario no existe o ya está conectado
		usuarios[c].socket = socket;
		conectados.push(c);
		socket.emit("conexion aceptada", c);
		io.emit("set conectados", conectados)
	})

	const onDesconectar = () => {
		const c = get_user(socket);
		console.log("des-seleccionado: ", c)
		if (c === null) return;
		usuarios[c].socket = null;
		removeA(conectados, c);
		socket.emit("desconectado");
		io.emit("set conectados", conectados)
	}

	socket.on("desconectar", onDesconectar)
	socket.on("disconnect", onDesconectar)

	socket.on("start challenge", () => {
		io.emit("set reto", retos["Normal"][getRndInteger(0, retos["Normal"].length)])
	})

	socket.on("start custom challenge", (pool) => {
		io.emit("set reto", retos[pool][getRndInteger(0, retos[pool].length)])
	})

	// Elegir pool espera
	socket.on("set pool", (pool) => {
		tipoDePreguntas = pool
		io.emit("set pool", pool)
	})

	const recivir_voto = (votado, votador) => {
		if (!votado) console.log(votador + " no ha votado")
		else {
			usuarios[votado].votos += 1;
			console.log(votador + " ha respondido: " + votado);

			let totalDeVotos = 0
			let max = [{ nombre: conectados[0], votos: 0 }];
			for (const key in usuarios) {
				totalDeVotos += usuarios[key].votos
				if (usuarios[key].votos > max[0].votos) {
					max = [{ nombre: key, votos: usuarios[key].votos }]
				}
				else if (usuarios[key].votos === max[0].votos) {
					max.push({ nombre: key, votos: usuarios[key].votos })
				}
			}
			// Si ya han votado todos
			if (totalDeVotos >= conectados.length) {
				// Si hay empate
				if (max.length > 1) {
					console.log("empate entre: ", max.map(e => e.nombre))

					// Si existe reto personalizado
					let property = max.map(e => e.nombre).sort().join("")
					console.log(property)
					if (retos.hasOwnProperty(property)) {
						console.log("empate personalizado: ", retos[property])
					}
					io.emit("set empatados", max)
				}
				// Limpiamos todos los timeouts que pueda haber
				timeouts.forEach(element => {
					clearTimeout(element)
				});
				timeouts = []
			}

			io.emit("set resultados", Object.keys(usuarios).map((elem) => ({ nombre: elem, votos: usuarios[elem].votos })));
		}
	}

	// Una ronda de preguntas
	socket.on("start round", () => {
		// Limpiamos todos los timeouts que pueda haber
		timeouts.forEach(element => {
			clearTimeout(element)
		});
		timeouts = []

		// Hacemos una copia, para poder hacer pop() sin modificar el original
		if (setDePreguntas.length === 0)
			setDePreguntas = [...shuffle(preguntas[tipoDePreguntas].texto)]

		const contador = (left, onEnd) => {
			io.emit("time left", left);

			if (left == 0) onEnd()
			else timeouts.push(setTimeout(() => contador(left - 1, onEnd), 1000));
		}

		io.emit("set pregunta", setDePreguntas.pop()); // Envia la prpegunta elegida a los participantes

		contador(preguntas[tipoDePreguntas].tiempoPregunta, () => {
			io.emit("timer done")
			contador(preguntas[tipoDePreguntas].tiempoRespuesta, () => {
				conectados.forEach((elem) => usuarios[elem].socket.once("respuesta", (v) => recivir_voto(v, elem)))

				Object.keys(usuarios).forEach((elem) => usuarios[elem].votos = 0); // Resetear los votos

				io.emit("set resultados", Object.keys(usuarios).map((elem) => ({ nombre: elem, votos: usuarios[elem].votos }))); // Por si nadie responde
				io.emit("pedir respuestas")
			})
		})
	})
})

server.listen(PORT, () => {
	console.log('listening on *:' + PORT);
});