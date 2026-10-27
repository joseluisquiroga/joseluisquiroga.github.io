

//import OBSWebSocket from 'obs-websocket-js';

//const obs = new OBSWebSocket();

// Configuración de conexión
const OBS_ADDRESS = 'ws://127.0.0.1:4455';
const OBS_PASSWORD = 'msJqnxsD3NGIYVPR'; // Déjalo vacío si no usas contraseña


// 2. Registrar explícitamente el plugin Flip en GSAP
gsap.registerPlugin(SplitText);
gsap.registerPlugin(Flip);

const gvar = {};

function init_containers(){
	gvar.stage = document.getElementById('id_stage');
	gvar.stage.classList.add('hidden');

	gvar.sidebar = document.getElementById('id_sidebar');
	gvar.sidebar.classList.add('hidden');

	gvar.sidebar.addEventListener('transitionend', function(e) {
		if((e.propertyName === 'transform') && (gvar.current_action != null)){
			if(gvar.current_action.spc){ send_space_key(); gvar.current_action = null; }
		}
	});

	gvar.item1 = document.getElementById('id_item1');
	gvar.item2 = document.getElementById('id_item2');
	gvar.item3 = document.getElementById('id_item3');
	gvar.item4 = document.getElementById('id_item4');
}

function hide_container(act) {
	if(act == null){ console.error(`act == null`); }
	gvar.current_action = act;
	if(act.dst == null){ console.error(`act.dst == null`); }
	act.dst.classList.add('hidden');
}

function show_container(act) {
	if(act == null){ console.error(`act == null`); }
	gvar.current_action = act;
	if(act.dst == null){ console.error(`act.dst == null`); }
	act.dst.classList.remove('hidden');
}

function do_toggle_sidebar() {
	gvar.sidebar.classList.toggle('hidden');
}

function init_cursor(){
	const dv_cursor = document.createElement('div');
	dv_cursor.classList.add("cursor");
	dv_cursor.style.display = "block";

	document.body.appendChild(dv_cursor);

	document.addEventListener("mousemove", (e) => {
		dv_cursor.style.left = e.clientX + "px";
		dv_cursor.style.top = e.clientY + "px";
	});
}

export async function start_actions(){
	document.addEventListener('keydown', function(ev1) {
		if(ev1.code === 'Space'){
			ev1.preventDefault();

			//do_next();
			do_next_action();
		}
		if(ev1.key === 'ArrowLeft'){
			ev1.preventDefault();
			do_next_action(true);
		}
		if(ev1.key === 'ArrowRight'){
			ev1.preventDefault();
			do_next_action();
		}
	});

	const but_togg = document.getElementById("toggle_sidebar");
	but_togg.addEventListener('click', do_toggle_sidebar);

	console.log(window.location.href);
	console.log(window.location.pathname);

	init_cursor();
	init_containers();
	init_sounds();
	init_actions();
}

function init_sounds(){
	gvar.sound = {};
	gvar.sound.camera_shutter_1 = new Audio('./sounds/camera_shutter_1.wav');
	gvar.sound.camera_shutter_2 = new Audio('./sounds/camera_shutter_2.wav');
	gvar.sound.cinematic_hit_horns = new Audio('./sounds/cinematic_hit_horns.wav');
	gvar.sound.click_1 = new Audio('./sounds/click_1.wav');
	gvar.sound.click_2 = new Audio('./sounds/click_2.wav');
	gvar.sound.cricket_1 = new Audio('./sounds/cricket_1.wav');
	gvar.sound.crickets_1 = new Audio('./sounds/crickets_1.wav');
	gvar.sound.disapointment_wha_wha_wha_1 = new Audio('./sounds/disapointment_wha_wha_wha_1.wav');
	gvar.sound.disapointment_wha_wha_wha_2 = new Audio('./sounds/disapointment_wha_wha_wha_2.wav');
	gvar.sound.disapointment_wha_wha_wha_3 = new Audio('./sounds/disapointment_wha_wha_wha_3.wav');
	gvar.sound.explosion_1 = new Audio('./sounds/explosion_1.wav');
	gvar.sound.explosion_2 = new Audio('./sounds/explosion_2.wav');
	gvar.sound.explosion_3 = new Audio('./sounds/explosion_3.wav');
	gvar.sound.glass_breaking_1 = new Audio('./sounds/glass_breaking_1.wav');
	gvar.sound.glass_breaking_2 = new Audio('./sounds/glass_breaking_2.wav');
	gvar.sound.glass_breaking_3 = new Audio('./sounds/glass_breaking_3.wav');
	gvar.sound.glass_breaking_4 = new Audio('./sounds/glass_breaking_4.wav');
	gvar.sound.gun_shot = new Audio('./sounds/gun_shot.wav');
	gvar.sound.heartbeat_1 = new Audio('./sounds/heartbeat_1.wav');
	gvar.sound.heartbeat_2 = new Audio('./sounds/heartbeat_2.wav');
	gvar.sound.implosion = new Audio('./sounds/implosion.wav');
	gvar.sound.laser_shot_1 = new Audio('./sounds/laser_shot_1.wav');
	gvar.sound.laser_shot_2 = new Audio('./sounds/laser_shot_2.wav');
	gvar.sound.owl_hooting = new Audio('./sounds/owl_hooting.wav');
	gvar.sound.paper_tearing_1 = new Audio('./sounds/paper_tearing_1.wav');
	gvar.sound.paper_tearing_2 = new Audio('./sounds/paper_tearing_2.wav');
	gvar.sound.snap_1 = new Audio('./sounds/snap_1.wav');
	gvar.sound.snap_2 = new Audio('./sounds/snap_2.wav');
	gvar.sound.swoosh_01 = new Audio('./sounds/swoosh_01.wav');
	gvar.sound.swoosh_02 = new Audio('./sounds/swoosh_02.wav');
	gvar.sound.swoosh_03 = new Audio('./sounds/swoosh_03.wav');
	gvar.sound.swoosh_04 = new Audio('./sounds/swoosh_04.wav');
	gvar.sound.swoosh_05 = new Audio('./sounds/swoosh_05.wav');
	gvar.sound.swoosh_06 = new Audio('./sounds/swoosh_06.wav');
	gvar.sound.swoosh_07 = new Audio('./sounds/swoosh_07.wav');
	gvar.sound.swoosh_08 = new Audio('./sounds/swoosh_08.wav');
	gvar.sound.swoosh_09 = new Audio('./sounds/swoosh_09.wav');
	gvar.sound.swoosh_10 = new Audio('./sounds/swoosh_10.wav');
	gvar.sound.swoosh_11 = new Audio('./sounds/swoosh_11.wav');
	gvar.sound.swoosh_12 = new Audio('./sounds/swoosh_12.wav');
	gvar.sound.swoosh_13 = new Audio('./sounds/swoosh_13.wav');
	gvar.sound.swoosh_14 = new Audio('./sounds/swoosh_14.wav');
	gvar.sound.vinyl_scratch_1 = new Audio('./sounds/vinyl_scratch_1.wav');
	gvar.sound.vinyl_scratch_2 = new Audio('./sounds/vinyl_scratch_2.wav');
	gvar.sound.whip = new Audio('./sounds/whip.wav');

	gvar.sound.camera_shutter_1.volume = 0.5;
	gvar.sound.camera_shutter_2.volume = 0.5;
	gvar.sound.cinematic_hit_horns.volume = 0.5;
	gvar.sound.click_1.volume = 0.5;
	gvar.sound.click_2.volume = 0.5;
	gvar.sound.cricket_1.volume = 0.5;
	gvar.sound.crickets_1.volume = 0.5;
	gvar.sound.disapointment_wha_wha_wha_1.volume = 0.5;
	gvar.sound.disapointment_wha_wha_wha_2.volume = 0.5;
	gvar.sound.disapointment_wha_wha_wha_3.volume = 0.5;
	gvar.sound.explosion_1.volume = 0.5;
	gvar.sound.explosion_2.volume = 0.5;
	gvar.sound.explosion_3.volume = 0.5;
	gvar.sound.glass_breaking_1.volume = 0.5;
	gvar.sound.glass_breaking_2.volume = 0.5;
	gvar.sound.glass_breaking_3.volume = 0.5;
	gvar.sound.glass_breaking_4.volume = 0.5;
	gvar.sound.gun_shot.volume = 0.5;
	gvar.sound.heartbeat_1.volume = 0.5;
	gvar.sound.heartbeat_2.volume = 0.5;
	gvar.sound.implosion.volume = 0.5;
	gvar.sound.laser_shot_1.volume = 0.5;
	gvar.sound.laser_shot_2.volume = 0.5;
	gvar.sound.owl_hooting.volume = 0.5;
	gvar.sound.paper_tearing_1.volume = 0.5;
	gvar.sound.paper_tearing_2.volume = 0.5;
	gvar.sound.snap_1.volume = 0.5;
	gvar.sound.snap_2.volume = 0.5;
	gvar.sound.swoosh_01.volume = 0.5;
	gvar.sound.swoosh_02.volume = 0.5;
	gvar.sound.swoosh_03.volume = 0.5;
	gvar.sound.swoosh_04.volume = 0.5;
	gvar.sound.swoosh_05.volume = 0.5;
	gvar.sound.swoosh_06.volume = 0.5;
	gvar.sound.swoosh_07.volume = 0.5;
	gvar.sound.swoosh_08.volume = 0.5;
	gvar.sound.swoosh_09.volume = 0.5;
	gvar.sound.swoosh_10.volume = 0.5;
	gvar.sound.swoosh_11.volume = 0.5;
	gvar.sound.swoosh_12.volume = 0.5;
	gvar.sound.swoosh_13.volume = 0.5;
	gvar.sound.swoosh_14.volume = 0.5;
	gvar.sound.vinyl_scratch_1.volume = 0.5;
	gvar.sound.vinyl_scratch_2.volume = 0.5;
	gvar.sound.whip.volume = 0.5;
}

const topics = {
	t1: {
		img: './img/boy_gossip.webp',
		txt: "1. Introducción a la arquitectura del sistema",
		tdv: null,
	},
	t2: {
		txt: "La Vida Eterna",
		tdv: null,
	},
	t3: {
		txt: "Muertos",
		tdv: null,
	},
	t4: {
		txt: "Objeciones",
		tdv: null,
	},
	t5: {
		txt: "Resurreccion",
		tdv: null,
	},
};

function init_actions(){
	const actions = {
		/*a1: {
			tpc: topics.t1,
			dst: gvar.stage,
			fnc: add_topic,
			spc: true,
		},
		a2: {
			tpc: topics.t1,
			fnc: remove_topic,
		},*/
		a3: {
			tpc: topics.t2,
			dst: gvar.stage,
			fnc: add_topic,
		},
		a3_1: {
			dst: gvar.sidebar,
			fnc: show_container,
			spc: true,
		},
		a4: {
			tpc: topics.t2,
			dst: gvar.item1,
			fnc: move_topic_to_div,
			spc: true,
		},
		a4_1: {
			dst: gvar.sidebar,
			fnc: hide_container,
		},
		a5: {
			tpc: topics.t3,
			dst: gvar.stage,
			fnc: add_topic,
		},
		a5_1: {
			dst: gvar.sidebar,
			fnc: show_container,
			spc: true,
		},
		a6: {
			tpc: topics.t3,
			dst: gvar.item2,
			fnc: move_topic_to_div,
			spc: true,
		},
		a6_1: {
			dst: gvar.sidebar,
			fnc: hide_container,
		},
		a7: {
			tpc: topics.t4,
			dst: gvar.stage,
			fnc: add_topic,
		},
		a7_1: {
			dst: gvar.sidebar,
			fnc: show_container,
			spc: true,
		},
		a7_2: {
			tpc: topics.t4,
			dst: gvar.item3,
			fnc: move_topic_to_div,
			spc: true,
		},
		a7_3: {
			dst: gvar.sidebar,
			fnc: hide_container,
		},
		a8: {
			tpc: topics.t5,
			dst: gvar.stage,
			fnc: add_topic,
		},
		a8_1: {
			dst: gvar.sidebar,
			fnc: show_container,
			spc: true,
		},
		a8_2: {
			tpc: topics.t5,
			dst: gvar.item4,
			fnc: move_topic_to_div,
			spc: true,
		},
		a8_3: {
			dst: gvar.sidebar,
			fnc: hide_container,
		},
	};

	gvar.actions = actions;
	gvar.id_actions = Object.keys(actions);
}

function add_topic(act){
	if(act == null){ console.error(`act == null`); }
	if(act.tpc == null){ console.error(`act.tpc == null`); }
	if(act.dst == null){ console.error(`act.dst == null`); }

	let itm = get_topic(act);

	if(act.is_undo != null){
		console.log(`UNDO add_topic`);
		act.is_undo = null;
		act.tpc.tdv.remove();
		act.tpc.tdv = null;
		return;
	}

	act.tpc.prv_divs = [];
	act.dst.appendChild(itm);

	let snd = gvar.sound.swoosh_01;
	if(snd != null){
		snd.currentTime = 0;
		snd.play().catch(error => {
			console.log("Audio failed:", error);
		});
	}

	// Animación de entrada estilo Animate.css (Zoom/Bounce in)
	gsap.fromTo(itm,
		{
			x: -750,
			y: -650,
			scale: 0.5, opacity: 0,
			//scale: 1, opacity: 1,
		},
		{
			x: 0,
			y: 0,
			scale: 1, opacity: 1,
			duration: 1, ease: "back.out(1.7)"
		},
	);

	console.log(itm.id);

	let split = SplitText.create("#" + itm.id, {type:"chars,words,lines"});

	let animation;
	animation && animation.revert();
	animation = gsap.from(split.words, {
		x: -200,
		y: -100,
		opacity: 0,
		rotation: 90,
		duration: 2.7,
		ease: "back",
		stagger: 0,
		onComplete: function() {
			if(act.spc){ send_space_key(); }
		},
	});

}

function remove_topic(act){
	if(act == null){ console.error(`act == null`); }
	if(act.tpc == null){ console.error(`act.tpc == null`); }

	let itm = act.tpc.tdv;

	if(act.is_undo != null){
		console.log(`UNDO remove_topic`);
		if(itm != null){ console.error(`itm != null`); }
		itm = get_topic(act);
		act.tpc.tdv = itm;

		act.is_undo = null;
		if(act.tpc.prv_divs.length > 0){
			const pnt = act.tpc.prv_divs.pop();
			pnt.appendChild(itm);
		}
		return;
	}

	if(act.tpc.tdv == null){ console.error(`act.tpc.tdv == null`); }
	if(itm == null){ console.error(`itm == null`); }
	act.tpc.tdv = null;

	let snd = gvar.sound.swoosh_01;
	if(snd != null){
		snd.currentTime = 0;
		snd.play().catch(error => {
			console.log("Audio failed:", error);
		});
	}

	gsap.fromTo(itm,
		{
			x: 0,
			y: 0,
			scale: 1, opacity: 1,
		},
		{
			x: +250,
			y: +250,
			scale: 0.5, opacity: 0,
			duration: 1, ease: "back.out(1.7)",
			onComplete: function() {
				itm.remove();
				if(act.spc){ send_space_key(); }
			},
		},
	);

	const src_dv = itm.parentNode;
	if(src_dv == null){ console.error(`src_dv == null`); }

	act.tpc.prv_divs.push(src_dv);
	//itm.remove();
}

function move_topic_to_div(act){
	if(act == null){ console.error(`act == null`); }
	if(act.tpc == null){ console.error(`act.tpc == null`); }
	if(act.dst == null){ console.error(`act.dst == null`); }

	const itm = act.tpc.tdv;
	if(itm == null){ console.error(`itm == null`); }
	if(act.tpc.prv_divs == null){ console.error(`act.tpc.prv_divs == null`); }

	if(act.is_undo != null){
		console.log(`UNDO move_topic_to_div`);
		act.is_undo = null;
		const pnt = act.tpc.prv_divs.pop();
		pnt.appendChild(itm);
		return;
	}

	const src_dv = itm.parentNode;
	if(src_dv == null){ console.error(`src_dv == null`); }

	const state = Flip.getState(itm);
	act.dst.appendChild(itm);

	act.tpc.prv_divs.push(src_dv);

	Flip.from(state, {
		duration: 0.7,
		ease: "power2.inOut",
		absolute: true, // Permite una transición limpia entre contenedores con diferente posicionamiento
		scale: true,
		onComplete: function() {
			if(act.spc){ send_space_key(); }
		},
	});
}

function do_next_action(do_und) {
	if(gvar.id_actions == null){ console.error(`gvar.id_actions == null`); }
	if(gvar.curr_idx == null){
		gvar.curr_idx = 0;
	}
	if(do_und != null){
		gvar.curr_idx--;
	}
	if(gvar.curr_idx < 0){
		gvar.curr_idx = null;
		return;
	}
	if(gvar.curr_idx >= gvar.id_actions.length){
		return;
	}

	const nxt_id = gvar.id_actions[gvar.curr_idx];
	const nxt_act = gvar.actions[nxt_id];

	if(nxt_act.fnc == null){ console.error(`nxt_act.fnc == null`); }
	if(do_und != null){
		nxt_act.is_undo = true;
	}

	try{
		nxt_act.fnc(nxt_act);
	} catch(err) {
		console.error(`Action ${nxt_id} failed with\n ${err}`);
	}

	if(do_und == null){
		gvar.curr_idx++;
	}
}

function get_topic(act){
	if(act == null){ console.error(`act == null`); }
	if(act.tpc == null){ console.error(`act.tpc == null`); }
	let dv_itm = act.tpc.tdv;
	if(dv_itm != null){
		return dv_itm;
	}

	const txt = act.tpc.txt;
	const img = act.tpc.img;
	if((txt == null) && (img == null)){ console.error(`((txt == null) && (img == null))`); }

	let txt_id = "topic_txt_" + gvar.curr_idx;
	let dv_txt = null;
	let dv_img = null;
	if(txt != null){
		dv_txt = document.createElement('div');
		dv_txt.id = txt_id;
		dv_txt.className = 'point-item';
		dv_txt.innerText = txt;
	}

	if(img != null){
		dv_img = document.createElement('div');
		dv_img.classList.add("image_container");
		dv_img.style.width = '20wh';
		dv_img.style.height = '20vh';

		const imagen = document.createElement('img');
		imagen.src = img;
		imagen.style.width = '100%';
		imagen.style.height = '100%';
		imagen.style.objectFit = 'contain';

		dv_img.appendChild(imagen);
	}

	const itm_id = "topic_" + gvar.curr_idx;
	if((dv_txt != null) && (dv_img == null)){
		dv_itm = dv_txt;
		txt_id = itm_id;
	}
	if((dv_txt == null) && (dv_img != null)){
		dv_itm = dv_img;
	}
	if((dv_txt != null) && (dv_img != null)){
		dv_itm = document.createElement('div');
		dv_itm.classList.add("mix_container");

		dv_img.classList.add("image_grid_pos");
		dv_txt.classList.add("text_grid_pos");

		dv_itm.appendChild(dv_img);
		dv_itm.appendChild(dv_txt);
	}
	dv_itm.id = itm_id;
	dv_itm.txt_id = txt_id;

	act.tpc.tdv = dv_itm;

	return dv_itm;
}

function send_space_key(elemento = document) {
    // Evento de presionar
    const downEvent = new KeyboardEvent('keydown', {
        key: ' ', code: 'Space', keyCode: 32, which: 32, bubbles: true, cancelable: true
    });

    // Evento de soltar
    const upEvent = new KeyboardEvent('keyup', {
        key: ' ', code: 'Space', keyCode: 32, which: 32, bubbles: true, cancelable: true
    });

    elemento.dispatchEvent(downEvent);
    elemento.dispatchEvent(upEvent);
}

// gurdar historia movimientos en cada imagen y punto
// show div
// hide div
// show image in div
// hide image in div
// move image from div to div

/*
async function obs_change_scene(nam_sc) {
  try {
    // 1. Conectar al servidor de OBS
    console.log('Connecting to OBS...');
    await obs.connect(OBS_ADDRESS, OBS_PASSWORD);
    console.log('¡Conectado exitosamente!');

    // 2. Enviar petición para cambiar la escena activa
    await obs.call('SetCurrentProgramScene', {
      sceneName: nam_sc
    });

    console.log(`Changed to scene: "${nam_sc}"`);

  } catch (error) {
    console.error('Error while trying to change scene:', error.message || error);
  } finally {
    // 3. Desconectar cliente
    await obs.disconnect();
    console.log('Desconectado de OBS.');
  }
}

*/
