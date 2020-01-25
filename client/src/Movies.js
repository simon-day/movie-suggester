import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Movie from './Movie';
import './Movies.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import ModalVideo from 'react-modal-video';

function Arrow(props) {
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
  const [isOpen, setIsOpen] = useState(false);
  const [currentTitle, setCurrentTitle] = useState('');
  const [loadingTrailer, setLoadingTrailer] = useState(false);
  const [trailerId, setTrailerId] = useState('');

  const fetchTrailer = async () => {
    setLoadingTrailer(true);
    const vidLink = await axios.get(
      `http://localhost:8000/trailer?title=${currentTitle}`
    );
    console.log(vidLink.data);
    setTrailerId(vidLink.data);
    setLoadingTrailer(false);
    setCurrentTitle('');
    setIsOpen(true);
  };

  useEffect(() => {
    if (!currentTitle.length) {
      return;
    } else {
      fetchTrailer();
    }
  }, [currentTitle]);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>
      <ModalVideo
        className="modal"
        channel="youtube"
        isOpen={isOpen}
        videoId={trailerId}
        onClose={() => setIsOpen(false)}
      />
      <div className="movies-container">
        <Slider {...settings}>
          {movies.map((movie, i) => (
            <div key={i}>
              <Movie
                currentTitle={currentTitle}
                loadingTrailer={loadingTrailer}
                setIsOpen={setIsOpen}
                setCurrentTitle={setCurrentTitle}
                movieIndex={i}
                movie={movie}
              />
            </div>
          ))}
        </Slider>

        {/* <div className="movies">
        {movies.map((movie, i) => (
          <Movie key={i} movie={movie} />
        ))}
      </div> */}
      </div>
    </>
  );
};

export default Movies;
