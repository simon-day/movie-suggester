import React from 'react';
import Movie from './Movie';
import './Movies.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    />
  );
}

const Movies = ({ movies }) => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  return (
    <div className="movies-container">
      <Slider {...settings}>
        {movies.map((movie, i) => (
          <div key={i}>
            <Movie movie={movie} />
          </div>
        ))}
      </Slider>

      {/* <div className="movies">
        {movies.map((movie, i) => (
          <Movie key={i} movie={movie} />
        ))}
      </div> */}
    </div>
  );
};

export default Movies;
