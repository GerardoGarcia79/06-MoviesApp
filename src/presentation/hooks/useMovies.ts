import {useEffect, useState} from 'react';
import {Movie} from '../../core/entities/movie.entity';
import * as UseCases from '../../core/use-cases';
import {movieDBFetcher} from '../../config/adapters/movieDB.adapter';

let popularPageNumber = 1;
let topRatedPageNumber = 1;
let upcomingPageNumber = 1;

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
  return {
    isLoading,
    nowPlaying,
    popular,
    topRated,
    upcoming,
    popularNextPage: async () => {
      popularPageNumber++;
      const popularMovies = await UseCases.moviesPopularCase(movieDBFetcher, {
        page: popularPageNumber,
      });
      setPopular(prev => [...prev, ...popularMovies]);
    },
    topRatedNextPage: async () => {
      topRatedPageNumber++;
      const topRatedMovies = await UseCases.moviesTopRatedCase(movieDBFetcher, {
        page: topRatedPageNumber,
      });
      setTopRated(prev => [...prev, ...topRatedMovies]);
    },
    upcomingNextPage: async () => {
      upcomingPageNumber++;
      const upcomingMovies = await UseCases.moviesUpcomingCase(movieDBFetcher, {
        page: upcomingPageNumber,
      });
      setUpcoming(prev => [...prev, ...upcomingMovies]);
    },
  };
};
