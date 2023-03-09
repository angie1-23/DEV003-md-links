const {
    pathValid,
    pathAbs,
    onlyMd,
    getLinks,
    getLinkStatus,
  } = require('../auxFunctions.js')


  describe('existsSync, esta función retorna un booleano y verifica si existe un directorio o archivo', () => {
    it('Deberia ser una función', () => {
        expect(typeof existsSync).toBe('function');
    });
    it('Si la ruta existe, debe devolver true', () => {
        expect(pathValid('prueba')).toBe(true);
    });
    it('Si la ruta no existe, debe devolver false', () => {
        expect(pathValid('noexiste')).toBe(false);
    });
});