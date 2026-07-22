import { readJson } from '../../utils.js';
import { randomUUID } from 'node:crypto';

// Implementación en el sistema de archivos local para manejar la persistencia de datos de películas.
const movies = readJson('./movies.json');

// Lógica de negocio para manejar las películas. Esta clase proporciona métodos para obtener todas las películas y filtrar por género. 
// Se puede expandir con más métodos según sea necesario.

export class MovieModel{
    // GET
    static async getAll ({genre}) {
        if(genre){
            return movies.filter(
                m => m.genre.some(g => g.toLowerCase() === genre.toLowerCase())
            );
        }
        return movies;
    }

    // GET by ID
    static async getById({id}){
        const movie = movies.find(m => m.id === id);
        return movie;
    }

    // POST
    static async create ({movieData}){
        const newMovie = {
            id: crypto.randomUUID(),
            ...movieData
        }
        movies.push(newMovie);
        return newMovie;
    }
 
    // DELETE
    static async delete({id}){
        const movieIndex = movies.findIndex(m => m.id === id);

        if (movieIndex === -1) return false;

        movies.splice(movieIndex, 1);
        return true;

        
    }

    // PUT / PATCH
    static async update({id, movieData}){
        const movieIndex = movies.findIndex(m => m.id === id);
        if (movieIndex === -1) return false;

        movies[movieIndex] = {
            ...movies[movieIndex],
            ...movieData
        }
        return movies[movieIndex];
    }


}