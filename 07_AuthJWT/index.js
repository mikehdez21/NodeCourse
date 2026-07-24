import express from 'express'
import cookieParser from 'cookie-parser'
import { PORT, SECRET_JWT_KEY } from './config.js'
import { UserRepository } from './user-repositoy.js'
import jwt from 'jsonwebtoken'

const app = express()
app.set('view engine', 'ejs') // Configuración del motor de plantillas EJS

// Middlewares (Funciones por donde pasa la request antes de llegar a la ruta)
app.use(express.json()) // Middleware para parsear el body de la request a JSON
app.use(cookieParser()) // Middleware para parsear las cookies de la request

app.use((req, res, next) => { // Middleware para verificar si el usuario está logueado con JWT
    const token = req.cookies.access_token // Obtiene el token de la cookie
    req.session = { user: null }

    // Verificar el token
    try{
        const data = jwt.verify(token, SECRET_JWT_KEY)
        req.session.user = data // Guarda la información del usuario en la sesión
    } catch {}

    next() // Pasa al siguiente middleware o ruta
})


app.get('/', (req, res) => {
    const { user } = req.session
    res.render('index', user ) // Renderiza la vista index.ejs y le pasa el user 
})

app.get('/protected', (req, res) => {
    const { user } = req.session
    if (!user) return res.status(403).send('Access not authorized') // Si no hay usuario en la sesión, devuelve un error 403
  res.render('protected', user) // Renderiza la vista protected.ejs y le pasa el user
})


// AUTH //
app.post('/login', async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await UserRepository.login({ username, password })
        // JWT Params: {payload (Data) + Secret Key + ExpiresIn}
        const token = jwt.sign({ id: user._id, username: user.username }, SECRET_JWT_KEY , { expiresIn: '1h' }) // Genera un token JWT con la información del usuario y una clave secreta, que expira en 1 hora

        res
            .cookie('access_token', token, { httpOnly: true, sameSite: 'strict' }) // Guarda el token en una cookie httpOnly para que no pueda ser accedida desde el cliente y sea solo por el servidor
            .status(200)
            .json({ message: 'Login successful', user }) // Devuelve un mensaje de éxito y la información del usuario (sin la contraseña)
        
    } catch (error) {
        res.status(401).json({ error: error.message }) // Se recomienda no devolver el error del backend
        // sino que mejor devolver un mensaje genérico como "Invalid username or password" para no dar pistas a un atacante sobre qué parte de la autenticación falló.
    }   
})

app.post('/register', async (req, res) => {
    const { username, password } = req.body // Body es el cuerpo de la request
    try {
        const id = await UserRepository.create({ username, password })
        res.status(201).json({ message: 'User created successfully', id })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

app.post('/logout', (req, res) => {
  res.clearCookie('access_token').json({ message: 'Logout successful' })
})

app.get('/protected', (req, res) => {
  const { user } = req.session
  if (!user) return res.status(403).send('Access not authorized')
  res.render('protected', user)
})


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
