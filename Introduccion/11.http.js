// Crear Servidor HTTP

const http = require('node:http')

const { findAvailablePort } = require('./12.free-port.js') // Importa la función findAvailablePort desde el archivo 12.free-port.js

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Hello, World!')
})

findAvailablePort(3000).then(port => {
    server.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`)
    })
})

