// Uso de framework EXPRESS para crear un servidor HTTP y el uso como API REST
// Se basa más en las rutas
// Express automatiza los headers y el parseo de body, además de permitir middlewares y otras funcionalidades

// En EXPRESS es importante el orden de las rutas, ya que se ejecutan en el orden en que se definen, y si una ruta coincide, no se ejecutan las siguientes. 
// Por eso es importante definir la ruta 404 al final, para que solo se ejecute si ninguna de las anteriores coincide.

const express = require('express')
const dittoJson = require('./pokemon/typeDitto.json');


const app = express()
app.disable('x-powered-by') // Deshabilita el header x-powered-by para seguridad

const port = process.env.PORT || 1234

// Middlewares 
// Funciona para temas de CORS
// Servir archivos estaticos (HTML, CSS, JS, imágenes, pdfs, etc)

// app.use((req, res, next) => { // Los params son por posición, no por nombre, y el next es obligatorio para que el flujo de la petición continue
//     console.log('Middleware En Ejecución')
//     if(req.headers['content-type'] !== 'application/json') return next() // Si no es JSON, se pasa al siguiente middleware o ruta
// 
//     let body = '';
// 
//     req.on('data', (chunk) => {
//         body += chunk.toString();
//     });
// 
//     req.on('end', () => {
//         const data = JSON.parse(body);
//         // Mutar la request y meter la información en req.body para que esté disponible en las rutas
//         req.body = data; 
//         next() // Metodo escencial y obligatorio para que el flujo de la petición continue y no se quede colgado
//     })
// 
// 
// })

app.use(express.json()) // Middleware para parsear el body de la request a JSON, si no es JSON, no hace nada y pasa al siguiente middleware o ruta

// Rutas de la API REST
app.get('/', (req, res) => {
    res.send('Hola mundo desde Express')
})

app.get('/pokemon/ditto', (req, res) => {
    res.json(dittoJson)
})

app.post('/pokemon', (req, res) => {
    res.status(201).json(req.body)

})


// Tratar correctamente las rutas en orden (Al final la 404) 
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Ruta no encontrada' });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`)
})