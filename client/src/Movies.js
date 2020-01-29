import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Movie from './Movie';
import './Movies.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import ModalVideo from 'react-modal-video';
import youtube from './youtubeApi';

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
  const [movieDetailsOpen, setMovieDetailsOpen] = useState(false);

  const fetchTrailer = async () => {
    setLoadingTrailer(true);

    // const response = await youtube.get('/search', {
    //   params: {
    //     q: currentTitle
    //   }
    // });

    const res = await axios.get(
      'https://www.googleapis.com/youtube/v3/search',
      {
        params: {
          key: process.env.REACT_APP_YT_KEY,
          type: 'video',
          part: 'snippet',
          maxResults: 1,
          q: currentTitle
        }
      }
    );

    // console.log(res.data.items[0].id.videoId);

    setTrailerId(res.data.items[0].id.videoId);
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

  const slidesToShowNo = movies.length <= 2 ? movies.length : 3;

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShowNo,
    slidesToScroll: 3,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          dots: true,
          slidesToScroll: 3,
          infinite: true
          // dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false
        }
      }
    ]
  };

  return (
    <>
      <ModalVideo
        className="modal"
        channel="youtube"
        autoplay={true}
        isOpen={isOpen}
        videoId={trailerId}
        onClose={() => setIsOpen(false)}
      />
      <div className="movies-container">
        <Slider {...settings}>
          {movies.map((movie, i) => (
            <div key={i}>
              <Movie
                setMovieDetailsOpen={setMovieDetailsOpen}
                trailerId={trailerId}
                fetchTrailer={fetchTrailer}
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
      </div>
    </>
  );
};

export default Movies;
