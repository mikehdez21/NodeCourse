import DBLocal from 'db-local'
import crypto from 'node:crypto'
import bcrypt from 'bcrypt'
import { SALT_ROUND } from './config.js'

const { Schema } = new DBLocal({ path: './db' }) // Schema de base de datos que se guardará físicamente en el disco duro

const User = Schema('User', {
    _id: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true}
})

export class UserRepository {

    // REGISTER
    static async create ({username, password}) { // Metodos y propiedades statics se pueden usar sin hacer instancias de la clase (new)
        // Con TypeScript se usan las interfaces

        Validation.username(username)
        Validation.password(password)

        // Crear usuario
        const existingUser = User.findOne({ username })
        if (existingUser) throw new Error(`The username ${username} is already taken`)


        const id = crypto.randomUUID()
        const hashedPassword = await bcrypt.hashSync(password, SALT_ROUND)
        // hashSync es un metodo de bcrypt que permite hashear la contraseña de manera sincrona, es decir, que no bloquea el hilo principal de ejecución. 
        // SALT_ROUND es el número de rondas de sal que se aplicarán al hash. 
        // Cuanto mayor sea el número, más seguro será el hash, pero también más lento será el proceso de hash.
        
        // hash (simple) es un metodo de bcrypt que permite hashear la contraseña de manera asincrona, 
        // es decir, que no bloquea el hilo principal de ejecución. SALT_ROUND es el número de rondas de sal que se aplicarán al hash. 
        // Cuanto mayor sea el número, más seguro será el hash, pero también más lento será el proceso de hash.
        
        User.create({
            _id: id,
            username,
            password: hashedPassword
        }).save()
        
        return id
    }

    // LOGIN
    static async login ({username, password}) {
        Validation.username(username)
        Validation.password(password)

        const user = User.findOne({ username })
        if (!user) throw new Error('User not found')

        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) throw new Error('Invalid password')

        const { password: _, ...userWithoutPassword } = user // Destructuring para eliminar la propiedad password del objeto user

        return userWithoutPassword
    }
}

// Validaciones sencillas (Se recomienda uso de "Zod" y usar sus schemas)
class Validation {
  static username (username) {
    if (typeof username !== 'string') throw new Error('Username must be a string')
    if (username.length < 3) throw new Error('Username must be at least 3 characters long')
  }

  static password (password) {
    if (typeof password !== 'string') throw new Error('Password must be a string')
    if (password.length < 6) throw new Error('Password must be at least 6 characters long')
  }
}