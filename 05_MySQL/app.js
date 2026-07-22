// Representational State Transfer (REST) 
// es un estilo de arquitectura de software que define un conjunto de restricciones
//  para crear servicios web escalables y mantenibles. 
// Los servicios RESTful utilizan el protocolo HTTP y se basan en recursos, que son identificados por URLs. 
// Las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) se realizan mediante 
// los métodos HTTP: POST, GET, PUT y DELETE.

// Fundamentos RESTapi (El cliente debe enviar toda la info necesaria)
// -- Recursos
// -- Verbos Rest (Operaciones)
// -- Representaciones (JSON, XML, HTML)
// -- Stateless (Sin estado)
// -- Interfaz uniforme (Uniform Interface)
// -- Evolución de Cliente y Servidor de forma separada

import express, { json } from 'express';
import { corsMiddleware } from './middlewares/cors.js';

// Se utiliza la función para crear el enrutador de películas, pasando el modelo de película como argumento. 
// Esto permite que el enrutador sea independiente del modelo específico que se esté utilizando, lo que facilita la reutilización del código 
// y la posibilidad de cambiar el modelo sin afectar al enrutador.
import { createMovieRouter } from './routes/movies.js'; 

// Se selecciona el modelo que quiere utilizar y el enrutador se adapta
import { MovieModel } from './models/mysql/movie.js'; // Modelo de película para MySQL
// import { MovieModel } from './models/mongodb/movie.js'; // Modelo de película para MongoDB
// import { MovieModel } from './models/local-file-system/movie.js'; // Modelo de película para sistema de archivos local (El JSON)


export const createApp = ({ movieModel}) => {
  const app = express(); 

  app.use(json()); // Middleware para parsear el body de las solicitudes entrantes en formato JSON. Esto permite que los datos enviados en el cuerpo de la solicitud estén disponibles en req.body.
  app.use(corsMiddleware()); 
  app.disable('x-powered-by');


  // Cargar rutas desde el punto de entrada con Modelo Dinámico
  app.use('/movies', createMovieRouter({ movieModel: MovieModel })); // Inyectar el modelo de película en el enrutador});

  const PORT = process.env.PORT ?? 1234;

  app.listen(PORT, () => {
    console.log(`Servidor escuchando en ht  tp://localhost:${PORT}`);
  })

}
