
import { execFileSync } from 'node:child_process';

import * as filesys from "node:fs";
import * as readline from "node:readline";
import * as videoteca from './all_vids.js';

import { unlink } from 'node:fs/promises';


const HTML_HEAD = `
<!doctype html>
<html lang="en">
	<head>
		<!-- Required meta tags -->
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

		<!-- Bootstrap CSS -->
		<link rel="stylesheet" href="../bootstrap/bootstrap.css">

		<title>joseluisquiroga.github.io</title>

		<meta name="description" content="Pagina personal de Jose Luis Quiroga.">
		<meta name="author" content="Jose Luis Quiroga">
		<link rel="icon" href="../foto_mia_01.JPG">

		<style>
		.hebreo:lang(he) {
			direction: rtl;
		}
		.griego:lang(el) {
			direction: ltr;
		}
		</style>
	</head>
	<body>


<div class="container">

		<br>
		<br>
      <h1>Videoteca</h1>

      <br>
      <br>
      <p></p>
      <div class="row">
        <div class="col-12 col-sm-12">
			<br>
`;

const HTML_TAIL = `
			<br>
			<br>
			<br>
			<br>
        </div>
      </div>

</div><!-- /.container -->

	<!-- Optional JavaScript -->
	<!-- jQuery first, then Popper.js, then Bootstrap JS -->
	<script src="../bootstrap/jquery-3.js"></script>
	<script src="../bootstrap/popper.js"></script>
	<script src="../bootstrap/bootstrap.js"></script>
	</body>
</html>

`;


async function delete_file(fl_nm) {
    try {
        await unlink(fl_nm);
        console.log('DELETED ' + fl_nm);
    } catch (error) {
        console.error('Error deleting file:' + fl_nm, error.message);
    }
}

function write_file(full_file, fout_nm){
	const all_verses = JSON.stringify(full_file, null, "  ");
	const pth = "./" + fout_nm;

	const file_str = `

export const sdic =
${all_verses};

`;

	filesys.writeFileSync(pth, file_str);
	console.log("WROTE FILE=" + pth);
}

async function do_file(){

	/*if(process.argv.length < 3) {
		console.log('Usage: node ' + process.argv[1] + ' <command>');
		process.exit(1);
	}*/
	
	let out_nm = "out_EN_uni_trans.js";
	if(process.argv.length > 2){
		out_nm = process.argv[2];
	}

	//await delete_file(out_nm);

	/*
		const rxo = new RegExp(rxstr);
		const mm = txt_bib.match(rxo);
		if(mm){
			num_find++;
		}

	*/

	console.log(HTML_HEAD);

	const videos = videoteca.all_lists;

	let ii = 0;
	let keys = Object.keys(videos);

	keys.sort((aa, bb) => aa.localeCompare(bb, 'es', { sensitivity: 'base' }));

	console.log(`<h2>Listas</h2>`);
	//for(ii = 0; ii < 10; ii++){
	//	const kk = keys[ii];
	for(const kk of keys){
		console.log(`<a href="#lst_${kk}">${kk}</a><br>`);
	}
	for(const kk of keys){
		console.log(`<h2 id="lst_${kk}">${kk}</h2>`);
		const lvids = videos[kk];
		for(const vv of lvids){
			console.log(`<li><a href="${vv.lnk}">${vv.tit}</a></li>`);
		}
		//const str_obj_trans = JSON.stringify(obj_trans, null, 2);
		//filesys.appendFileSync(out_nm, `${kk}:${str_obj_trans},\n`, 'utf-8');
	}
	//write_file(dic_en, out_nm);

	console.log(HTML_TAIL);
}

do_file();


