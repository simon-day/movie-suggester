import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const MovieDetails = ({
  movie,
  setSelectedMovie,
  loadingTrailer,
  setCurrentTitle,
  currentTitle
}) => {
  const { title, rating, releaseYear, imdbId } = movie;
  const [movieInfo, setMovieInfo] = useState({});

  const titleToCheck = `${title} ${releaseYear}`;

  const buttonText =
    loadingTrailer && titleToCheck === currentTitle
      ? ' Loading'
      : 'Watch Trailer';

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchMovieDetails = async () => {
      try {
        const results = await axios.get(
          `https://api.themoviedb.org/3/movie/${imdbId}?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US
            `,
          { cancelToken: source.token }
        );
        setMovieInfo(results.data);
      } catch (error) {
        if (axios.isCancel(error)) {
        } else {
          throw error;
        }
      }
    };
    fetchMovieDetails();
    return () => {
      source.cancel();
      // setLoading(false);
    };
  }, [imdbId]);

  const infoLoaded = Object.keys(movieInfo).length > 0;

  if (infoLoaded) {
    const { runtime, budget, tagline, revenue } = movieInfo;
    return (
      <div>
        <a
          href="#!"
          disabled={loadingTrailer}
          className="btn btn-sm btn-primary trailer-button"
          onClick={() => {
            setCurrentTitle(`${title} ${releaseYear}`);
          }}
        >
          {loadingTrailer && buttonText === ' Loading' && (
            <i className="fa fa-spinner fa-spin"></i>
          )}
          {buttonText}
        </a>
        <h2>{title}</h2>
        <p>IMDB Rating: {rating}</p>
        <p>{releaseYear}</p>
        <p>{tagline}</p>
        <p>{runtime} Minutes</p>
        {!!budget && <p>Budget: ${parseFloat(budget).toLocaleString('en')}</p>}
        {!!revenue && (
          <p>Grossed: ${parseFloat(revenue).toLocaleString('en')}</p>
        )}
      </div>
    );
  }

  return (
    <div>
      {infoLoaded && <p>{movieInfo.tagline}</p>}
      <button onClick={() => setSelectedMovie('')}>Close</button>
    </div>
  );
};

export default MovieDetails;
