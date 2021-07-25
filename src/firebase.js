// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyBfkk_apy9RjMPhn2DDocXyi8MMZIAwglU",
//     authDomain: "instagramclone-62f0c.firebaseapp.com",
//     projectId: "instagramclone-62f0c",
//     storageBucket: "instagramclone-62f0c.appspot.com",
//     messagingSenderId: "900329604864",
//     appId: "1:900329604864:web:d43a342ae5e473ec8395e5",
//     measurementId: "G-9YJTSD788E"
//   };

  import firebase from 'firebase';
  
  const fireBaseApp = firebase.initializeApp(
    {
        apiKey: "AIzaSyBfkk_apy9RjMPhn2DDocXyi8MMZIAwglU",
        authDomain: "instagramclone-62f0c.firebaseapp.com",
        projectId: "instagramclone-62f0c",
        storageBucket: "instagramclone-62f0c.appspot.com",
        messagingSenderId: "900329604864",
        appId: "1:900329604864:web:d43a342ae5e473ec8395e5",
        measurementId: "G-9YJTSD788E"
      }
  );
  const db = fireBaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export { db,auth,storage };