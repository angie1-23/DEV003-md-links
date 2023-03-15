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

//------- Valida si la ruta existe o no -----//
describe('pathValid,retorna booleano para saber si la ruta existe o no', () => {
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

//------- Valida si la ruta es absoluta o no -----//
describe('pathValid,retorna la ruta absoluta i si es relativa la convierte', () => {
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

//------- Valida es archivo o direc -----//
describe('isFile,retorna un boleano si es directorio o archivo', () => {
	it('Deberia ser una función', () => {
		expect(typeof isFile).toBe('function');
	});
	it('Si la ruta es un archivo, debe devolver true', () => {
		expect(isFile('pruebaTex.txt')).toBe(true);
	});
	it('Si la ruta es un directorio, deberia devolver true', () => {
		expect(pathInfo('C:/Users/Estefania/Desktop/mdLinks/DEV003-md-links/direc')).toBe(true);
	});
});

//-------Verifica si lee un directorio-----//
describe('readAllFiles,lee un directorio', () => {
	it('Deberia ser una función', () => {
		expect(typeof readAllFiles).toBe('function');
	});
	it('Si es un directorio leer y traer un array de rutas', () => {
		expect(readAllFiles('C:/Users/Estefania/Desktop/mdLinks/DEV003-md-links/direc')).toEqual(
			["C:/Users/Estefania/Desktop/mdLinks/DEV003-md-links/direc/direc1/prueba3.md",
			"C:/Users/Estefania/Desktop/mdLinks/DEV003-md-links/direc/direc1/subDirec/prueba4.md",
			"C:/Users/Estefania/Desktop/mdLinks/DEV003-md-links/direc/otraprueba.md",
			"C:/Users/Estefania/Desktop/mdLinks/DEV003-md-links/direc/prueba1.txt",
			]);
	});
	it('Si es un archivo, deberia devolver un array con la ruta', () => {
		expect(readAllFiles('C:/Users/Estefania/Desktop/mdLinks/DEV003-md-links/pruebaTex.txt')).toEqual([
			'C:/Users/Estefania/Desktop/mdLinks/DEV003-md-links/pruebaTex.txt'
		]);
	});
});

//-------Verifica si lee un archivo-----// 
describe('Deberia devolver una promesa leyendo un archivo', () => {
	test('Lee un archivo', () => {
		// expect.assertions(1);
		return fileR('prueba.md').then(data => {
			expect(data).toBe(' [Funciones — bloques de código reutilizables - MDN](https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/ Functions)');
		});
	});
	test('Error al leer archivo', () => {
		return fileR('prueb').catch(err =>
			expect(err).toBe('error: ')
		);
	});
});

//-------Devuelve una promesa con array de links-----// getLinks
describe('Dberia devolver una promesa con un array', () => {
	test('Array de links con informacion', () => {
		// expect.assertions(1);
		return getLinks('C:/Users/Estefania/Desktop/mdLinks/DEV003-md-links/prueba.md').then(data => {
			expect(data).toEqual([[{ 
				href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/ Functions',
    		text: 'Funciones — bloques de código reutilizables - MDN',
    		file: 'C:/Users/Estefania/Desktop/mdLinks/DEV003-md-links/prueba.md'
			}]]
				);
		});
	});

	// describe('devuelve una promesa', () => {
	// 	test('the fetch fails with an error', () => {
	// 		return getLinks('C:/Users/Estefania/Desktop/mdLinks/DEV003-md-links/anyLinks.md').catch(err =>
	// 			expect(err).rejects.toBe(['error'])
	// 		)
	// 	});
	// });

});

test('the fetch fails with an error', () => {
  // expect.assertions(1);
  return expect(getLinks('C:/Users/Estefania/Desktop/mdLinks/DEV003-md-links/anyLinks.md')).rejects.toMatch(['error']);
});

//-------Valida los links-----// getLinks
describe('Devuelve una promesa con la validacion de los links', () => {
test('Estado de los links', () => {
	// expect.assertions(1);
	fetch.mockImplementation(() => Promise.resolve({status:404}));
	return getLinkStatus([{ 
		href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions',
		text: 'Funciones — bloques de código reutilizables - MDN',
		file: 'C:/Users/Estefania/Desktop/mdLinks/DEV003-md-links/prueba.md'
	}]).then(data => {
		expect(data).toEqual([{ 
			href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions',
			text: 'Funciones — bloques de código reutilizables - MDN',
			file: 'C:/Users/Estefania/Desktop/mdLinks/DEV003-md-links/prueba.md',
			status: 404,
			message:'Fail',
		}]
			);
	});
});
});

