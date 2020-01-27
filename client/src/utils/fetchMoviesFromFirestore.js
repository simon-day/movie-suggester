import { firestore } from './firebase';

const fetchMoviesFromFirestore = async (type, doc) => {
  var docRef = firestore.collection(type).doc(doc);

  docRef
    .get()
    .then(async function(doc) {
      if (doc.exists) {
        const noofMovieDocs = doc.data().movies.length;
        const randomNums = [];

        while (randomNums.length < 15) {
          let randomIndex = Math.floor(Math.random() * noofMovieDocs);
          if (randomNums.indexOf(randomIndex) === -1) {
            randomNums.push(randomIndex);
          }
        }

        const movieData = await doc.data().movies;
        const filtered = await randomNums.map(num =>
          movieData.indexOf(num) ? { ...movieData[num], index: num } : null
        );

        setFilteredMovies(filtered);
        setMovies(movieData);
        setIsLoading(false);
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    })
    .catch(function(error) {
      console.log('Error getting document:', error);
    });
};

export default fetchMoviesFromFirestore;
