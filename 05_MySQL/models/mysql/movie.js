import mysql from 'mysql2/promise' // Promise para usar promesas y no callbacks

const configConnection = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '',
    database: 'moviesdb'
}

const connection = await mysql.createConnection(configConnection)


export class MovieModel {
  static async getAll ({ genre }) {
    const [movies] = await connection.query(
        'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie;',
    )
    return movies
  }

  static async getById ({ id }) {
    const [movies] = await connection.query(
        `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id 
        FROM movie WHERE id = UUID_TO_BIN(?);`,
        [id]
    )

    if (movies.length === 0) return null

    return movies[0]
  }

  static async create ({ input }) {
    const { title, year, director, duration, poster, rate } = input

    const [uuuidResult] = await connection.query(
        'SELECT UUID() as uuid;'
    )
    const [{uuid}] = uuuidResult

    try{
        await connection.query(
            `INSERT INTO movie (id, title, year, director, duration, poster, rate) 
            VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?);`,
            [title, year, director, duration, poster, rate]
        )

    } catch (e){
        throw new Error('Error al crear la película: ' + e.message)
    }

    const [movies] = await connection.query(
        `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id 
        FROM movie WHERE id = UUID_TO_BIN(?);`,
        [uuid]
    )

    return movies[0]
  }

  static async delete ({ id }) {
    
  }

  static async update ({ id, input }) {
    
  }
}