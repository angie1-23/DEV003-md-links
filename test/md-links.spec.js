const { mdLinks }  = require('../index.js');


describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });

  it('Debe retornar un array con objetos con propiedades href, text, file', () => {
    const path = 'C:/Users/Estefania/Desktop/mdLinks/DEV003-md-links/prueba.md'
    const array = [{
        href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions',
        text: 'Funciones — bloques de código reutilizables - MDN',
        file: 'C:/Users/Estefania/Desktop/mdLinks/DEV003-md-links/prueba.md',
    }];
    expect(mdLinks(path, { validate: false })).resolves.toEqual(array);//Se usa para probar que los objetos tienen los mismos tipos y estructura.
  });

  it('Deberia rechazar cuando el path no existe', () => {
    return mdLinks('C:/Users/Estefania/Desktop/mdLinks/DEV003-md-links/anyLinks.md').catch((error) => {
      expect(error).toBe('Any link found');
    })
  });

  it('Deberia rechazar cuando el path no existe', () => {
    return mdLinks('C:/Users/Estefania/Desktop/mdLinks/DEV003-md-links/pruebaTex.txt').catch((error) => {
      expect(error).toBe("Markdown (.md) files not found");
    })
  });


  it('Deberia rechazar cuando el path no existe', () => {
    return mdLinks('angie/cursos/noexiste.md').catch((error) => {
      expect(error).toBe("THIS PATH DOES NOT EXIST");
    })
  });
});
