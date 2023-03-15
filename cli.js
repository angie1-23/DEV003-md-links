#!/usr/bin/env node
const {mdLinks}  = require('./index.js');
const colors = require('colors');
const option = require('./options.js');
const figlet = require('figlet');
//process.argv se utiliza para pasar los argumentos al proceso node.js cuando se ejecuta en la línea de comandos.
const args = process.argv.slice(2);
// console.log(args);
const filePath = args[0];

// String.raw`C:/Users/Estefania/Desktop/mdLinks/DEV003-md-links\tdirec`

// eslint-disable-next-line no-undef


if(args.length===0){ 
  (console.log(figlet.textSync((`Welcome!`))))
  console.log(colors.bold.blue(`Here are the instructions to use md-Links-here
  1-If you want only links information like href,text,file put only the path.
  2-If you want information and validation of links such as href, text, file, status put path and the --validate command.
  3-If you want to know the total and unique links put the command --stats.
  4-If you want to know the total, single links and broken links put the command --validate --stats.`))
  }

if(args.length===1){ 
mdLinks(filePath, { validate: false })
.then((res) => res.map( el => console.log(`href:${colors.green(el.href)}\ntext:${colors.blue(el.text)}\nfile:${colors.brightMagenta(el.file)}\n--`)))
.catch((error) => { console.log(error) });
}

if (args.length === 2) {
  switch (args[1]) {
  case '--validate':
    mdLinks(args[0], { validate: true })
      .then(res => res.forEach(el => console.log(`href:${colors.green(el.href)}\ntext:${colors.blue(el.text)}\nfile:${colors.yellow(el.file)}\nstatus:${colors.yellow(el.status)}\nmessage:${colors.brightMagenta(el.message)}\n--`)))
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
  // switch(args[1],args[2]){ 
    // case '--validate --stats':
  mdLinks(args[0], { validate: true })
    .then(res => console.log(`${colors.brightMagenta(option.totalLinksUnique(res))}\n${colors.red(option.totalLinksBroken(res))}`))
    .catch(err => console.log(err));
  //   break;
  // }
}

// mdLinks(filePath, { validate: false })
// .then((res) => res.map( el => console.log(`href:${colors.green(el.href)}\ntext:${colors.rainbow(el.text)}\nfile:${colors.brightMagenta(el.file)}\n--`)))
// .catch((error) => { console.log(error) });