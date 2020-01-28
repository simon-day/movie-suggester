// axios
//   .get(baseUrl, {
//     params: {
//       releaseStart: queryParams.releaseStart,
//       releaseEnd: queryParams.releaseEnd,
//       type: queryParams.type
//     }
//   })
//   .then(res => {
//     console.log(res);
//     setMovies(res.data);
//     setIsLoading(false);

//     firestore
//       .collection(queryParams.type)
//       .doc(selectedPeriodBtn.slice(1))
//       .set({
//         movies: res.data
//       })
//       .then(function() {
//         console.log('Document successfully written!');
//       })
//       .catch(function(error) {
//         console.error('Error writing document: ', error);
//       });
//   });

const test = {
  Title: 'Death Proof',
  Year: '2007',
  Rated: 'Not Rated',
  Released: '31 May 2007',
  Runtime: '113 min',
  Genre: 'Thriller',
  Director: 'Quentin Tarantino',
  Writer: 'Quentin Tarantino',
  Actors: 'Kurt Russell, Zoë Bell, Rosario Dawson, Vanessa Ferlito',
  Plot:
    'In Austin, Texas, the girlfriends Julia, Arlene and Shanna meet in a bar to drink, smoke and make out with their boyfriends before traveling alone to Lake LBJ to spend the weekend together. They meet the former Hollywood stuntman Mike, who takes Pam out in his "death-proof" stunt car. Fourteen months later, Mike turns up in Lebanon, Tennessee and chase Abernathy, Zoë and Kim, but these girls are tough and decide to pay-back the attack.',
  Language: 'English',
  Country: 'USA',
  Awards: '7 nominations.',
  Poster:
    'https://m.media-amazon.com/images/M/MV5BYTdmZmY3Y2QtNjU5NC00OGUxLTg3MWQtMmE2ODM5Mzg3MzcyL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg',
  Ratings: [
    { Source: 'Internet Movie Database', Value: '7.0/10' },
    { Source: 'Rotten Tomatoes', Value: '63%' }
  ],
  Metascore: 'N/A',
  imdbRating: '7.0',
  imdbVotes: '254,200',
  imdbID: 'tt1028528',
  Type: 'movie',
  DVD: '17 Sep 2007',
  BoxOffice: 'N/A',
  Production: 'The Weinstein Co./Dimension',
  Website: 'N/A',
  Response: 'True'
};
