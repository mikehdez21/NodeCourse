const fs = require('node:fs/promises');

console.log('Leyendo el archivo archivo.txt...');

// Fucción para leer un archivo de manera asíncrona USANDO PROMESAS
fs.readFile('archivo.txt', 'utf-8')
    .then(text => {
        console.log('Contenido del archivo: ', text);
    })
    .catch(err => {
        console.error('Error al leer el archivo: ', err);
    });


fs.readFile('archivo2.txt', 'utf-8')
    .then(secondText => {
        console.log('Contenido del archivo 2: ', secondText);
    })
    .catch(err => {
        console.error('Error al leer el archivo 2: ', err);
    }); 

// ejecuta el primer readFile sin quedarse a esperar respuesta, continua ejecutando, llega al segundo readFile y se ejecuta, 
// y cuando el primer readFile termina de leer el archivo, ejecuta la función callback y muestra el contenido del archivo en consola.