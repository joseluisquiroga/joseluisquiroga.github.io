
import { gvar, init_carla_conf, init_obs_conf, init_wobs } from './GLOBAL_CONFIG.js';
import { spawn, execSync, exec } from 'node:child_process';
import { promisify } from 'node:util';
//import { exec } from 'node:child_process/promises';

/*

const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

*/

import os from 'node:os';

const execPromise = promisify(exec);

async function create_virtual_sink() {
    try {
        // Obtenemos la lista corta de sinks activos en PipeWire
        const { stdout: sinks } = await execPromise('pactl list sinks short');

		console.log(`FOUND sinks:`);
		console.log(sinks);

        if(!sinks.includes('Firefox_a_OBS')) {
            await execPromise('pactl load-module module-null-sink sink_name=Firefox_a_OBS sink_properties=device.description="Firefox_a_OBS"');
            console.log('-> Sumidero virtual creado exitosamente.');
        } else {
            console.log('-> El sumidero virtual "Firefox_a_OBS" ya existe. Omitiendo creación.');
        }

    } catch (error) {
        console.error('Error al gestionar el sink:', error.message);
    }
}

function get_usb_ip() {
	const interfaces = os.networkInterfaces();
	for (const name of Object.keys(interfaces)) {
		// Check for common USB tethering interface names (e.g., usb0, enx..., eth...)
		if(name.startsWith('usb') || name.startsWith('enp')){
			for (const net of interfaces[name]) {
				if (net.family === 'IPv4' && !net.internal) {
					return net.address;
				}
			}
		}
	}

	try {
		const output = execSync('ip -4 addr show').toString();
		const match = output.match(/inet\s+(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}).*?(usb|enp)/i);
		if (match) return match[1];
	} catch (e) {
		console.warn('Could not auto-detect phone IP via shell command.');
	}
	return null;
}

// Update OBS Browser Source URL via WebSocket
async function update_obs_source_url(ipAddress) {
	const obs = gvar.obs_wsocket;
	try {
		await obs.connect(gvar.OBS_CONFIG.address, gvar.OBS_CONFIG.password);
		console.log(`🔗 [OBS-WebSocket] Connected successfully. Trying to update ${gvar.OBS_CONFIG.rojo}`);

		await obs.call('SetCurrentProgramScene', {
			sceneName: "EVERIO",
		});

		const newUrl = `https://vdo.ninja/?view=${gvar.OBS_CONFIG.rojo_ninja_id}&ip=${ipAddress}`;

		await obs.call('SetInputSettings', {
			inputName: gvar.OBS_CONFIG.rojo,
			inputSettings: {
				url: newUrl
			}
		});
		// The specified source is not an input.

		console.log(`✅ [OBS] Browser source "${gvar.OBS_CONFIG.rojo}" updated to:\n   ${newUrl}`);
		await obs.disconnect();
	} catch (error) {
		console.error('❌ [OBS-WebSocket] Error updating source setting:', error.message);
	}
}

async function main() {
	console.log('🚀 Starting presentation environment...');

	init_carla_conf();
	init_obs_conf();
	init_wobs();

	const phoneIP = get_usb_ip();
	if (phoneIP) {
		console.log(`📱 [Network] Detected phone USB IP: ${phoneIP}`);
	} else {
		console.log('⚠️ [Network] Phone USB IP not detected. Check USB tethering on your mobile device.');
	}


	console.log('⚡ [Vite] Starting Vite development server...');
	const vite = spawn('npx', ['vite', '--open'], { stdio: 'inherit', shell: true });

	console.log('🎥 [OBS] Launching OBS Studio...');
	const obsProcess = spawn('obs', [], { detached: true, stdio: 'ignore' });
	obsProcess.unref();


	const carla_sess_path = gvar.CARLA_CONFIG.session_path;

	setTimeout(() => {
		console.log('🎧 [Carla] Launching Carla audio host...');
		const carla = spawn('carla', [carla_sess_path], { detached: true, stdio: 'ignore' });

		carla.on('error', (err) => {
			console.error('Failed to start Carla:', err);
		});

		carla.unref();
	}, 3000);


	if (phoneIP) {
		console.log('⏳ Waiting 3 seconds for OBS WebSocket server to initialize...');
		setTimeout(() => {
			update_obs_source_url(phoneIP);
		}, 3000);
	}

	setTimeout( async () => {
		await configure_audio_firefox_to_obs();
	}, 3000);

	process.on('SIGINT', async () => {
		console.log('\n🛑 Shutting down presentation environment...');
		vite.kill();
		await execPromise(`pactl set-default-sink alsa_output.pci-0000_69_00.6.analog-stereo`);
		await remove_sink_virtual();
		process.exit(0);
	});
}

async function configure_audio_firefox_to_obs() {
	try {
		await create_virtual_sink();

		await execPromise(`pactl set-default-sink Firefox_a_OBS`);

		await execPromise(`pw-link "Firefox_a_OBS:monitor_FL" "OBS Studio: ENTRADA_AUDIO_CARLA:in_1"`).catch((err) => { console.error(err); });
		await execPromise(`pw-link "Firefox_a_OBS:monitor_FR" "OBS Studio: ENTRADA_AUDIO_CARLA:in_2"`).catch((err) => { console.error(err); });

		console.log("¡Configuración de audio completada con éxito!");

	} catch (error) {
		console.error("Error durante la configuración del audio:", error.message);
	}
}

async function remove_sink_virtual() {
    try {
        // Obtenemos la lista corta de sinks activos en PipeWire
        const { stdout: sinks } = await execPromise('pactl list short');

		const lineas = sinks.trim().split('\n');

		//console.log(`FULL list:`);
		//console.log(lineas);

		let ii = 0;
		for(ii = 0; ii < lineas.length; ii++){
			const lin = lineas[ii];
			if(lin.includes('module-null-sink') && lin.includes('Firefox_a_OBS')){
				console.log(`FOUND sink ${lin}`);
				const flds = lin.trim().split(/\s/);
				const id = flds[0];
				console.log(`FOUND id ${id}`);
				await execPromise(`pactl unload-module ${id}`);
				break;
			}
		}

    } catch (error) {
        console.error('Error al gestionar el sink:', error.message);
    }
}


//configure_audio_firefox_to_obs();
//remove_sink_virtual();

main();
