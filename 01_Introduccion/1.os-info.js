// MODULOS NATIVOS DE NODE JS

    const os = require('node:os');

    console.log('Nombre del OS: ', os.platform());
    console.log('Version del OS: ', os.release());
    console.log('Arquitectura del OS: ', os.arch());
    console.log('CPU: ', os.cpus());
    console.log('Memoria libre: ', os.freemem());
    console.log('Memoria total: ', os.totalmem());
 