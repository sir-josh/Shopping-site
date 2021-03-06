import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDFu7YgMs-BogprQGekDjaSw4RX9M45exo",
  authDomain: "crwn-db-551d2.firebaseapp.com",
  databaseURL: "https://crwn-db-551d2.firebaseio.com",
  projectId: "crwn-db-551d2",
  storageBucket: "crwn-db-551d2.appspot.com",
  messagingSenderId: "373423983592",
  appId: "1:373423983592:web:ec05c92675f313113c325d",
  measurementId: "G-N0SYH9S5C3"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
