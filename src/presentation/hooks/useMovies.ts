/* eslint-disable @typescript-eslint/no-unused-vars */
import {useEffect, useState} from 'react';
import {Movie} from '../../core/entities/movie.entity';
import * as UseCases from '../../core/use-cases';
import {movieDBFetcher} from '../../config/adapters/movieDB.adapter';

export const useMovies = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);

  useEffect(() => {
    initialLoad();
  }, []);

  const initialLoad = async () => {
    const nowPLayingMovies = await UseCases.moviesNowPlayingCase(
      movieDBFetcher,
    );
  };
  return {isLoading, nowPlaying};
};
