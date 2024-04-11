import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  releaseDate: { type: String, required: true },
  trailerLink: { type: String, required: true },
  poster: { type: String, required: true },
  genres: { type: String, required: true },
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;