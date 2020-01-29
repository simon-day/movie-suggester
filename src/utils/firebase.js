import firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyBH-GlgJ5elxxIVHsig6QhONNI2IKRwM-g',
  authDomain: 'movie-suggester-98958.firebaseapp.com',
  databaseURL: 'https://movie-suggester-98958.firebaseio.com',
  projectId: 'movie-suggester-98958',
  storageBucket: 'movie-suggester-98958.appspot.com',
  messagingSenderId: '61587688125',
  appId: '1:61587688125:web:21311a0d81c871d73245d4'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
