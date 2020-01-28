import React, { useState } from 'react';
import './Movie.scss';
import MovieDetails from './MovieDetails';
import useModal from 'react-hooks-use-modal';
// import './styles.module.css';
// import TrailerModal from './TrailerModal';

const Movie = ({ loadingTrailer, setCurrentTitle, currentTitle, movie }) => {
  let { title, releaseYear, imageURL, summary } = movie;
  const titleToCheck = `${title} ${releaseYear}`;
  const [Modal, open, close] = useModal('root');

  const [selectedMovie, setSelectedMovie] = useState('');

  const buttonText =
    loadingTrailer && titleToCheck === currentTitle
      ? ' Loading'
      : 'Watch Trailer';

  if (summary.length > 180) {
    summary = summary.substr(0, 170) + '...';
  }

  return (
    <>
      <Modal>
        <div className="details-modal">
          {selectedMovie && (
            <MovieDetails
              movie={movie}
              loadingTrailer={loadingTrailer}
              setSelectedMovie={setSelectedMovie}
              setCurrentTitle={setCurrentTitle}
              currentTitle={currentTitle}
              close={close}
            />
          )}
        </div>
      </Modal>

      <div className="card m-2" style={{ maxWidth: '540px' }}>
        <div className="row no-gutters">
          <div className="col-md-4">
            <img src={imageURL} className="card-img zoom" alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">
                {summary}{' '}
                <span
                  onClick={() => {
                    setSelectedMovie(title);
                    open();
                  }}
                  className="more-info"
                >
                  <a href="#!">...More Info</a>
                </span>
              </p>

              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.amazon.com/s?tag=movie-suggest-20&k=${title}&i=movies-tv-intl-ship&ref=nb_sb_noss?tag=movie-suggest-20`}
                className="btn prime-btn btn-block btn-primary btn-sm mt-auto"
              >
                Watch on Prime
              </a>
              <div>
                <a
                  disabled={loadingTrailer}
                  href="#!"
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
              </div>
              {/* <p className="card-text"></p> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Movie;
