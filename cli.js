#!/usr/bin/env node
const {mdLinks}  = require('./index.js');
const colors = require('colors');
const option = require('./options.js');
//process.argv se utiliza para pasar los argumentos al proceso node.js cuando se ejecuta en la línea de comandos.
const args = process.argv.slice(2);
// console.log(args);
const filePath = args[0];

// String.raw`C:/Users/Estefania/Desktop/mdLinks/DEV003-md-links\tdirec`

// eslint-disable-next-line no-undef
if(args.length===1){ 
mdLinks(filePath, { validate: false })
.then((res) => res.map( el => console.log(`${colors.green(el.href)}\n ${colors.rainbow(el.text)}\n ${colors.brightMagenta(el.file)}`)))
.catch((error) => { console.log(error) });
}

if (args.length === 2) {
  switch (args[1]) {
  case '--validate':
    mdLinks(args[0], { validate: true })
      .then(res => res.forEach(el => console.log(`${colors.green(el.href)} ${colors.rainbow(el.text)} ${colors.yellow(el.file)} ${colors.yellow(el.status)} ${colors.brightMagenta(el.message)}`)))
      .catch(err => console.log(err));
    break;

	
	case '--stats':
    mdLinks(args[0], { validate: true })
      .then(res => console.log(colors.brightMagenta(option.totalLinksUnique(res))))
      .catch(err => console.log(err));
    break;
}
}

if(args.length === 3){
  mdLinks(args[0], { validate: true })
    .then(res => console.log(`${colors.brightMagenta(option.totalLinksUnique(res))}\n${colors.red(option.totalLinksBroken(res))}`))
    .catch(err => console.log(err));
}
