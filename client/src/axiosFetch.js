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
