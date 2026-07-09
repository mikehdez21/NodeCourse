const z = require('zod'); // Zod es una biblioteca de validación y análisis de esquemas para JavaScript y TypeScript. Permite definir esquemas de datos y validar objetos contra esos esquemas, asegurando que los datos cumplan con ciertas reglas y estructuras antes de ser procesados o almacenados.

const movieSchema = z.object({
    title: z.string({
        required_error: 'Movie title is required'
    }),
    year: z.number().int().min(1900).max(2026),
    director: z.string(),
    duration: z.number().int().positive(),
    rate: z.number().min(0).max(10).default(5),
    poster: z.string().url({
        message: 'Poster must be a valid URL'
    }),

    genre: z.array(
        z.enum(['Action', 'Comedy', 'Drama', 'Crime', 'Fantasy', 'Horror', 'Mystery', 
            'Romance', 'Thriller', 'Western']),
        {    
            required_error: 'Genre is required',
            invalid_type_error: 'Invalid genre'
        }
    )
});

function validateMovie (object){
    return movieSchema.safeParse(object);
}

// El Partial trae una versión del esquema donde todos los campos son opcionales, 
// lo que permite validar objetos que pueden tener solo un 
// subconjunto de las propiedades definidas en el esquema original.

// Si lo trae, lo valida y modifica
// Si no trae nada, no pasa nada
function validateMoviePartial (object){
    return movieSchema.partial().safeParse(object);
}

module.exports = {
    validateMovie,
    validateMoviePartial
}