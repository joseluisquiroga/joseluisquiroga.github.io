
import { gvar, init_obs_conf, init_sounds, send_space_key, obs_change_scene, init_cursor } from '../GLOBAL_CONFIG.js';

gsap.registerPlugin(SplitText);
gsap.registerPlugin(Flip);

function init_containers(){
	gvar.prompt = document.getElementById('id_prompt');
	//gvar.prompt.classList.add('hidden');

	gvar.stage = document.getElementById('id_stage');
	//gvar.stage.classList.add('hidden');

	gvar.sidebar = document.getElementById('id_sidebar');
	gvar.sidebar.classList.add('hidden');

	gvar.sidebar.addEventListener('transitionend', async function(e) {
		if((e.propertyName === 'transform') && (gvar.current_action != null)){
			const tm = gvar.current_action.dtm;
			if(tm != null){ await send_space_key(tm); gvar.current_action = null; }
		}
	});

	gvar.item0 = document.getElementById('id_item0');
	gvar.item1 = document.getElementById('id_item1');
	gvar.item2 = document.getElementById('id_item2');
	gvar.item3 = document.getElementById('id_item3');
	gvar.item4 = document.getElementById('id_item4');
}

function hide_container(act) {
	if(act == null){ console.error(`act == null`); }
	gvar.current_action = act;
	if(act.dst == null){ console.error(`act.dst == null`); }

	let snd = gvar.sound.swoosh_09;
	if(snd != null){
		snd.currentTime = 0;
		snd.play().catch(error => {
			console.log("Audio failed:", error);
		});
	}

	act.dst.classList.add('hidden');
}

function show_container(act) {
	if(act == null){ console.error(`act == null`); }
	gvar.current_action = act;
	if(act.dst == null){ console.error(`act.dst == null`); }

	let snd = gvar.sound.swoosh_11;
	if(snd != null){
		snd.currentTime = 0;
		snd.play().catch(error => {
			console.log("Audio failed:", error);
		});
	}

	act.dst.classList.remove('hidden');
}

function do_toggle_sidebar() {
	gvar.sidebar.classList.toggle('hidden');
}

export async function start_actions(){
	document.addEventListener('keydown', async function(ev1) {
		if(ev1.code === 'Space'){
			ev1.preventDefault();

			//do_next();
			await do_next_action();
		}
		if(ev1.key === 'ArrowLeft'){
			ev1.preventDefault();
			await do_next_action(true);
		}
		if(ev1.key === 'ArrowRight'){
			ev1.preventDefault();
			await do_next_action();
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
	init_obs_conf();

	set_prompt();
}

const topics = {
	t1: {
		img: '../img/boy_gossip.webp',
		txt: "1. Introducción a la arquitectura del sistema",
		tdv: null,
	},
	vida_eterna: {
		txt: "La Vida Eterna",
		tdv: null,
	},
	muertos: {
		txt: "Muertos",
		tdv: null,
	},
	conciencia: {
		txt: "Conciencia",
		tdv: null,
	},
	resurreccion: {
		txt: "Resurreccion",
		tdv: null,
	},
};

function init_actions(){
	const actions = {
		a1: {
			tpc: topics.t1,
			dst: gvar.stage,
			fnc: add_topic,
			//dtm: 600,
		},
		a1_1: {
			dst: gvar.sidebar,
			fnc: show_container,
			dtm: 600,
		},
		a1_2: {
			tpc: topics.t1,
			dst: gvar.item0,
			hide_img: true,
			fnc: move_topic_to_div,
			dtm: 600,
		},
		a1_3: {
			dst: gvar.sidebar,
			fnc: hide_container,
		},
		/*a2: {
			tpc: topics.t1,
			fnc: remove_topic,
		},*/
		obs1: {
			sce: `ROJO`,
			fnc: obs_change_scene,
		},
		obs2: {
			sce: `EVERIO`,
			fnc: obs_change_scene,
		},
		obs3: {
			sce: `ROJO`,
			fnc: obs_change_scene,
		},
		a3: {
			tpc: topics.vida_eterna,
			dst: gvar.stage,
			fnc: add_topic,
		},
		a3_1: {
			dst: gvar.sidebar,
			fnc: show_container,
			dtm: 600,
		},
		a4: {
			tpc: topics.vida_eterna,
			dst: gvar.item1,
			fnc: move_topic_to_div,
			//dtm: 600,
		},
		a4_1: {
			dst: gvar.sidebar,
			fnc: hide_container,
		},
		a5: {
			tpc: topics.muertos,
			dst: gvar.stage,
			fnc: add_topic,
		},
		a5_1: {
			dst: gvar.sidebar,
			fnc: show_container,
			dtm: 600,
		},
		a6: {
			tpc: topics.muertos,
			dst: gvar.item2,
			fnc: move_topic_to_div,
			dtm: 600,
		},
		a6_1: {
			dst: gvar.sidebar,
			fnc: hide_container,
		},
		a7: {
			tpc: topics.conciencia,
			dst: gvar.stage,
			fnc: add_topic,
		},
		a7_1: {
			dst: gvar.sidebar,
			fnc: show_container,
			dtm: 600,
		},
		a7_2: {
			tpc: topics.conciencia,
			dst: gvar.item3,
			fnc: move_topic_to_div,
			dtm: 600,
		},
		a7_3: {
			dst: gvar.sidebar,
			fnc: hide_container,
		},
		a8: {
			tpc: topics.resurreccion,
			dst: gvar.stage,
			fnc: add_topic,
		},
		a8_1: {
			dst: gvar.sidebar,
			fnc: show_container,
			dtm: 600,
		},
		a8_2: {
			tpc: topics.resurreccion,
			dst: gvar.item4,
			fnc: move_topic_to_div,
			dtm: 600,
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
		onComplete: async function() {
			if(act.dtm != null){ await send_space_key(act.dtm); }
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

	let snd = gvar.sound.swoosh_05;
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
			onComplete: async function() {
				itm.remove();
				if(act.dtm != null){ await send_space_key(act.dtm); }
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
		if(act.show_img && (itm.dv_img != null)){
			itm.dv_img.classList.add("hide");
		}
		if(act.hide_img && (itm.dv_img != null)){
			itm.dv_img.classList.remove("hide");
		}
		return;
	}

	if(act.show_img && (itm.dv_img != null)){
		itm.dv_img.classList.remove("hide");
	}
	if(act.hide_img && (itm.dv_img != null)){
		itm.dv_img.classList.add("hide");
	}

	const src_dv = itm.parentNode;
	if(src_dv == null){ console.error(`src_dv == null`); }

	const state = Flip.getState(itm);
	act.dst.appendChild(itm);

	act.tpc.prv_divs.push(src_dv);

	let snd = gvar.sound.swoosh_07;
	if(snd != null){
		snd.currentTime = 0;
		snd.play().catch(error => {
			console.log("Audio failed:", error);
		});
	}

	Flip.from(state, {
		duration: 0.7,
		ease: "power2.inOut",
		absolute: true, // Permite una transición limpia entre contenedores con diferente posicionamiento
		scale: true,
		onComplete: async function() {
			if(act.dtm != null){ await send_space_key(act.dtm); }
		},
	});
}

function set_prompt(){
	if(gvar.id_actions == null){ console.error(`gvar.id_actions == null`); }
	let nxt_idx = gvar.curr_idx;
	let msg = "INVALID_ACTION";
	if(nxt_idx == null){ nxt_idx = 0; }
	if(nxt_idx >= gvar.id_actions.length){ msg = "ENDED_ACTIONS"; }

	const id = gvar.id_actions[nxt_idx];
	const act = gvar.actions[id];
	if(act == null){ console.error(`act == null`); }

	msg = JSON.stringify(act);

	gvar.prompt.innerText = msg;
}

async function do_next_action(do_und) {
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
		await nxt_act.fnc(nxt_act);
	} catch(err) {
		console.error(`Action ${nxt_id} failed with\n ${err}`);
	}

	if(do_und == null){
		gvar.curr_idx++;
	}

	set_prompt();
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
	dv_itm.dv_img = dv_img;

	act.tpc.tdv = dv_itm;

	return dv_itm;
}

