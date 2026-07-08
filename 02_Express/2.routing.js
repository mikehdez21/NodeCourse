// Primer API con NODE (POKEAPI)
// Se crea un servidor HTTP con el modulo nativo de Node
// Se utiliza una sola función y se discrimina dentro de ella con switch/case para cada método y ruta

// -- REPASO DE METODOS --
// GET/HEAD - Obtener datos (head no devuelve BODY - Funciona como previa para obtener auth, cookies, etc)
// POST - Crear datos
// PUT - Actualizar datos
// DELETE - Eliminar datos
// CONNECT - Establecer un túnel de comunicación con el servidor
// OPTIONS - Obtener opciones de un recurso (como CORS)
// TRACE - Obtener un recurso y devolverlo tal cual (para debug)
// PATCH - Actualizar parcialmente un recurso

const http = require('node:http');

const dittoJson = require('./pokemon/typeDitto.json');

const processRequest = (req, res) => {
    const { method, url } = req;

    switch (method) {

        case 'GET':
            switch (url) {
                case '/pokemon/ditto':

                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                    return res.end(JSON.stringify(dittoJson));
                default:
                    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
                    return res.end('Not Found');
                }

        case 'POST':
            switch (url) {
                case '/pokemon':
                    let body = '';

                    req.on('data', (chunk) => {
                        body += chunk.toString();
                    });

                    req.on('end', () => {
                        const data = JSON.parse(body);
                        // LLamada a BD para guardar los datos

                        res.writeHead(201, { 'Content-Type': 'text/html; charset=utf-8' });
                        return res.end(JSON.stringify({ success: true, message: 'Pokemon creado', data }));

                    });

                    break;

                default:
                    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
                    return res.end('Not Found');
            }

        
    }
}

const server = http.createServer(processRequest)

server.listen(1234, () => {
    console.log('Server running on http://localhost:1234')
})