import React from 'react';
import './Movie.scss';

const Movie = ({
  movie: { title, releaseYear, rating, imageURL, summary }
}) => {
  return (
    <div className="card m-2" style={{ maxWidth: '540px' }}>
      <div class="row no-gutters">
        <div class="col-md-4">
          <img src={imageURL} class="card-img" alt="..." />
        </div>
        <div class="col-md-8">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{title}</h5>
            <p class="card-text">{summary}</p>
            <button className="btn btn-primary mt-auto">test</button>
            <p class="card-text"></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
