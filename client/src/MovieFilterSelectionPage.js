import React, { useState, useEffect } from 'react';
import axios from 'axios';

const dateHashTable = {
  "'60s": ['1960-01-01', '1969-12-31'],
  "'70s": ['1970-01-01', '1979-12-31'],
  "'80s": ['1980-01-01', '1989-12-31'],
  "'90s": ['1990-01-01', '1999-12-31'],
  "'00s": ['2000-01-01', '2009-12-31'],
  "'10s": ['2010-01-01', '2019-12-31']
};

const genreHashTable = {
  Laughs: 'comedy',
  Frights: 'horror',
  Action: 'action',
  Drama: 'drama'
};

const baseUrl = 'http://localhost:8000/movies';

const MovieFilterSelectionPage = ({ setMovies, setIsLoading }) => {
  const [filters, setFilters] = useState({
    releaseStart: '1990-01-01',
    releaseEnd: '2019-12-31',
    type: ''
  });
  const [queryParams, setQueryParams] = useState({});
  const [selectedGenreBtn, setSelectedGenreBtn] = useState('');
  const [selectedPeriodBtn, setSelectedPeriodBtn] = useState('');

  useEffect(() => {
    if (!Object.keys(queryParams).length) {
      console.log('Prob');
      return;
    } else {
      setIsLoading(true);
      console.log('TEST');
      axios
        .get(baseUrl, {
          params: {
            releaseStart: queryParams.releaseStart,
            releaseEnd: queryParams.releaseEnd,
            type: queryParams.type
          }
        })
        .then(res => {
          console.log(res);
          setMovies(res.data);
          setIsLoading(false);
        });
    }
  }, [queryParams]);

  const selectPeriod = e => {
    setSelectedPeriodBtn(e.target.value);
    setFilters({
      ...filters,
      releaseStart: dateHashTable[e.target.value][0],
      releaseEnd: dateHashTable[e.target.value][1]
    });
  };

  const selectGenre = e => {
    setSelectedGenreBtn(e.target.value);
    setFilters({
      ...filters,
      type: genreHashTable[e.target.value]
    });
  };

  return (
    <div>
      <h3>I want...</h3>
      {Object.keys(genreHashTable).map(btn => (
        <button
          key={btn}
          className={btn === selectedGenreBtn ? 'selected' : ''}
          onClick={selectGenre}
          value={btn}
        >
          {btn}
        </button>
      ))}

      <h3>From the...</h3>
      {Object.keys(dateHashTable).map(btn => (
        <button
          key={btn}
          className={btn === selectedPeriodBtn ? 'selected' : ''}
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
        <h3>Search</h3>
        <button type="submit">Find Movies</button>
      </form>
    </div>
  );
};

export default MovieFilterSelectionPage;
