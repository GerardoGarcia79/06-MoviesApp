import {useEffect, useState} from 'react';
import {Movie} from '../../core/entities/movie.entity';
import * as UseCases from '../../core/use-cases';
import {movieDBFetcher} from '../../config/adapters/movieDB.adapter';

export const useMovies = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [popular, setPopular] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [upcoming, setUpcoming] = useState<Movie[]>([]);

  useEffect(() => {
    initialLoad();
  }, []);

  const initialLoad = async () => {
    const [nowPLayingMovies, upcomingMovies, topRatedMovies, popularMovies] =
      await Promise.all([
        UseCases.moviesNowPlayingCase(movieDBFetcher),
        UseCases.moviesPopularCase(movieDBFetcher),
        UseCases.moviesTopRatedCase(movieDBFetcher),
        UseCases.moviesUpcomingCase(movieDBFetcher),
      ]);

    setNowPlaying(nowPLayingMovies);
    setPopular(popularMovies);
    setTopRated(topRatedMovies);
    setUpcoming(upcomingMovies);

    setIsLoading(false);
  };
  return {isLoading, nowPlaying, popular, topRated, upcoming};
};
