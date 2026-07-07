// Comando Free Port - Encuentra un puerto libre en Node.js usando el módulo net

const net = require('node:net');

function findAvailablePort(desiredPort) {
    return new Promise((resolve, reject) => {
        const server = net.createServer();

        server.listen(desiredPort, () => {
            const {port} = server.address();
            server.close();
            resolve(port);
        });

        // Manejo de "EVENTOS" tipo error, que se dispara si el puerto deseado ya está en uso o si ocurre algún otro error al intentar escuchar en ese puerto.
        server.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                // Si el puerto deseado está en uso, se intenta encontrar un puerto libre de manera recursiva.
                findAvailablePort(0).then(port => resolve(port));
            } else{
                reject(err);
            }
        });
    })
}

module.exports = { findAvailablePort }; // Exporta la función findAvailablePort para que pueda ser utilizada en otros archivos.