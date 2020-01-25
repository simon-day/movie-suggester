import React from 'react';
import './Movie.scss';
// import TrailerModal from './TrailerModal';

const Movie = ({
  loadingTrailer,
  setCurrentTitle,
  currentTitle,
  movie: { title, releaseYear, rating, imageURL, summary }
}) => {
  console.log('currentTitle: ', currentTitle);
  console.log('title: ', title);

  const buttonClasses = ['btn', 'btn-primary', 'mt-2'];

  const titleToCheck = `${title} ${releaseYear}`;

  const buttonText =
    loadingTrailer && titleToCheck === currentTitle
      ? 'Loading'
      : 'Watch Trailer';

  return (
    <>
      <div className="card m-2" style={{ maxWidth: '540px' }}>
        <div className="row no-gutters">
          <div className="col-md-4">
            <img src={imageURL} className="card-img" alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{summary}</p>
              <a
                target="_blank"
                href={`https://www.amazon.com/s?tag=movie-suggest-20&k=${title}&i=movies-tv-intl-ship&ref=nb_sb_noss?tag=movie-suggest-20`}
                className="btn btn-block btn-primary btn-sm mt-auto"
              >
                Watch on Prime
              </a>
              <div>
                <button
                  disabled={loadingTrailer}
                  className="btn btn-sm btn-primary"
                  onClick={() => {
                    setCurrentTitle(`${title} ${releaseYear}`);
                  }}
                >
                  {loadingTrailer && buttonText === 'Loading' && (
                    <i className="fa fa-spinner fa-spin"></i>
                  )}
                  {buttonText}
                </button>
              </div>
              <p className="card-text"></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Movie;
