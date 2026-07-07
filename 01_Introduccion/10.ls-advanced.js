// Comando LS - Listar archivos y directorios en Node.js usando Promesas y argumentos de línea de comandos
const fs = require('node:fs/promises')
const path = require('node:path')

const pc = require('picocolors'); // Se importa la librería picocolors para dar color a la salida de la consola.

const folder = process.argv[2] ?? '.'; // Obtiene el directorio desde los argumentos de la línea de comandos, o usa el directorio actual si no se proporciona ninguno.


async function listFiles(folder) {
    let files;

    try{
       files =  await fs.readdir(folder);

    }catch(err){
        console.error(pc.red(`Error al leer el directorio: ${folder}`));
        process.exit(1); // Finaliza el proceso con un código de salida 1, indicando que hubo un error.
        return;
    }

    const filePromises = files.map(async file => { // Map es un callback que no espera a que se resuelvan las promesas, por eso usamos Promise.all para esperar a que todas se resuelvan.
        const filePath = path.join(folder, file);
        let stats;

        try{
           stats = await fs.stat(filePath);
        }catch(err){
            console.error(pc.red(`Error al leer el archivo: ${filePath}`));
            process.exit(1); // Finaliza el proceso con un código de salida 1, indicando que hubo un error.
        }

        const isDirectory = stats.isDirectory() ? ' (Directorio)' : '';
        const fileType = isDirectory ? 'Dir' : 'File';
        const fileSize = stats.size;
        const fileModified = stats.mtime.toLocaleString();

        return pc.white(`${fileType} ${pc.blue(file).padEnd(40)} ${pc.green(fileSize.toString().padStart(10))} ${pc.yellow(fileModified)}`);
    });

    const filesInfo = await Promise.all(filePromises); // Espera a que todas las promesas se resuelvan y obtiene la información de los archivos.
    filesInfo.forEach((info) => console.log(info));
}

// Se usan 2 try-catch separados para manejar errores de manera más específica y proporcionar mensajes de error claros al usuario. 
// Esto permite identificar si el error ocurrió al leer el directorio o al obtener información de un archivo específico.

// Se recomienda separarlo para no anidar dentro de un try-catch más grande

    listFiles(folder);