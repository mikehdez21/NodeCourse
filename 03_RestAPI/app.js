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

const express = require('express');
const crypto = require('node:crypto');
const cors = require('cors');

const movies = require('./movies.json');
const { validateMovie, validateMoviePartial } = require('./movies');

const app = express(); 
app.use(express.json()); // Middleware para parsear el body de las solicitudes entrantes en formato JSON. Esto permite que los datos enviados en el cuerpo de la solicitud estén disponibles en req.body.

// Middleware para habilitar CORS (Cross-Origin Resource Sharing) en la aplicación Express. 
// Esto permite que los recursos del servidor sean accesibles desde diferentes dominios, lo cual es útil para aplicaciones web que consumen APIs desde distintos orígenes.
// Aunque el paquete "cors" coloca por defecto "*" -> permitiendo acceso a cualquier origen.
app.use(cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = [
      'http://localhost:3000',
      'http://localhost:1234',
      'https://movies.com',
      'https://midu.dev'
    ]

    if (ACCEPTED_ORIGINS.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
}))

app.disable('x-powered-by');



app.get('/', (req, res) => {
  res.json({message: 'Hello World!'});
});


app.get('/movies', (req, res) => {
  const {genre} = req.query; // Query Parameters (Parametros de consulta) son pares clave-valor que se envían en la URL después del signo de interrogación (?). Se utilizan para filtrar, ordenar o paginar los resultados de una solicitud.
  if (genre) {
    const filteredMovies = movies.filter(
      m => m.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    );
    return res.json(filteredMovies);
  }
    res.json(movies);
});


app.get('/movies/:id', (req, res) => { // path-to-regexp
  // Parametros de ruta (Route Parameters) son valores dinámicos que se pueden incluir en la URL de una ruta.
  const {id} = req.params;

  const movie = movies.find(m => m.id === id);
      if (movie) {
        return res.json(movie);
      } else {
        return res.status(404).json({ error: 'Película no encontrada' });
      }
});


app.post('/movies', (req, res) => {

  const result = validateMovie(req.body);

  if(result.error){
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  const newMovie = {
      id: crypto.randomUUID(),  
    ...result.data
  }
  
  movies.push(newMovie)
  res.status(201).json(newMovie);
})


app.patch('/movies/:id', (req, res) => {
  const {id} = req.params;
  const result = validateMoviePartial(req.body);

  if(!result.success ){
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  const movieIndex = movies.findIndex(m => m.id === id);
  if (movieIndex === -1) {
    return res.status(404).json({ error: 'Película no encontrada' });
  }

  // Se usa "...{object}" con confianza debido a que y está validado con Zod
  // "...{object}" es el operador de propagación (spread operator) en JavaScript. 
  // Se utiliza para copiar todas las propiedades enumerables de un objeto a otro objeto. 
  // En este caso, se está utilizando para actualizar las propiedades de la película existente 
  // con los datos validados del cuerpo de la solicitud.
  movies[movieIndex] = { 
    ...movies[movieIndex], 
    ...result.data 
  };
  res.json(movies[movieIndex]);
});



app.delete('/movies/:id', (req, res) => {
  const {id} = req.params;
  const movieIndex = movies.findIndex(m => m.id === id);

  if (movieIndex === -1) {
    return res.status(404).json({ error: 'Película no encontrada' });
  }

  movies.splice(movieIndex, 1);
  res.json({ message: 'Película eliminada' });
});


const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
})