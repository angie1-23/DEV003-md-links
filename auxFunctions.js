//Funciones Fs para utilizar en  mdLinks
const fs = require("fs");
const path = require('path');
const fetch = require('node-fetch');


// Verificar que la ruta existe 
const pathValid = (path) => { return fs.existsSync(path) };

//Verificar si la ruta es absoluta o relativa y se convierte en absoluta
const pathAbs = (way) => (path.isAbsolute(way) ? (way) : path.resolve(way));

// Verificar si la ruta absoluta archivo 
const isFile= (way) =>{return fs.statSync(way).isFile()};

const pathInfo = (way) => { return fs.statSync(way).isDirectory()};
// Extension de un archivo 
const fileMd = (way) => path.extname(way);

// Leer un directorio 
const readAllFiles = (way, arrayOfFiles = []) => {
	if (isFile(way)) {
		arrayOfFiles.push(way);
	}else{
		const files = fs.readdirSync(way);
	files.forEach(file => {
		const stat = fs.statSync(`${way}/${file}`)
		if (stat.isDirectory()) {
			readAllFiles(`${way}/${file}`, arrayOfFiles)
		} else {
			arrayOfFiles.push(`${way}/${file}`)
		}
	});
	}
	return arrayOfFiles
};
// console.log(readAllFiles('direc'));
// console.log(readAllFiles('prueba.md'));
const onlyMd = (way) => { return readAllFiles(way).filter((file => path.extname(file) === '.md')) };

// como leer un archivo
const fileR = (way) => {
	return new Promise((resolve, reject) => {
		fs.readFile(way, 'utf-8', (err, data) => {
			if (err) {
				reject('error: ', err);
			} else {
				resolve(data);
			}
		});
	});
};

const getLinks = (way) => {
	return new Promise ((resolve, reject)=> {
	let arrayLinks =[];
	const regEx = /\[(.*)\]\(((?:\/|https?:\/\/).*)\)/gi;
	arrayLinks = onlyMd(way).map((linkmd) => fileR(linkmd)
		.then((response) => {
			let arrayAux = [];
			let match;
			while((match = regEx.exec(response)) !== null) {
				arrayAux.push({
					href: match[2],
          text: match[1],
					file: linkmd,
				});
			}
			return arrayAux;
			})

		.catch((error) => reject('error: ',`${error}`))
	);
	resolve(Promise.all(arrayLinks));
});
};

const getLinkStatus = (array) => {
	let statusLink = []; 
		statusLink = array.map((link) => fetch(link.href)
			.then((response) => { 
				return {
				href: link.href,
				text: link.text,
				file: link.file,
				status: response.status,
				message: response.status >= 200 && response.status < 400 ? 'Ok' : 'Fail',
			}
			}).catch((error) => { 
				return {
				href: link.href,
				text: link.text,
				file: link.file,
				status:'Fail',
				message: error.code,
			}
			})
		);
	return Promise.all(statusLink);
};

const concatArr = (arrayofarrays) => {
	let finalArray = [];
	arrayofarrays.forEach(array => {
		finalArray = finalArray.concat(array);
	});
	return finalArray
};

module.exports = {
	pathValid,
	pathAbs,
	pathInfo,
	fileMd,
	readAllFiles,
	onlyMd,
	fileR,
	getLinks,
	getLinkStatus,
	isFile,
	concatArr,
};