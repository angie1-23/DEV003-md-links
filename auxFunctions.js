//Funciones Fs para utilizar en  mdLinks
const fs = require("fs");
const path = require('path');
const fetch = require('node-fetch');


// Verificar que la ruta existe 
const pathValid = (path) => { return fs.existsSync(path) };

//Verificar si la ruta es absoluta o relativa y se convierte en absoluta
const pathAbs = (way) => (path.isAbsolute(way) ? (way) : path.resolve(way));

const isFile= (way) =>{return fs.statSync(way).isFile()};
// console.log(isFile('C:/Users/Estefania/Desktop/mdLinks/DEV003-md-links/prueba.md'))
// Verificar si la ruta absoluta es un directorio o archivo 
const pathInfo = (way) => { return fs.statSync(way).isDirectory()};

// Verificar si la ruta absoluta es un directorio o archivo 


// Extension de un archivo 
const fileMd = (way) => path.extname(way);

// Filtrar la extension de un archivo

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
const onlyMd = (way) => { return readAllFiles(way).filter((file => path.extname(file) === '.md')) };
// console.log(onlyMd('prueba.md'));

// console.log(onlyMd('direc'));


// const returnOnlyFilesMd = (routeFile) => {
//     return arrayForFiles(routeFile).filter((file => path.extname(file) === '.md'));
// };

// const chalk = require('chalk');
// const figlet = require('figlet');

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
// fileR('prueba.md').then((response) => {
// 	console.log(response);
// });

// const getLinks = (linkmd) => {
// 	return new Promise((resolve, reject) => {
// 		let arrayLinks = [];
// 			const rgexURL = /\(((?:\/|https?:\/\/).*)\)/g; // obtiene (links) contenidos en cada archivo
// 			const regExp = /\[(.*)\]\(((?:\/|https?:\/\/).*)\)/gi; // obtiene [textoReferenciaDelLink] y (links)
// 			const regText = /\[(.*)\]/g; // obtiene [textoReferenciaDelLink]
// 			fileR(linkmd).then((response) => {
// 				const other = response.match(regExp);
// 				// let match = regEx.exec(response);
// 				// console.log(other);
// 				if (other != null) {
// 					const arrayOfLinks = other.map((links) => {
// 						const uniqueLinks = links.match(rgexURL).join().slice(1, -1);
// 						const uniqueText = links.match(regText).join().slice(1, -1);
// 						return {
// 							href: uniqueLinks,
// 							text: uniqueText,
// 							file: linkmd,
// 						};
// 					});
// 					arrayLinks = arrayLinks.concat(arrayOfLinks);
// 				}
// 				resolve(arrayLinks);
// 				// console.log(arrayLinks);
// 			})
// 			.catch((error) => reject(error));
// 	});
// }
// console.log(getLinks("direc"));

// const getLinks = (way) => {
// 	return new Promise ((resolve, reject)=> {
// 	let arrayLinks =[];
// 	onlyMd(way).forEach((linkmd, index, array)=>{
// 		const regEx = /\[(.*)\]\(((?:\/|https?:\/\/).*)\)/gi;
// 		// const arrayLinksWithText = readFile(res).match(regExp);
// 		console.log("Index Fuera", index)
// 		fileR(linkmd).then((response) => {
//             // console.log(response);
// 			// console.log(response.match(regEx));
// 			let match;
// 			// console.log(match)
// 			console.log("Index dentro", index)
// 			while((match = regEx.exec(response)) !== null) {
// 				console.log(match)
// 				console.log(linkmd, index)
// 				arrayLinks.push({
// 					href: match[2],
//           text: match[1],
// 					file: linkmd,
// 				});
// 				// match = regEx.exec(response);
// 			}
// 			// console.log(arrayLinks);
// 			// console.log(arrayLinks)
// 			if (index === (array.length -1)) {
//         // This is the last one.
// 				console.log(arrayLinks)
//         resolve(arrayLinks);
// 			}
			
// 		})
// 		.catch((error) => reject('error: ',`${error}`));
// 	});
// });
// };
// getLinks('./direc').then((res)=>console.log(res)).catch((err) => console.log(err));

const getLinks = (way) => {
	return new Promise ((resolve, reject)=> {
	let arrayLinks =[];
	const regEx = /\[(.*)\]\(((?:\/|https?:\/\/).*)\)/gi;
	arrayLinks = onlyMd(way).map((linkmd) => fileR(linkmd)
		.then((response) => {
            // console.log(response);
			// console.log(response.match(regEx));
			let arrayAux = [];
			let match;
			// console.log(match)
			// console.log("Index dentro", index)
			while((match = regEx.exec(response)) !== null) {
				// console.log(match)
				// console.log(linkmd, index)
				arrayAux.push({
					href: match[2],
          text: match[1],
					file: linkmd,
				});
				// match = regEx.exec(response);
			}
			return arrayAux;
			// console.log(arrayLinks);
			// console.log(arrayLinks)
			// if (index === (array.length -1)) {
      //   // This is the last one.
			// 	console.log(arrayLinks)
        // resolve(arrayLinks);
			})

		.catch((error) => reject('error: ',`${error}`))
	);
	resolve(Promise.all(arrayLinks));
});
};

const getLinkStatus = (array) => {
	let statusLink = []; 
		// console.log(array);
		statusLink = array.map((link) => fetch(link.href)
			.then((response) => { 
				// console.log(response);
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
		)
	return Promise.all(statusLink);
};
		// console.log(getLinkStatus())
		// getLinks('https://curriculum.laboratoria.la/es/topics/css/css/boxmodel-and-display').then(((res) => (getLinkStatus(res).then(((resolve) => console.log(resolve))))));
		// getLinkStatus('direc').then((res)=> console.log(res)).catch((err)=>err)
		// console.log(getLinkStatus('direc'));
	// console.log(getLinkStatus('./direc'));
// getLinkStatus('direc');


// getLinks('direc').then(((res) =>(getLinkStatus(res).then(((resolve) => console.log(resolve))))));

const concatenar = (arrayofarrays) => {
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
	concatenar
};