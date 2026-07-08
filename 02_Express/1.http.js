// Crear Servidor HTTP

const fs = require('node:fs')
const http = require('node:http')

const desiredPort = process.env.port ?? 1234;

const processRequest = (req, res) => {
    
    if(req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
        res.end('Página de inicio c:')
    }

    else if (req.url === '/defaultProfile.png'){
        fs.readFile('./defaultProfile.png', (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
                res.end('Imagen no encontrada')
            } else {
                res.end(data)
            }
        })
    } 

    else if (req.url === '/contacto') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
        res.end('Página de contacto')


    } 

    else {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
        res.end('Not Found')
    }
}

const server = http.createServer(processRequest)


server.listen(desiredPort, () => {
    console.log(`Server running on http://localhost:${desiredPort}`)
})

