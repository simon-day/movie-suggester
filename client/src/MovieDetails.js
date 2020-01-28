import React, { useState } from 'react';
import axios from 'axios';
import { useEffect, useCallback } from 'react';

const MovieDetails = ({ movie, close }) => {
  const { title, imdbId } = movie;
  const [movieInfo, setMovieInfo] = useState({});

  const escFunction = useCallback(event => {
    if (event.keyCode === 27) {
      close();
    }
  }, []);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchMovieDetails = async () => {
      try {
        const results = await axios.get(
          `http://www.omdbapi.com/?i=${imdbId}&apikey=${process.env.REACT_APP_OMDB_KEY}
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

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);
    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, []);

  const infoLoaded = Object.keys(movieInfo).length > 0;

  if (infoLoaded) {
    const {
      Runtime,
      Genre,
      Director,
      Actors,
      Poster,
      Plot,
      Title,
      imdbRating,
      Ratings,
      Released
    } = movieInfo;

    return (
      <div className="container">
        <div id="movie">
          <div className="row">
            <div className="col-md-4">
              <img src={Poster} className="thumbnail" alt={title} />
            </div>
            <div className="col-md-8">
              <h2>{Title}</h2>
              <ul className="list-group">
                <li className="list-group-item">
                  <strong>Genre:</strong> {Genre}
                </li>
                <li className="list-group-item">
                  <strong>Runtime:</strong> {Runtime}utes
                </li>
                <li className="list-group-item">
                  <strong>Released:</strong> {Released}
                </li>

                <li className="list-group-item">
                  <strong>IMDB Rating:</strong> {imdbRating}
                </li>
                <li className="list-group-item">
                  <strong>Rotten Tomatoes:</strong> {Ratings[1].Value}
                </li>
                <li className="list-group-item">
                  <strong>Director:</strong> {Director}
                </li>
                <li className="list-group-item">
                  <strong>Starring:</strong> {Actors}
                </li>
              </ul>
              <div className="plot-info">
                <h3>Plot</h3>
                {Plot}
                <hr />
                <div className="row">
                  <button
                    className="btn m-2 btn-block btn-primary"
                    onClick={() => close()}
                  >
                    Close Info
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      //   {/* <div className="row">
      //     <div className="well">
      //       <h3>Plot:</h3>
      //       {Plot}
      //       <hr />
      // <a
      //   href="#!"
      //   disabled={loadingTrailer}
      //   className="btn btn-sm btn-primary trailer-button"
      //   onClick={() => {
      //     setCurrentTitle(`${title} ${releaseYear}`);
      //   }}
      // >
      //   {loadingTrailer && buttonText === ' Loading' && (
      //     <i className="fa fa-spinner fa-spin"></i>
      //   )}
      //   {buttonText}
      // </a>
      //     </div>
      //   </div> */}
    );
  }

  return <div>{infoLoaded && <p>{movieInfo.tagline}</p>}</div>;
};

export default MovieDetails;
