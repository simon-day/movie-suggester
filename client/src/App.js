import React, { Component } from 'react';
import './App.scss';
import MovieFilterSelectionPage from './MovieFilterSelectionPage';
import Movies from './Movies';
import LoadingSpinner from './LoadingSpinner';
// import Pagination from './Pagination';

// const mockMovie = [
//   {
//     title: 'Movie 1',
//     imageURL:
//       'https://m.media-amazon.com/images/M/MV5BMWU0MGYwZWQtMzcwYS00NWVhLTlkZTAtYWVjOTYwZTBhZTBiXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_UX182_CR0,0,182,268_AL_.jpg',
//     rating: 7.5,
//     summary: 'fdsffdsfsdfdsfsfsdfsd'
//   },
//   { title: 'Movie 2', releaseYear: 2006, rating: 7.2 },
//   { title: 'Movie 3', releaseYear: 2014, rating: 8.1 }
// ];

class App extends Component {
  state = {
    movies: [],
    isLoading: false,
    currentPage: 1,
    moviesPerPage: 4,
    isOpen: false
  };

  setMovies = movies => {
    this.setState({ movies });
  };

  setIsLoading = loading => {
    this.setState({ isLoading: loading });
  };

  paginate = pageNumber => {
    this.setState({ currentPage: pageNumber });
  };

  openModal = () => this.setState({ isOpen: true });

  render() {
    const { isLoading, movies, moviesPerPage, currentPage } = this.state;

    // get current posts
    // const indexOfLastMovie = currentPage * moviesPerPage;
    // const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    // const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
    return (
      <>
        <div className="App">
          {isLoading && <LoadingSpinner />}

          {movies.length === 0 && !isLoading && (
            <MovieFilterSelectionPage
              setMovies={this.setMovies}
              setIsLoading={this.setIsLoading}
            />
          )}

          <br />
          {!!movies.length && (
            <>
              <Movies
                moviesPerPage={moviesPerPage}
                currentPage={currentPage}
                movies={movies}
              />
              {/* <Pagination
              moviesPerPage={moviesPerPage}
              totalMovies={movies.length}
              paginate={this.paginate}
            /> */}
            </>
          )}
        </div>
      </>
    );
  }
}

export default App;
