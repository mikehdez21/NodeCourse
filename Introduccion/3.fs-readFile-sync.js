// FUNCIONES SINCRONAS - bloqueantes ya que va secuencial y espera a que termine la primera operación para ejecutar la segunda

const fs = require('node:fs');

console.log('Leyendo el archivo archivo.txt...');

// Fucción para leer un archivo de manera asíncrona usando CALLBACKS
fs.readFile('archivo.txt', 'utf-8', (err, text) => {
    if (err) {
        console.error('Error al leer el archivo: ', err);
        return;
    }
    console.log('Contenido del archivo: ', text);
});



fs.readFile('archivo2.txt', 'utf-8', (err, secondText) => {
    if (err) {
        console.error('Error al leer el archivo 2: ', err);
        return;
    }
    console.log('Contenido del archivo 2: ', secondText);
});

// ejecuta el primer readFile sin quedarse a esperar respuesta, continua ejecutando, llega al segundo readFile y se ejecuta, 
// y cuando el primer readFile termina de leer el archivo, ejecuta la función callback y muestra el contenido del archivo en consola.