const {mdLinks}  = require('./index.js');
const args = process.argv.slice(2);
// console.log(args);
filePath = args[0]

// String.raw`C:/Users/Estefania/Desktop/mdLinks/DEV003-md-links\tdirec`

// eslint-disable-next-line no-undef
mdLinks(filePath ).then((res) => {console.log('cli',res )})
	.catch((error) => { console.log(error) });