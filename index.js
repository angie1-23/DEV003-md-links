// Functions  of FS system
const {
  pathValid,
  pathAbs,
  pathInfo,
  onlyMd,
  getLinks,
  getLinkStatus,
} = require('./auxFunctions.js')

const mdLinks = (way, options ={ }) => {
  return new Promise((resolve, reject) => { 
    const pathVerify = pathAbs(way);
    if(pathValid(pathVerify)){
      if(pathInfo(pathVerify)){
        const files = onlyMd(pathVerify);
        // console.log(onlyMd(pathVerify))
        if (files.length!==0){
          const arrayLinks = getLinks(pathVerify);
          // console.log(getLinks(pathVerify))
          if(arrayLinks.length>0){ 
              if(options.validate===true){
                getLinkStatus(pathVerify).then((ele) => resolve(ele))
                  .catch((err) => err);
                }
              }else{
                resolve(arrayLinks)}
              }
            }
      else {
        resolve(pathValid(pathVerify));
      }
      
    // console.log(pathAbs(way));
  } 
  else{reject("La ruta no existe");}
}
)};


// mdLinks('C:/Users/Estefania/Desktop/mdLinks/DEV003-md-links/direc')

module.exports = {
  mdLinks,
};

    // resolve();
      // Chequear o convertir a una ruta absoluta
      // Probar si esa ruta absoluta es un archivo o directorio 
      // Si es un directorio Filtrar archivos md ( arreglo md)

      // for (let i = 0; i < arrayLinks.length; i++) {
      //   arrayObjects.push({
      //     href: arrayLinks[i][2],
      //     text: arrayLinks[i][1],
      //     file: inputPath,
      //   });
      // }

      // const pathVerify = pathAbs(way);
   
      // //Identificar si la ruta existe 
      //  if(pathValid(pathVerify)){ 
      //   // const ver= pathVerify;
      //   // console.log(ver)
      //   // console.log(pathValid(pathVerify))
      //   //saber si es directorio o no 
      //   // if(pathInfo(pathVerify)){
      //   //   // console.log(pathInfo(pathVerify))
      //   //   const readF = readAllFiles(pathVerify);
      //     // console.log(readF);
      //     // Saber la extension de los archivos 
      //     // const arrayMd = fileMd(pathVerify);
      //     // // leer un directorio 
      //     // // readAllFiles 
      //     // console.log(arrayMd)
      //     // console.log(pathAbs('prueba'));
      //     // console.log(fileMd('direc'))
      //     // return pathVerify;
      //     return;