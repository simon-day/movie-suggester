let imageURL =
  'https://m.media-amazon.com/images/M/MV5BMWU0MGYwZWQtMzcwYS00NWVhLTlkZTAtYWVjOTYwZTBhZTBiXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_UX67_CR0,0,67,98_AL_.jpg';

const replaceTable = {
  UX67: 'UX182',
  '0,67,98': '0,182,268'
};

imageURL = imageURL.replace(/(UX67)|(0,67,98)/gi, function(matched) {
  return replaceTable[matched];
});

console.log(imageURL);
