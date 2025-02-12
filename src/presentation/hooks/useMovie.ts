/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';
import * as UseCases from '../../core/use-cases';
import {movieDBFetcher} from '../../config/adapters/movieDB.adapter';
import {FullMovie} from '../../core/entities/movie.entity';

export const useMovie = (movieId: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState<FullMovie>();

  useEffect(() => {
    loadMovie();
  }, [movieId]);

  const loadMovie = async () => {
    setIsLoading(true);
    const fullMovie = await UseCases.getMovieByIdCase(movieDBFetcher, movieId);
    setMovie(fullMovie);
    setIsLoading(false);
  };

  return {
    isLoading,
    movie,
  };
};
