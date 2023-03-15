// Functions  of FS system
  const {
    pathValid,
    pathAbs,
    onlyMd,
    getLinks,
    getLinkStatus,
    concatenar
  } = require('./auxFunctions.js')

const mdLinks = (way, options={}) => {
  return new Promise((resolve, reject) => { 
    const pathVerify = pathAbs(way);
    if(pathValid(pathVerify)){
      if(onlyMd(pathVerify).length>0){
        getLinks(pathVerify).then(((res) =>{ 
          // console.log(res)
          res = concatenar(res);
          if(res.length>0){
            if(options.validate === false){
              // console.log(res)
              resolve(res)
              // console.log(options)
              // const valid = arrayLinks.then((val)=> getLinkStatus(val) => console.log(val))
            }else{
              resolve(getLinkStatus(res))
            }
          }else{
            reject('Any link found' );
          }   
        }));  
      }else{
        reject('Markdown (.md) files not found');
      }
    }
    else{
      reject('THIS PATH DOES NOT EXIST')
    }
  });
};

// getAllLinks('/Users/mafcht/Documents/DEV003-md-links/folderTests/folder2Tests/linkedin.md').then(((res) => (validateLink(res).then(((resolve) => console.log(resolve))))));
// // mdLinks('C:/Users/Estefania/Desktop/mdLinks/DEV003-md-links/direc')

module.exports = {
  mdLinks,
};

// if(arrayLinks.length!==0){ 
  // const resLink= getLinkStatus(pathVerify).then((res)=> console.log(res)).catch((err)=>err)
  //       //  console.log(resLink)
  //     }else{
  //       resolve(arrayLinks)}
  //   }
  //   }
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