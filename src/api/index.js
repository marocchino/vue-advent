import firebase from 'firebase'

export default firebase
  .initializeApp({
    databaseURL: 'https://sweltering-torch-2616.firebaseIO.com/'
  })
  .database()
