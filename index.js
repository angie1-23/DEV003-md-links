// Functions  of FS system
  const {
    pathValid,
    pathAbs,
    onlyMd,
    getLinks,
    getLinkStatus,
    concatArr,
  } = require('./auxFunctions.js')

const mdLinks = (way, options={}) => {
  return new Promise((resolve, reject) => { 
    const pathVerify = pathAbs(way);
    if(pathValid(pathVerify)){
      if(onlyMd(pathVerify).length>0){
        getLinks(pathVerify).then(((res) =>{ 
          res = concatArr(res);
          if(res.length>0){
            if(options.validate === false){
              resolve(res)
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
