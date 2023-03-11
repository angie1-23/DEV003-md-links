/* eslint-disable no-undef */

const {
	pathValid,
	fileR,
	pathAbs,
	onlyMd,
	getLinks,
	getLinkStatus,
} = require('../auxFunctions.js')

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

// Testeo de 

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