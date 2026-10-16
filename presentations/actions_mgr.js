

// 2. Registrar explícitamente el plugin Flip en GSAP
gsap.registerPlugin(SplitText);
gsap.registerPlugin(Flip);

const gvar = {};

function init_containers(){
	gvar.stage = document.getElementById('id_stage');
	gvar.sidebar = document.getElementById('id_sidebar');
}

function do_toggle_sidebar() {
	gvar.sidebar.classList.toggle('hidden');
}

export async function start_actions(){
	document.addEventListener('keydown', function(ev1) {
		if (ev1.code === 'Space') {
			ev1.preventDefault();

			//do_next();
			do_next_action();
		}
	});

	const but_togg = document.getElementById("toggle_sidebar");
	but_togg.addEventListener('click', do_toggle_sidebar);

	console.log(window.location.href);
	console.log(window.location.pathname);

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
		txt: "1. Introducción a la arquitectura del sistema",
		tdv: null,
	},
	t2: {
		txt: "2. Configuración óptima de hardware",
		tdv: null,
	},
	t3: {
		txt: "3. Optimización de rendimiento en tiempo real",
		tdv: null,
	},
	t4: {
		txt: "4. Conclusiones y buenas prácticas",
		tdv: null,
	},
};

const images = {
	i1: {
		ref: "./img/",
	},
};

function init_actions(){
	const actions = {
		a1: {
			tpc: topics.t1,
			dst: gvar.stage,
			fnc: add_topic,
		},
		a2: {
			tpc: topics.t1,
			dst: gvar.sidebar,
			fnc: move_topic_to_div,
		},
		a3: {
			tpc: topics.t2,
			dst: gvar.stage,
			fnc: add_topic,
		},
		a4: {
			tpc: topics.t2,
			dst: gvar.sidebar,
			fnc: move_topic_to_div,
		},
		a5: {
			tpc: topics.t3,
			dst: gvar.stage,
			fnc: add_topic,
		},
		a6: {
			tpc: topics.t3,
			dst: gvar.sidebar,
			fnc: move_topic_to_div,
		},
		a7: {
			tpc: topics.t4,
			dst: gvar.stage,
			fnc: add_topic,
		},
		a8: {
			tpc: topics.t4,
			dst: gvar.sidebar,
			fnc: move_topic_to_div,
		},
	};

	gvar.actions = actions;
	gvar.id_actions = Object.keys(actions);
}

function add_topic(act){
	if(act == null){ console.error(`act == null`); }
	if(act.tpc == null){ console.error(`act.tpc == null`); }
	if(act.dst == null){ console.error(`act.dst == null`); }

	const txt = act.tpc.txt;
	if(txt == null){ console.error(`txt == null`); }

	const nw_itm = document.createElement('div');
	nw_itm.id = "topic_" + gvar.curr_idx;
	nw_itm.className = 'point-item';
	//nw_itm.innerText = str_pt;
	nw_itm.innerText = txt;
	nw_itm.prv_divs = [];

	act.tpc.tdv = nw_itm;
	act.dst.appendChild(nw_itm);

	let snd = gvar.sound.swoosh_01;
	if(snd != null){
		snd.currentTime = 0;
		snd.play().catch(error => {
			console.log("Audio failed:", error);
		});
	}

	// Animación de entrada estilo Animate.css (Zoom/Bounce in)
	gsap.fromTo(nw_itm,
		{
			x: -750,
			y: -650,
			scale: 0.5, opacity: 0,
		},
		{
			x: 0,
			y: 0,
			scale: 1, opacity: 1,
			duration: 1, ease: "back.out(1.7)"
		},
	);

	console.log(nw_itm.id);
	let split = SplitText.create("#" + nw_itm.id, {type:"chars,words,lines"});

	let animation;
	animation && animation.revert();
	animation = gsap.from(split.words, {
		x: -200,
		y: -100,
		opacity: 0,
		rotation: 90,
		duration: 2.7,
		ease: "back",
		stagger: 0
	});
}

function remove_topic(act){
	if(act == null){ console.error(`act == null`); }
	if(act.tpc == null){ console.error(`act.tpc == null`); }
	if(act.tpc.tdv == null){ console.error(`act.tpc.tdv == null`); }

	const itm = act.tpc.tdv;

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
			x: -750,
			y: -650,
			scale: 0.5, opacity: 0,
			duration: 1, ease: "back.out(1.7)"
		},
	);

	itm.remove();
}

function move_topic_to_div(act){
	if(act == null){ console.error(`act == null`); }
	if(act.tpc == null){ console.error(`act.tpc == null`); }
	if(act.dst == null){ console.error(`act.dst == null`); }

	const itm = act.tpc.tdv;
	const src_dv = itm.parentNode;
	if(src_dv == null){ console.error(`src_dv == null`); }

	const state = Flip.getState(itm);
	act.dst.appendChild(itm);

	if(itm.prv_divs != null){ itm.prv_divs.push(src_dv); }

	Flip.from(state, {
		duration: 0.7,
		ease: "power2.inOut",
		absolute: true, // Permite una transición limpia entre contenedores con diferente posicionamiento
		scale: true,
	});
}

function do_next_action() {
	if(gvar.id_actions == null){ console.error(`gvar.id_actions == null`); }
	if(gvar.curr_idx == null){
		gvar.curr_idx = 0;
	}
	if(gvar.curr_idx >= gvar.id_actions.length){
		return;
	}

	const nxt_id = gvar.id_actions[gvar.curr_idx];
	const nxt_act = gvar.actions[nxt_id];

	if(nxt_act.fnc == null){ console.error(`nxt_act.fnc == null`); }
	nxt_act.fnc(nxt_act);

	gvar.curr_idx++;
}

function undo_last_action() {
	if(gvar.id_actions == null){ console.error(`gvar.id_actions == null`); }
	if(gvar.curr_idx == null){
		gvar.curr_idx = 0;
	}
	gvar.curr_idx--;
	if(gvar.curr_idx < 0){
		return;
	}

	const prv_id = gvar.id_actions[gvar.curr_idx];
	const prv_act = gvar.actions[prv_id];
}

// gurdar historia movimientos en cada imagen y punto
// show div
// hide div
// show topic in div
// hide topic in div
// move topic from div to div
// show image in div
// hide image in div
// move image from div to div

