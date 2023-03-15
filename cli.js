#!/usr/bin/env node
const {mdLinks}  = require('./index.js');
const colors = require('colors');
const option = require('./options.js');
//process.argv se utiliza para pasar los argumentos al proceso node.js cuando se ejecuta en la línea de comandos.
const args = process.argv.slice(2);
const filePath = args[0];
// eslint-disable-next-line no-undef

if(args.length===0){ 
  (console.log(colors.bold.white((`Welcome!`))))
  console.log(colors.bold.white(`Here are the instructions to use md-Links-here
  1-If you want only links information like href,text,file put only the path.
  2-If you want information and validation of links such as href, text, file, status put path and the --validate command.
  3-If you want to know the total and unique links put the command --stats.
  4-If you want to know the total, single links and broken links put the command --validate --stats.`))
  }

if(args.length===1){ 
mdLinks(filePath, { validate: false })
.then((res) => res.map( el => console.log(`href:${colors.green(el.href)}\ntext:${colors.green(el.text)}\nfile:${colors.green(el.file)}\n--`)))
.catch((error) => { console.log(error) });
}

if (args.length === 2) {
  switch (args[1]) {
  case '--validate':
    mdLinks(args[0], { validate: true })
      .then(res => res.forEach(el => console.log(`href:${colors.green(el.href)}\ntext:${colors.green(el.text)}\nfile:${colors.green(el.file)}\nstatus:${colors.green(el.status)}\nmessage:${colors.green(el.message)}\n--`)))
      .catch(err => console.log(err));
    break;

	
	case '--stats':
    mdLinks(args[0], { validate: true })
      .then(res => console.log(colors.white(option.totalLinksUnique(res))))
      .catch(err => console.log(err));
    break;
}
}

if(args.length === 3){
  mdLinks(args[0], { validate: true })
    .then(res => console.log(`${colors.white(option.totalLinksUnique(res))}\n${colors.red(option.totalLinksBroken(res))}`))
    .catch(err => console.log(err));
}
