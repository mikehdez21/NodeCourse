// El controller solo se modifica el model (Ya se por un JSON, una base de datos X)
// Se especifica cual y el controller es agnostico de donde vienen los datos 

import { MovieModel } from "../models/mysql/movie.js";
import { validateMovie ,validateMoviePartial } from "../schemas/movies.js";

export class MovieController{

    constructor ({movieModel}) {
        this.movieModel = movieModel;
    }

    getAll = async (req, res) => {
        const { genre } = req.query;
        const movies = await this.movieModel.getAll({genre});
        res.json(movies);

    }

    getById = async (req, res) => {
        const {id} = req.params;
        const movie = await this.movieModel.getById({id});

        if (movie) {
            return res.json(movie);
        } else {
            return res.status(404).json({ error: 'Película no encontrada' });
        }
    }

    create = async (req, res) => {
        const result = validateMovie(req.body)

        if (!result.success) {
        // 422 Unprocessable Entity
        return res.status(400).json({ error: JSON.parse(result.error.message) })
        }

        const newMovie = await this.movieModel.create({ input: result.data })

        res.status(201).json(newMovie)
    } 

    delete = async (req, res) => {
        const {id} = req.params;
        const result = await this.movieModel.delete({id});
        if (!result) {
            return res.status(404).json({ error: 'Película no encontrada' });
        }
        res.json({ message: 'Película eliminada' });
    }

    update = async (req, res) => {
        const result = validateMoviePartial(req.body);
        if(!result.success ){
            return res.status(400).json({ error: JSON.parse(result.error.message) });
        }
        
        const {id} = req.params;
        const updatedMovie = await this.movieModel.update({id, input: result.data});

        if (!updatedMovie) {
            return res.status(404).json({ error: 'Película no encontrada' });
        }
        res.json(updatedMovie);
    }


}
