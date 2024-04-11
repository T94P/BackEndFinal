import { Request, Response } from 'express';
import Movie from '../models/Movie';

export const createMovie = async (req: Request, res: Response): Promise<Response> => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    return res.status(201).send(movie);
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const getAllMovies = async (req: Request, res: Response): Promise<Response> => {
  try {
    const movies = await Movie.find({}); // assuming you have a model called Movie
    return res.status(200).send(movies);
  } catch (error) {
    return res.status(400).send(error);
  }
};

 export const updateMovie = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByIdAndUpdate(id, req.body, { new: true });

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    return res.status(200).json(movie);
  } catch (error) {
    return res.status(400).json({ message: 'Error updating movie', error });
  }
};


export const deleteMovie = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const movie = await Movie.findOneAndDelete({ _id: id });

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    return res.status(200).json({ message: 'Movie successfully deleted' });
  } catch (error) {
    return res.status(400).json({ message: 'Error deleting movie', error });
  }
};




export default { createMovie, getAllMovies, updateMovie, deleteMovie  };