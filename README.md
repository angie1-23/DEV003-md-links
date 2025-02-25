# Markdown Links
## Comando md-links-here

## Índice

* [1. Preámbulo](#1-preámbulo)
* [2. Instalación](#2-instalacion)
* [3. Uso](#3-uso)
* [4. Ejemplos](#4-consideraciones-generales)
* [5. Explicacion tecnica](#5-Explicación-tecnica)
* [6. Checklist](#6-checklist)

***

## 1. Preámbulo

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...) y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

Dentro de una comunidad de código abierto, nos han propuesto crear una
herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos
en formato `Markdown`, para verificar los links que contengan y reportar
algunas estadísticas.


## 2. Instalacion 

Instale con una dependicia de desarrollo a su proyecto 

```
npm i md-links-aemunozp
```

Ahora deberia poder ejecurtarlo con # md-Links-here y mostrara una breve descripción de isntrucciones.
```
$ md-links-here 
Welcome!
Here are the instructions to use md-Links-here
  1-If you want only links information like href,text,file put only the path.
  2-If you want information and validation of links such as href, text, file, status put path and the --validate command.
  3-If you want to know the total and unique links put the command --stats.
  4-If you want to know the total, single links and broken links put the command --validate --stats.
```

## 3. Uso

Despues de instalar globalmente el comando podra utilizar los siguientes comandos:
```
md-Links-here [path][options]
md-Links-here 
md-Links-here --validate
md-Links-here --stats
md-Links-here --validate stats
```
## 4. Ejemplos 

Si desea saber que links estan en sus archivos, ingrese la ruta de su archivo o directorio :Por ejemplo:"C:/Users/Estefania/Desktop/mdLinks/DEV003-md-links/prueba.md"

Informacion de los links como href,text y file.

``` 
$ md-links-here prueba.md
href:https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/ Functions
text:Funciones — bloques de código reutilizables - MDN
file:C:\Users\Estefania\Desktop\mdLinks\DEV003-md-links\prueba.md
--
```
Informacion de los links como href,text, file, status,message usar --validate.
``` 
$ md-links-here prueba.md --validate
href:https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/ Functions
text:Funciones — bloques de código reutilizables - MDN
file:C:\Users\Estefania\Desktop\mdLinks\DEV003-md-links\prueba.md
status:404
message:Fail
--
``` 

Estadísticas de los links como total y unicos usar --stats.
``` 
$ md-links-here prueba.md --stats
Total: 1
Unique: 1

``` 

Validar y estadisticas de los links rotos usar --validate --stats.
```
$ md-links-here prueba.md --validate --stats
Total: 1
Unique: 1
Broken: 1
```

## Explicacion tecnica

### 1) JavaScript API

El módulo debe poder **importarse** en otros scripts de Node.js y debe ofrecer la
siguiente interfaz:

#### `mdLinks(path, options)`

##### Argumentos

* `path`: Ruta **absoluta** o **relativa** al **archivo** o **directorio**.
Si la ruta pasada es relativa, debe resolverse como relativa al directorio
desde donde se invoca node - _current working directory_).
* `options`: Un objeto con **únicamente** la siguiente propiedad:
  - `validate`: Booleano que determina si se desea validar los links
    encontrados.

##### Valor de retorno

La función debe **retornar una promesa** (`Promise`) que **resuelva a un arreglo**
(`Array`) de objetos (`Object`), donde cada objeto representa un link y contiene
las siguientes propiedades

Con `validate:false` :

* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.

Con `validate:true` :

* `href`: URL encontrada.
* `text`: Texto que aparecía dentro del link (`<a>`).
* `file`: Ruta del archivo donde se encontró el link.
* `status`: Código de respuesta HTTP.
* `ok`: Mensaje `fail` en caso de fallo u `ok` en caso de éxito.

#### Ejemplo (resultados como comentarios)

```js
const mdLinks = require("md-links");

mdLinks("./some/example.md")
  .then(links => {
    // => [{ href, text, file }, ...]
  })
  .catch(console.error);

mdLinks("./some/example.md", { validate: true })
  .then(links => {
    // => [{ href, text, file, status, ok }, ...]
  })
  .catch(console.error);

mdLinks("./some/dir")
  .then(links => {
    // => [{ href, text, file }, ...]
  })
  .catch(console.error);
```

### 2) CLI (Command Line Interface - Interfaz de Línea de Comando)

El ejecutable de nuestra aplicación debe poder ejecutarse de la siguiente
manera a través de la **terminal**:

`md-links <path-to-file> [options]`

Por ejemplo:

```sh
$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google
```

El comportamiento por defecto no debe validar si las URLs responden ok o no,
solo debe identificar el archivo markdown (a partir de la ruta que recibe como
argumento), analizar el archivo Markdown e imprimir los links que vaya
encontrando, junto con la ruta del archivo donde aparece y el texto
que hay dentro del link (truncado a 50 caracteres).

#### Options

##### `--validate`

Si pasamos la opción `--validate`, el módulo debe hacer una petición HTTP para
averiguar si el link funciona o no. Si el link resulta en una redirección a una
URL que responde ok, entonces consideraremos el link como ok.

Por ejemplo:

```sh
$ md-links ./some/example.md --validate
./some/example.md http://algo.com/2/3/ ok 200 Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md http://google.com/ ok 301 Google
```

Vemos que el _output_ en este caso incluye la palabra `ok` o `fail` después de
la URL, así como el status de la respuesta recibida a la petición HTTP a dicha
URL.

##### `--stats`

Si pasamos la opción `--stats` el output (salida) será un texto con estadísticas
básicas sobre los links.

```sh
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
```

También podemos combinar `--stats` y `--validate` para obtener estadísticas que
necesiten de los resultados de la validación.

```sh
$ md-links ./some/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1
```
## 6. Checklist

### General

* [] Puede instalarse via `npm install --global <github-user>/md-links`

### `README.md`

* [x] Un board con el backlog para la implementación de la librería.
* [x] Documentación técnica de la librería.
* [x] Guía de uso e instalación de la librería

### API `mdLinks(path, opts)`

* [x] El módulo exporta una función con la interfaz (API) esperada.
* [x] Implementa soporte para archivo individual
* [x] Implementa soporte para directorios
* [x] Implementa `options.validate`

### CLI

* [x] Expone ejecutable `md-links` en el path (configurado en `package.json`)
* [] Se ejecuta sin errores / output esperado
* [x] Implementa `--validate`
* [x] Implementa `--stats`

### Pruebas / tests

* [x] Pruebas unitarias cubren un mínimo del 70% de statements, functions,
  lines, y branches.
* [x] Pasa tests (y linters) (`npm test`).














