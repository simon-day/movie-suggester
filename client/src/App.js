import React, { Component } from 'react';
// import { Switch, Route } from 'react-router-dom';
import './App.scss';
import MovieFilterSelectionPage from './MovieFilterSelectionPage';
import Movies from './Movies';
import LoadingSpinner from './LoadingSpinner';

// import Pagination from './Pagination';

class App extends Component {
  state = {
    allMovies: [],
    genre: '',
    period: '',
    filteredMovies: [],
    isLoading: false,
    isOpen: false
  };

  getMoreMovies = async () => {
    const { allMovies } = this.state;

    const noofMovies = allMovies.length;
    const randomNums = [];

    while (randomNums.length < 12) {
      let randomIndex = Math.floor(Math.random() * noofMovies);
      if (randomNums.indexOf(randomIndex) === -1) {
        randomNums.push(randomIndex);
      }
    }

    const filtered = await randomNums.map(num =>
      allMovies.indexOf(num) ? { ...allMovies[num], index: num } : null
    );
    this.setState({ filteredMovies: filtered });
  };

  setMovies = allMovies => {
    this.setState({ allMovies });
  };

  setGenre = genre => this.setState({ genre });
  setPeriod = period => this.setState({ period });

  setFilteredMovies = filtered => {
    this.setState({ filteredMovies: filtered });
  };

  setIsLoading = loading => {
    this.setState({ isLoading: loading });
  };

  paginate = pageNumber => {
    this.setState({ currentPage: pageNumber });
  };

  resetFilters = () => {
    this.setState({ filteredMovies: [], allMovies: [] });
  };

  openModal = () => this.setState({ isOpen: true });

  render() {
    const {
      isLoading,
      period,
      genre,
      allMovies,
      filteredMovies,
      moviesPerPage,
      currentPage
    } = this.state;

    return (
      <>
        <div className="App">
          {!filteredMovies.length && (
            <h2 className="display-4 mt-2">Movie Suggester</h2>
          )}
          {!filteredMovies.length && !isLoading && (
            <p className="lead">
              Select what you're in the mood for and get a random selection of
              highly rated IMDB movies matching your choices!
            </p>
          )}
          {!!filteredMovies.length && (
            <button
              onClick={() => this.resetFilters()}
              className="btn mt-5  btn-outline-primary search-again-btn"
            >
              Start Again
            </button>
          )}
          {isLoading && <LoadingSpinner />}

          {allMovies.length === 0 &&
            !isLoading &&
            filteredMovies.length === 0 && (
              <MovieFilterSelectionPage
                setMovies={this.setMovies}
                setGenre={this.setGenre}
                setPeriod={this.setPeriod}
                setFilteredMovies={this.setFilteredMovies}
                setIsLoading={this.setIsLoading}
              />
            )}

          <br />
          {!!filteredMovies.length && (
            <>
              <Movies
                moviesPerPage={moviesPerPage}
                currentPage={currentPage}
                movies={filteredMovies}
              />
            </>
          )}
          {!!allMovies.length && (
            <button className="btn btn-info mb-5" onClick={this.getMoreMovies}>
              Load more {`${period} ${genre} Movies`}{' '}
            </button>
          )}
        </div>
        <div className="footer">
          We are a participant in the Amazon Services LLC Associates Program, an
          affiliate advertising program designed to provide a means for us to
          earn fees by linking to Amazon.com and affiliated sites.
        </div>
      </>
    );
  }
}

export default App;
