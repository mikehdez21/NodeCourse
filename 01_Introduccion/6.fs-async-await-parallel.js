// Asincrono en Paralelo (no espera a que termine la primera operación para ejecutar la segunda, se ejecutan en paralelo y cuando termina la primera operación, se ejecuta la función callback o se resuelve la promesa)
// Es más rápido que el asincrono secuencial, pero no se puede controlar el orden de ejecución, ya que no se sabe cuál de las dos operaciones terminará primero.

const { readFile } = require('node:fs/promises');

Promise.all([
    readFile('archivo.txt', 'utf-8'),
    readFile('archivo2.txt', 'utf-8')
])
    .then(([text, secondText]) => {
        console.log('Contenido del archivo: ', text);
        console.log('Contenido del archivo 2: ', secondText);
    }
    )
    .catch(err => {
        console.error('Error al leer los archivos: ', err);
    }
    )

    

