import { Router } from 'express';
import { MovieController } from '../controllers/movies.js';

// Se realiza una función que recibe el modelo de película como parámetro y devuelve un 
// enrutador configurado con las rutas correspondientes. Esto permite que el enrutador sea 
// independiente del modelo específico que se esté utilizando
// lo que facilita la reutilización del código y la posibilidad de cambiar el 
// modelo sin afectar al enrutador.

// El parámetro movieModel se inyecta desde el punto de entrada (app.js)
export const createMovieRouter = ({ movieModel }) => {

    const moviesRouter = Router();

    const movieController = new MovieController({ movieModel });

    moviesRouter.get('/', movieController.getAll);
    moviesRouter.post('/', movieController.create);

    moviesRouter.get('/:id', movieController.getById);
    moviesRouter.delete('/:id', movieController.delete);
    moviesRouter.patch('/:id', movieController.update);

    return moviesRouter;
}




