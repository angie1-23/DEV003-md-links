/* eslint-disable no-undef */

const {
	pathValid,
	fileR,
	pathAbs,
	isFile,
	pathInfo,
	readAllFiles,
	onlyMd,
	getLinks,
	getLinkStatus,
} = require('../auxFunctions.js');
const fetch = require('node-fetch');
jest.mock('node-fetch');

//------- Testeo para saber si es valido o no una ruta-----//
describe('fs.existsSync,retora booleano para saber si la ruta existe o no', () => {
	it('Deberia ser una función', () => {
		expect(typeof pathValid).toBe('function');
	});
	it('Si la ruta existe, debe devolver true', () => {
		expect(pathValid('prueba.md')).toBe(true);
	});
	it('Si la ruta no existe, debe devolver false', () => {
		expect(pathValid('noexiste')).toBe(false);
	});
});

// Testeo para saber sin son absolutas las rutas 
describe('path.isAbsolute,retorna la ruta absoluta i si es relativa la convierte', () => {
	it('Deberia ser una función', () => {
		expect(typeof pathValid).toBe('function');
	});
	it('Si la ruta absoluta, debe devolver el path', () => {
		expect(pathAbs('C:/Users/Estefania/Desktop/mdLinks/DEV003-md-links/prueba.md')).toBe('C:/Users/Estefania/Desktop/mdLinks/DEV003-md-links/prueba.md');
	});
	it('Si la ruta no es absoluta, deberia covertirla', () => {
		expect(pathAbs('./prueba.md')).toBe('C:\\Users\\Estefania\\Desktop\\mdLinks\\DEV003-md-links\\prueba.md');
	});
});

describe('path.isAbsolute,retorna la ruta absoluta i si es relativa la convierte', () => {
	it('Deberia ser una función', () => {
		expect(typeof pathValid).toBe('function');
	});
	it('Si la ruta absoluta, debe devolver el path', () => {
		expect(isFile('pruebaTex.txt')).toBe(true);
	});
	it('Si la ruta no es absoluta, deberia covertirla', () => {
		expect(pathInfo('C:/Users/Estefania/Desktop/mdLinks/DEV003-md-links/direc')).toBe(true);
	});
});

//-------Verifica si lee un directorio-----//
describe('fs.readdirSync,lee un archivo', () => {
	it('Deberia ser una función', () => {
		expect(typeof readAllFiles).toBe('function');
	});
	it('Si es un directorio leer y traer un array de rutas', () => {
		expect(readAllFiles('C:/Users/Estefania/Desktop/mdLinks/DEV003-md-links/direc')).toEqual(
			['C:/Users/Estefania/Desktop/mdLinks/DEV003-md-links/direc/hola/prueba3.md', 
			'C:/Users/Estefania/Desktop/mdLinks/DEV003-md-links/direc/otraprueba.md',
			'C:/Users/Estefania/Desktop/mdLinks/DEV003-md-links/direc/prueba1.txt' ]);
	});
	it('Si la ruta no es absoluta, deberia covertirla', () => {
		expect(readAllFiles('C:/Users/Estefania/Desktop/mdLinks/DEV003-md-links/pruebaTex.txt')).toEqual([
			'C:/Users/Estefania/Desktop/mdLinks/DEV003-md-links/pruebaTex.txt'
		]);
	});
});

// Testeo de leer archivos 

describe('devuelve una promesa', () => {

	test('the data is format link', () => {
		// expect.assertions(1);
		return fileR('prueba.md').then(data => {
			expect(data).toBe(' [Funciones — bloques de código reutilizables - MDN](https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions)');
		});
	});
});

describe('devuelve una promesa', () => {
	test('the fetch fails with an error', () => {
		return fileR('prueb').catch(err =>
			expect(err).toBe('error: ')
		);
	});
});

//-------Trae lo links-----// getLinks

describe('devuelve una promesa', () => {

	test('the data is format link', () => {
		// expect.assertions(1);
		return getLinks('C:/Users/Estefania/Desktop/mdLinks/DEV003-md-links/prueba.md').then(data => {
			expect(data).toEqual([{ 
				href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions',
    text: 'Funciones — bloques de código reutilizables - MDN',
    file: 'C:/Users/Estefania/Desktop/mdLinks/DEV003-md-links/prueba.md'
			}]
				);
		});
	});

	// describe('devuelve una promesa', () => {
	// 	test('the fetch fails with an error', () => {
	// 		return getLinks('C:/Users/Estefania/Desktop/mdLinks/DEV003-md-links/pruebaTex.tx').catch(err =>
	// 			expect(err).toEqual(['error: '])
	// 		)
	// 	});
	// });

});

//-------Valida los links-----// getLinks
describe('devuelve una promesa', () => {
test('the data is format link', () => {
	// expect.assertions(1);
	return getLinkStatus('C:/Users/Estefania/Desktop/mdLinks/DEV003-md-links/prueba.md').then(data => {
		expect(data).toEqual([{ 
			href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions',
	text: 'Funciones — bloques de código reutilizables - MDN',
	file: 'C:/Users/Estefania/Desktop/mdLinks/DEV003-md-links/prueba.md'
		}]
			);
	});
});
});