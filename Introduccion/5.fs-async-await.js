// PARA ASYNC AWAIT -  se puede cambiar la extensión a modulos (ECMAScript) y usar import fs from 'node:fs/promises' en lugar de require.
// O bien si se sigue usando CommonJS, se puede usar una función autoinvocada llamandose así misma.

const { readFile } = require('node:fs/promises');

// IIFE - Immediately Invoked Function Expression
(
    async () =>{ // función asíncrona autoinvocada ANONIMA
    console.log('Leyendo el archivo archivo.txt...');

    const text = await readFile('archivo.txt', 'utf-8');
    console.log('Contenido del archivo: ', text);

    console.log('Leyendo el archivo archivo2.txt...');
    const secondText = await readFile('archivo2.txt', 'utf-8');
    console.log('Contenido del archivo 2: ', secondText);

    }
)()

const fs = require('node:fs/promises');


// Otra forma de hacerlo es con una función asíncrona normal y ejecturla después, pero no se puede usar await fuera de una función asíncrona.

async function init() {
    console.log('Leyendo el archivo archivo.txt...');
    const text = await fs.readFile('archivo.txt', 'utf-8');
    console.log('Contenido del archivo: ', text);

    console.log('Leyendo el archivo archivo2.txt...');
    const secondText = await fs.readFile('archivo2.txt', 'utf-8');
    console.log('Contenido del archivo 2: ', secondText);
}

init();

// Existe
// 1. Sincrono (bloqueante)
// 2. Asincrono callback (no bloqueante, pero espera a que termine la primera operación para ejecutar la segunda)
// 3. Asincrono Secuencial (espera a que termine la primera operación para ejecutar la segunda)
// 4. Asincrono en Paralelo (no espera a que termine la primera operación para ejecutar la segunda, se ejecutan en paralelo y cuando termina la primera operación, se ejecuta la función callback o se resuelve la promesa)