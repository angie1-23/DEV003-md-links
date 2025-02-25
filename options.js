// Codificar options
const totalLinksUnique = (array) => {
   const totallLinks = array.map((item) => item.href).length;
   const  linksUnique = [...new Set(array.map((item) => item.href))];
   return `Total: ${totallLinks}\nUnique: ${linksUnique.length}`;
};

const totalLinksBroken = (array) => {
    const broken = array.map((item) => item.message).filter(elem => elem === 'Fail').length;
    return `Broken: ${broken}`;
  };

module.exports = {
    totalLinksUnique,
    totalLinksBroken,
  };