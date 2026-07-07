const fs = require('node:fs')

const stats = fs.statSync('archivo.txt')
console.log('Tamaño del archivo: ', stats.size)
console.log('Fecha de creación: ', stats.birthtime)
console.log('Fecha de modificación: ', stats.mtime)