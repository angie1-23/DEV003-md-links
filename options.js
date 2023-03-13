

const totalLinksUnique = (array) => {
   const totallLinks = array.map((item) => item.href).length;
   const  linksUnique = [...new Set(array.map((item) => item.href))];
   return `Total: ${totallLinks}\nUnique: ${linksUnique.length}`;
};

const totalLinksBroken = (array) => {
    // const arrayLinksMnsj = objLinks.map((item) => item.message);    
    const broken = array.map((item) => item.message).filter(elem => elem === 'fail').length;
    return `Broken: ${broken}`;
  };


module.exports = {
    totalLinksUnique,
    totalLinksBroken,
  };