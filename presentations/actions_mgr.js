

// 2. Registrar explícitamente el plugin Flip en GSAP
gsap.registerPlugin(SplitText);
gsap.registerPlugin(Flip);

const puntosTexto = [
	"1. Introducción a la arquitectura del sistema",
	"2. Configuración óptima de hardware",
	"3. Optimización de rendimiento en tiempo real",
	"4. Conclusiones y buenas prácticas"
];

let split, animation;
let currentIndex = 0;
let elementoActualEnCentro = null;

let swoosh_1 = null;

const stage = document.getElementById('stage');
const sidebar = document.getElementById('sidebar');

function do_next() {
	if((currentIndex >= puntosTexto.length) && (elementoActualEnCentro == null)){
		return;
	}

	// Si hay un punto activo en el centro, lo movemos a la lista usando Flip
	if(elementoActualEnCentro){
		if(elementoActualEnCentro.parentNode == stage){
			move_elem(elementoActualEnCentro);
			if(currentIndex >= puntosTexto.length) {
				elementoActualEnCentro = null;
			}
		} else {
			bring_next();
		}
	} else {
		bring_next();
	}
}

function bring_next(){
	// Creamos el nuevo punto en el centro
	//const str_ln = puntosTexto[currentIndex].length;
	//const str_pt = ' '.repeat(str_ln);

	const nuevoItem = document.createElement('div');
	nuevoItem.id = "item_" + currentIndex;
	nuevoItem.className = 'point-item';
	//nuevoItem.innerText = str_pt;
	nuevoItem.innerText = puntosTexto[currentIndex];
	stage.appendChild(nuevoItem);

	if(swoosh_1 != null){
		swoosh_1.currentTime = 0;
		swoosh_1.play().catch(error => {
			console.log("Audio reproducido tras interacción o bloqueado:", error);
		});
	}

	// Animación de entrada estilo Animate.css (Zoom/Bounce in)
	gsap.fromTo(nuevoItem,
		{
			x: -750,
			y: -650,
			scale: 0.5, opacity: 0
		},
		{
			x: 0,
			y: 0,
			scale: 1, opacity: 1, duration: 1, ease: "back.out(1.7)"
		}
	);

	//nuevoItem.innerText = puntosTexto[currentIndex];

	console.log(nuevoItem.id);
	let split = SplitText.create("#" + nuevoItem.id, {type:"chars,words,lines"});

	animation && animation.revert();
	/*animation = gsap.from(split.lines, {
		//rotationX: -100,
		rotationX: -100,
		transformOrigin: "50% 50% -160px",
		opacity: 0,
		duration: 0.8,
		ease: "power3",
		stagger: 0.25
	});*/
	animation = gsap.from(split.words, {
		x: -200,
		y: -100,
		opacity: 0,
		//rotation: "random(-80, 80)",
		//transformOrigin: "50% 50% -160px",
		rotation: 90,
		duration: 2.7,
		ease: "back",
		//stagger: 0.15
		stagger: 0
	});
	/*
	animation = gsap.from(split.chars, {
		x: 150,
		//rotation: 90,
		//rotationX: -100,
		opacity: 0,
		duration: 0.7,
		ease: "power4",
		stagger: 0.04
	});*/

	elementoActualEnCentro = nuevoItem;
	currentIndex++;
	if(currentIndex < puntosTexto.length){
		console.log(`NEXT: ${puntosTexto[currentIndex]}`);
	}
}

function move_elem(item) {
	// F - FIRST: Capturamos el estado geométrico actual del elemento en el centro
	const state = Flip.getState(item);

	// L - LAST: Movemos físicamente el elemento a su nuevo contenedor padre (la barra lateral)
	// Gracias a las clases CSS, cambiará automáticamente de posición absoluta a flujo normal.
	sidebar.appendChild(item);

	// I & P - INVERT & PLAY: Ejecutamos la animación FLIP para que vuele de manera fluida
	Flip.from(state, {
		duration: 0.7,
		ease: "power2.inOut",
		absolute: true, // Permite una transición limpia entre contenedores con diferente posicionamiento
		scale: true     // Calcula también el cambio de tamaño entre la tarjeta grande del centro y la de la lista
	});
}

function do_toggle_sidebar() {
	sidebar.classList.toggle('hidden');
}

export async function start_actions(){
	document.addEventListener('keydown', function(ev1) {
		// Verificamos si la tecla es el espacio
		if (ev1.code === 'Space') {
			// Evitamos el comportamiento por defecto (como hacer scroll hacia abajo en la página)
			ev1.preventDefault();

			do_next();
		}
	});

	const but_togg = document.getElementById("toggle_sidebar");
	but_togg.addEventListener('click', do_toggle_sidebar);

	swoosh_1 = new Audio('./sounds/swoosh_01.wav');
	// Opcional: ajustar el volumen si lo deseas (de 0.0 a 1.0)
	swooshAudio.volume = 0.5;

}

// show sidebar
// hide sidebar
// new point
// add point to sidebar
// show image
// hide image
// sound effect (criquets, bomb, crash, disapoinment)
