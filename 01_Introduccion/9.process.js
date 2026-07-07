// Process (Variable Global) - Proporciona información sobre el proceso actual de Node.js y permite interactuar con él.

console.log(process.argv) // Muestra los argumentos de la línea de comandos pasados al script de Node.js.
// Devuelve array de strings, donde el primer elemento es la ruta del ejecutable de Node.js, el segundo elemento es la ruta del archivo JavaScript que se está ejecutando y los elementos restantes son los argumentos adicionales proporcionados por el usuario.


// Se puede controlar el proceso y su salida
// process.exit(1); // Finaliza el proceso con un código de salida 0, indicando que se completó correctamente.

// Controlar eventos del proceso
// process.on('exit', (code) => {
//     console.log(`El proceso ha finalizado con el código: ${code}`);
// });

// cwd
console.log('Directorio de trabajo actual:', process.cwd()); // Muestra el directorio de trabajo actual del proceso.

// platform
console.log('Plataforma del sistema operativo:', process.platform); // Muestra la plataforma del sistema operativo en el que se está ejecutando Node.js (por ejemplo, 'win32', 'linux', 'darwin').

//  -- Variables de entorno (ENV) # USO MÁS COMÚN
console.log('Variables de entorno:', process.env); 