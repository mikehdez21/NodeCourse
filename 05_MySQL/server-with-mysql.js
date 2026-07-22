import { createApp } from './app.js'; // Importar la función createApp desde el archivo app.js. Esta función se encarga de crear y configurar la aplicación Express, incluyendo la configuración de rutas, middlewares y otros aspectos necesarios para que la aplicación funcione correctamente.
import { MovieModel } from './models/mysql/movie.js'; // Modelo de película para MySQL

createApp({ movieModel: MovieModel }); // Llamar a la función createApp, pasando el modelo de película como argumento. Esto permite que la aplicación utilice el modelo de película especificado para manejar las operaciones relacionadas con las películas, como obtener, crear, actualizar y eliminar películas en la base de datos.


// Esto permite tener un servidor modular y flexible, donde se puede cambiar 
// fácilmente el modelo de datos (por ejemplo, cambiar de MySQL a MongoDB) 
// sin tener que modificar la lógica principal de la aplicación.

// Se crean scripts en el package.json según el servidor que se quiere leventar