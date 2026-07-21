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

import { moviesRouter } from './routes/movies.js';
import { corsMiddleware } from './middlewares/cors.js';


const app = express(); 

app.use(json()); // Middleware para parsear el body de las solicitudes entrantes en formato JSON. Esto permite que los datos enviados en el cuerpo de la solicitud estén disponibles en req.body.
app.use(corsMiddleware()); 
app.disable('x-powered-by');


// Cargar rutas desde router
app.use('/movies', moviesRouter);

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
})