const path = require('node:path');

// unix -> /
// windows -> \


// unir rutas con path.join (indeferente del sistema operativo)
const filePath = path.join('carpeta1', 'carpeta2', 'archivo.txt');
console.log('Ruta del archivo: ', filePath);

// nombre directo del fichero
const base = path.basename(filePath);
console.log('Nombre del archivo: ', base);

// nombre del fichero sin extensión
const name = path.parse(filePath).name;
console.log('Nombre del archivo sin extensión: ', name);