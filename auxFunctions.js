//Funciones Fs para utilizar en  mdLinks
const fs = require("fs");
const path = require('path');


// Verificar que la ruta existe 
const pathValid = (path) => {return fs.existsSync(path)};
pathValid('C:/Users/Estefania/Desktop/mdLinks/DEV003-md-links/prueba.md');

//Verificar si la ruta es absoluta o relativa y se convierte en absoluta
const pathAbs = (way) => (path.isAbsolute(way) ? (way) : path.resolve(way));

// Verificar si la ruta absoluta es un directorio o archivo 
const pathInfo = (way) => {return fs.statSync(way).isDirectory()};

// Verificar si la ruta absoluta es un directorio o archivo 
const pathInfo2 = (way) => fs.statSync(way).isfile();

// Extension de un archivo 
const fileMd = (way) => path.extname(way);

// Filtrar la extension de un archivo



// Leer un directorio 
const readAllFiles = (way, arrayOfFiles = [])=> {
	// arrayOfFiles = [];
	const files = fs.readdirSync(way);
	files.forEach(file => {
		const stat = fs.statSync(`${way}/${file}`)
		if (stat.isDirectory()) {
			readAllFiles(`${way}/${file}`, arrayOfFiles)
		} else {
			arrayOfFiles.push(`${way}/${file}`)
		}
	});
	return arrayOfFiles
};
// readAllFiles('direc');
const onlyMd = (way) => {return readAllFiles(way).filter((file => path.extname(file) === '.md'))};
// onlyMd('direc');

// console.log(onlyMd('direc'));


// const returnOnlyFilesMd = (routeFile) => {
//     return arrayForFiles(routeFile).filter((file => path.extname(file) === '.md'));
// };

// const chalk = require('chalk');
// const figlet = require('figlet');

// como leer un archivo
const fileR = (way) => {
	return new Promise((resolve,reject)=> { 
	fs.readFile(way, 'utf-8', (err, data) => {
	if(err) {
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

// const getLinks = (way) => {
// 	let arrayLinks = [];
// 	onlyMd(way).forEach((linkmd) => {
//     const rgexURL = /\(((?:\/|https?:\/\/).*)\)/g; // obtiene (links) contenidos en cada archivo
//     const regExp = /\[(.*)\]\(((?:\/|https?:\/\/).*)\)/gi; // obtiene [textoReferenciaDelLink] y (links)
//     const regText = /\[(.*)\]/g; // obtiene [textoReferenciaDelLink]
// 		fileR(linkmd).then((response) => {
// 			const other = response.match(regExp);
// 			// let match = regEx.exec(response);
// 			// console.log(other);
//     if (other != null) {
//       const arrayOfLinks = other.map((links) => {
// 			const uniqueLinks = links.match(rgexURL).join().slice(1, -1);
// 			const uniqueText = links.match(regText).join().slice(1, -1);
//         return {
//           href: uniqueLinks,
//           text: uniqueText,
//           file: linkmd,
//         };
//       });
		
// 			arrayLinks = arrayLinks.concat(arrayOfLinks);			
			
//     }		
// 	})
// });
// return arrayLinks;
// };

// console.log(getLinks('direc'));


const getLinks = (way) => {
	let arrayLinks =[];
	onlyMd(way).forEach((linkmd)=>{
		const regEx = /\[(.*)\]\(((?:\/|https?:\/\/).*)\)/gi;
		// const arrayLinksWithText = readFile(res).match(regExp);
		fileR(linkmd).then((response) => {
            // console.log(response);
			// console.log(response.match(regEx));
			let match;
			// console.log(match)

			while((match = regEx.exec(response)) !== null) {
				// console.log(match)
				arrayLinks.push({
					href: match[2],
          text: match[1],
					file: linkmd,
				});
				// match = regEx.exec(response);
			}
			// console.log(arrayLinks);
			// console.log(arrayLinks)
			return(arrayLinks);
		});
	});
};

// const readMyFile = (answer) => {

// 	return new Promise ((resolve, reject) => {
// 	  readFile(answer, 'utf8', (err, data) => {
// 		if (err) reject (err);
// 	   const expReg =  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/g;
// 	  //  const array = [...data.matchAll(expReg)];
// 	  const links = data.match(expReg);
// 		resolve(links);
// 	  });
// 	})

module.exports = {
	pathValid,
	pathAbs,
	pathInfo,
	fileMd,
	readAllFiles,
	onlyMd,
	fileR,
	getLinks,
};