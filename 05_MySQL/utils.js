import { createRequire } from 'node:module';

const require = createRequire(import.meta.url); // Para poder usar require en un módulo ES6 de forma NATIVA
export const readJson = (path) => require(path); // Función para leer archivos JSON de forma síncrona. Toma la ruta del archivo como argumento y devuelve el contenido del archivo como un objeto JavaScript.
