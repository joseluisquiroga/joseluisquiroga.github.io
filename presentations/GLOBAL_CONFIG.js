
import OBSWebSocket from 'obs-websocket-js';

export const gvar = {};

export function init_obs_conf(){
	gvar.OBS_CONFIG = {};
	gvar.OBS_CONFIG.address = 'ws://127.0.0.1:4455';
	gvar.OBS_CONFIG.password = 'msJqnxsD3NGIYVPR';
	gvar.OBS_CONFIG.rojo = 'CEL_ROJO_WEB';
	gvar.OBS_CONFIG.rojo_ninja_id = 'wantPoseqT';
}

export function init_carla_conf(){
	gvar.CARLA_CONFIG = {};
	gvar.CARLA_CONFIG.session_path = `/home/jose/devel/jlq_working/Canal_Youtube/AUDIO_OBS/CONFIG_AUDIO_OBS.carxp`;
}

export function init_sounds(){
	const dir_sounds = "../sounds";
	gvar.sound = {};
	gvar.sound.camera_shutter_1 = new Audio(`${dir_sounds}/camera_shutter_1.wav`);
	gvar.sound.camera_shutter_2 = new Audio(`${dir_sounds}/camera_shutter_2.wav`);
	gvar.sound.cinematic_hit_horns = new Audio(`${dir_sounds}/cinematic_hit_horns.wav`);
	gvar.sound.click_1 = new Audio(`${dir_sounds}/click_1.wav`);
	gvar.sound.click_2 = new Audio(`${dir_sounds}/click_2.wav`);
	gvar.sound.cricket_1 = new Audio(`${dir_sounds}/cricket_1.wav`);
	gvar.sound.crickets_1 = new Audio(`${dir_sounds}/crickets_1.wav`);
	gvar.sound.disapointment_wha_wha_wha_1 = new Audio(`${dir_sounds}/disapointment_wha_wha_wha_1.wav`);
	gvar.sound.disapointment_wha_wha_wha_2 = new Audio(`${dir_sounds}/disapointment_wha_wha_wha_2.wav`);
	gvar.sound.disapointment_wha_wha_wha_3 = new Audio(`${dir_sounds}/disapointment_wha_wha_wha_3.wav`);
	gvar.sound.explosion_1 = new Audio(`${dir_sounds}/explosion_1.wav`);
	gvar.sound.explosion_2 = new Audio(`${dir_sounds}/explosion_2.wav`);
	gvar.sound.explosion_3 = new Audio(`${dir_sounds}/explosion_3.wav`);
	gvar.sound.glass_breaking_1 = new Audio(`${dir_sounds}/glass_breaking_1.wav`);
	gvar.sound.glass_breaking_2 = new Audio(`${dir_sounds}/glass_breaking_2.wav`);
	gvar.sound.glass_breaking_3 = new Audio(`${dir_sounds}/glass_breaking_3.wav`);
	gvar.sound.glass_breaking_4 = new Audio(`${dir_sounds}/glass_breaking_4.wav`);
	gvar.sound.gun_shot = new Audio(`${dir_sounds}/gun_shot.wav`);
	gvar.sound.heartbeat_1 = new Audio(`${dir_sounds}/heartbeat_1.wav`);
	gvar.sound.heartbeat_2 = new Audio(`${dir_sounds}/heartbeat_2.wav`);
	gvar.sound.implosion = new Audio(`${dir_sounds}/implosion.wav`);
	gvar.sound.laser_shot_1 = new Audio(`${dir_sounds}/laser_shot_1.wav`);
	gvar.sound.laser_shot_2 = new Audio(`${dir_sounds}/laser_shot_2.wav`);
	gvar.sound.owl_hooting = new Audio(`${dir_sounds}/owl_hooting.wav`);
	gvar.sound.paper_tearing_1 = new Audio(`${dir_sounds}/paper_tearing_1.wav`);
	gvar.sound.paper_tearing_2 = new Audio(`${dir_sounds}/paper_tearing_2.wav`);
	gvar.sound.snap_1 = new Audio(`${dir_sounds}/snap_1.wav`);
	gvar.sound.snap_2 = new Audio(`${dir_sounds}/snap_2.wav`);
	gvar.sound.swoosh_01 = new Audio(`${dir_sounds}/swoosh_01.wav`);
	gvar.sound.swoosh_02 = new Audio(`${dir_sounds}/swoosh_02.wav`);
	gvar.sound.swoosh_03 = new Audio(`${dir_sounds}/swoosh_03.wav`);
	gvar.sound.swoosh_04 = new Audio(`${dir_sounds}/swoosh_04.wav`);
	gvar.sound.swoosh_05 = new Audio(`${dir_sounds}/swoosh_05.wav`);
	gvar.sound.swoosh_06 = new Audio(`${dir_sounds}/swoosh_06.wav`);
	gvar.sound.swoosh_07 = new Audio(`${dir_sounds}/swoosh_07.wav`);
	gvar.sound.swoosh_08 = new Audio(`${dir_sounds}/swoosh_08.wav`);
	gvar.sound.swoosh_09 = new Audio(`${dir_sounds}/swoosh_09.wav`);
	gvar.sound.swoosh_10 = new Audio(`${dir_sounds}/swoosh_10.wav`);
	gvar.sound.swoosh_11 = new Audio(`${dir_sounds}/swoosh_11.wav`);
	gvar.sound.swoosh_12 = new Audio(`${dir_sounds}/swoosh_12.wav`);
	gvar.sound.swoosh_13 = new Audio(`${dir_sounds}/swoosh_13.wav`);
	gvar.sound.swoosh_14 = new Audio(`${dir_sounds}/swoosh_14.wav`);
	gvar.sound.vinyl_scratch_1 = new Audio(`${dir_sounds}/vinyl_scratch_1.wav`);
	gvar.sound.vinyl_scratch_2 = new Audio(`${dir_sounds}/vinyl_scratch_2.wav`);
	gvar.sound.whip = new Audio(`${dir_sounds}/whip.wav`);

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

export async function send_space_key(delay_ms = 0, elemento = document) {
	if(delay_ms > 0){
		await new Promise(resolve => setTimeout(resolve, delay_ms));
	}

    const downEvent = new KeyboardEvent('keydown', {
        key: ' ', code: 'Space', keyCode: 32, which: 32, bubbles: true, cancelable: true
    });

    const upEvent = new KeyboardEvent('keyup', {
        key: ' ', code: 'Space', keyCode: 32, which: 32, bubbles: true, cancelable: true
    });

    elemento.dispatchEvent(downEvent);
    elemento.dispatchEvent(upEvent);
}

export async function obs_change_scene(act) {
	if(act == null){ console.error(`act == null`); }
	if(act.sce == null){ console.error(`act.sce == null`); }

	try {
		const nam_sc = act.sce;
		const obs = gvar.obs_wsocket;

		console.log('Connecting to OBS...');
		await obs.connect(gvar.OBS_CONFIG.address, gvar.OBS_CONFIG.password);
		console.log('¡Conectado exitosamente!');

		await obs.call('SetCurrentProgramScene', {
			sceneName: nam_sc
		});

		console.log(`Changed to scene: "${nam_sc}"`);

	} catch (error) {
		console.error('Error while trying to change scene:', error.message || error);
	} finally {
		// 3. Desconectar cliente
		await obs.disconnect();
		console.log('Disconnected from OBS.');
	}
}

export function init_cursor(){
	const dv_cursor = document.createElement('div');
	dv_cursor.classList.add("cursor");
	dv_cursor.style.display = "block";

	document.body.appendChild(dv_cursor);

	document.addEventListener("mousemove", (e) => {
		dv_cursor.style.left = e.clientX + "px";
		dv_cursor.style.top = e.clientY + "px";
	});
}

export function init_wobs(){
	gvar.obs_wsocket = new OBSWebSocket();
}


