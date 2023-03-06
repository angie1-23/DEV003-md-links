const { mdLinks }  = require('../index.js');


describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });

  // it('Deberia devoolver una promesa', () => {
  //   expect(mdLinks()).toBe(typeof Promise)
  //   console.log('FIX ME!');
  // });
  it('Deberia rechazar cuando el path no existe', () => {
    return mdLinks('angie/cursos/noexiste.md').catch((error) => {
      expect(error).toBe("La ruta no existe");
    })
  });
});
