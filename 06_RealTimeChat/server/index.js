import express from 'express'
import logger from 'morgan' // Logger compatible con Express para las request y tener trazabilidad
import { Server } from 'socket.io' // Importar la clase Server de socket.io para crear un servidor de WebSocket
import { createServer } from 'node:http' // Crear servidor http de node 
import mysql from 'mysql2/promise' // Promise para usar promesas y no callbacks
import dotenv from 'dotenv' // Importar dotenv para cargar variables de entorno desde un archivo .env

dotenv.config() // Cargar variables de entorno desde un archivo .env



const port = process.env.PORT ?? 3000

const configConnection = {
    host: process.env.DB_HOST ?? 'localhost',
    user: process.env.DB_USER ?? 'root',
    port: process.env.DB_PORT ?? 3306,
    password: process.env.DB_PASSWORD ?? '',
    database: process.env.DB_NAME ?? 'realtimechatdb'
}

// Conectar a base de datos para tener PERSISTENCIA en los mensajes
const db = await mysql.createConnection(configConnection)

await db.query(`
    CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    content TEXT,
    user VARCHAR(255) NOT NULL
    );
`)

const app = express()

const server = createServer(app) // Se le pasa la app de express al servidor http para que pueda manejar las request de express y las conexiones de socket.io
const io = new Server(server, {
    connectionStateRecovery: {}
}) // "io" es el servidor de WebSocket que se crea a partir del servidor http

// Comportamiento del servidor usando websockets
io.on('connection', async (socket) => { // socket es el cliente que se ha conectado al servidor de WebSocket "io"
    console.log(`Client connected: ${socket.id}`)

    socket.on('chat message', async (msg) => {

        let result
        const username = socket.handshake.auth.username ?? 'anonymous'

        try{
            result = await db.execute(
                {
                    sql: 'INSERT INTO messages (content, user) VALUES (?, ?);',
                    values: [msg, username]
                }
            )
        } catch (error) {
            console.error('Error inserting message:', error)
            return
        }

        io.emit('chat message', {
            id: result[0].insertId, // mysql2 devuelve [rows, fields], insertId está en rows[0]
            content: msg,
            user: username,
        }); // data = { id, content, user }  // Emitir el mensaje a todos los clientes conectados al servidor de WebSocket "io"
    })

    console.log('Socket handshake auth:', socket.handshake.auth) // Mostrar la información de autenticación del cliente en el servidor

    if (!socket.recovered) { // <- recuperase los mensajes sin conexión
    try {

        const [results] = await db.execute({
            sql: 'SELECT id, content, user FROM messages WHERE id > ? ORDER BY id ASC', // Vital para orden cronológico
            values: [socket.handshake.auth.serverOffset ?? 0]
        });

        const messages = results.map(row => ({
          id: row.id,
          content: row.content,
          user: row.user
        }))

         // Se envía como un evento único con un array de mensajes anteriores
        socket.emit('previous_messages', messages); 

    } catch (e) {
      console.error(e)
    }
  }

    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`)
    })
})

app.use(logger('dev'))
app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html') // Enviar el archivo index.html al cliente con CWD (Current Working Directory)
})

server.listen(port, () => {
  console.log(`Server[Express] Running on http://localhost:${port}`)
})