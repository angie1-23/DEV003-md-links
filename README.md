# Markdown Links

## Índice

* [1. Preámbulo](#1-preámbulo)
* [2. Instalación](#2-instalacion)
* [3. Uso](#3-uso)
* [4. Consideraciones generales](#4-consideraciones-generales)
* [5. Criterios de aceptación mínimos del proyecto](#5-criterios-de-aceptación-mínimos-del-proyecto)
* [6. Entregables](#6-entregables)
* [7. Hacker edition](#7-hacker-edition)
* [8. Pistas, tips y lecturas complementarias](#8-pistas-tips-y-lecturas-complementarias)
* [9. Checklist](#9-checklist)
* [10. Achicando el problema](#10-achicando-el-problema)

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

Para usar primero se debe hacer require(---)

Al tener instalada la libreria pdra acceder en su terminal mediante el siguiente comando: md-Links-here,donde aparecera las instrucciones para los comando a utilizar.
![Texto alternativo](/Welcome.png)


Los comandos a utilizar son los siguientes: 
Si desea saber que links estan en sus archivos, ingrese la ruta de su archivo directorio : Por ejemplo:"C:\Users\Estefania\Desktop\mdLinks\DEV003-md-links\prueba.md"

Se ve de la siguiente manera si solo se desea saber la informacion de los links como href,text y file.
![Texto alternativo](/False.png)

Con el comando --validate.
![Texto alternativo](/validate.png)

Con el comando --stats.
![Texto alternativo](/stats.png)

Con el comando --validate --stats.
![Texto alternativo](/statsandvalidate.png)

