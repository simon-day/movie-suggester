import React, { useState, useEffect } from 'react';
import { firestore } from './utils/firebase';
// import fetchMoviesFromFirestore from './utils/fetchMoviesFromFirestore';
// import axios from 'axios';

const dateHashTable = {
  "'10s": ['2010-01-01', '2019-12-31'],
  "'00s": ['2000-01-01', '2009-12-31'],
  "'90s": ['1990-01-01', '1999-12-31'],
  "'80s": ['1980-01-01', '1989-12-31'],
  "'70s": ['1970-01-01', '1979-12-31'],
  "'60s": ['1960-01-01', '1969-12-31']
};

const genreHashTable = {
  Laughs: 'comedy',
  Frights: 'horror',
  Action: 'action',
  Drama: 'drama',
  Thrills: 'thriller',
  Romance: 'romance'
};

// const baseUrl = 'http://localhost:8000/movies';

const MovieFilterSelectionPage = ({
  setMovies,
  setFilteredMovies,
  setGenre,
  setPeriod,
  setIsLoading
  // movies
}) => {
  const [filters, setFilters] = useState({
    releaseStart: '1990-01-01',
    releaseEnd: '2019-12-31',
    type: ''
  });
  const [queryParams, setQueryParams] = useState({});
  const [selectedGenreBtn, setSelectedGenreBtn] = useState('');
  const [selectedPeriodBtn, setSelectedPeriodBtn] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!Object.keys(queryParams).length) {
      return;
    }
    if (!queryParams.type || !selectedPeriodBtn) {
      setErrorMessage('Must select options!');
      return;
    } else {
      setErrorMessage('');
      setIsLoading(true);

      const fetchMoviesFromFirestore = async () => {
        var docRef = firestore
          .collection(queryParams.type)
          .doc(selectedPeriodBtn.slice(1));

        docRef
          .get()
          .then(async function(doc) {
            if (doc.exists) {
              const noofMovieDocs = doc.data().movies.length;
              const randomNums = [];

              while (randomNums.length < 12) {
                let randomIndex = Math.floor(Math.random() * noofMovieDocs);
                if (randomNums.indexOf(randomIndex) === -1) {
                  randomNums.push(randomIndex);
                }
              }

              const movieData = await doc.data().movies;
              const filtered = await randomNums.map(num =>
                movieData.indexOf(num)
                  ? { ...movieData[num], index: num }
                  : null
              );
              setFilteredMovies(filtered);
              setMovies(movieData);
              setIsLoading(false);
            } else {
              console.log('No such document!');
            }
          })
          .catch(function(error) {
            console.log('Error getting document:', error);
          });
      };

      fetchMoviesFromFirestore(queryParams.type, selectedPeriodBtn.slice(1));
    }
  }, [queryParams]);

  const selectPeriod = e => {
    setSelectedPeriodBtn(e.target.value);
    setPeriod(e.target.value);
    setFilters({
      ...filters,
      releaseStart: dateHashTable[e.target.value][0],
      releaseEnd: dateHashTable[e.target.value][1]
    });
  };

  const selectGenre = e => {
    setSelectedGenreBtn(e.target.value);
    setGenre(genreHashTable[e.target.value]);
    setFilters({
      ...filters,
      type: genreHashTable[e.target.value]
    });
  };

  return (
    <div>
      <h3 className="m-2">I want...</h3>
      {Object.keys(genreHashTable).map(btn => (
        <button
          key={btn}
          className={
            btn === selectedGenreBtn
              ? 'selected btn-primary btn-lg m-2'
              : 'btn-danger btn-lg m-2'
          }
          onClick={selectGenre}
          value={btn}
        >
          {btn}
        </button>
      ))}

      <h3 className="m-3">From the...</h3>
      {Object.keys(dateHashTable).map(btn => (
        <button
          key={btn}
          className={
            btn === selectedPeriodBtn
              ? 'selected btn-primary btn-lg m-2'
              : 'btn-info btn-lg m-2'
          }
          onClick={selectPeriod}
          value={btn}
        >
          {btn}
        </button>
      ))}

      <form
        onSubmit={e => {
          e.preventDefault();
          setQueryParams({
            type: filters.type,
            releaseStart: filters.releaseStart,
            releaseEnd: filters.releaseEnd
          });
        }}
      >
        <button type="submit" className="mt-4 btn-dark btn-lg">
          Find Movies
        </button>
        {errorMessage && (
          <p className="lead error-message mt-4">{errorMessage}</p>
        )}
      </form>
    </div>
  );
};

export default MovieFilterSelectionPage;
