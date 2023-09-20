import { db } from './firebase';
import {collection, getDocs, updateDoc, doc, addDoc} from 'firebase/firestore';


// Update Firebase data for an existing user or create a new user if they don't exist
export const sendDataToFirebase = async (data) => {
    try {
      const usersCollection = collection(db, 'users');
      console.log('Data to be updated or added:', data);
  
      const querySnapshot = await getDocs(usersCollection);
      const existingUser = querySnapshot.docs.find((doc) => doc.data().userName === data.userName);
  
      if (existingUser) {
        const docRef = doc(usersCollection, existingUser.id);
        await updateDoc(docRef, {
          userSong: data.userSong,
          songPreview: data.songPreview,
          albumImg: data.albumImg,
          artistName: data.artistName
        });
        console.log('Document updated for user:', data.userName);
      } else {
        const newDocRef = await addDoc(usersCollection, data);
        console.log('New document created with id:', newDocRef.id);
      }
    } catch (error) {
      console.error('Error updating or adding data in Firebase:', error);
    }
  };
  

    //get data from firebase
    export const fetchUsersFromFirebase = async () => {
        try {
          const userRef = collection(db, 'users');
          const userQuerySnapshot = await getDocs(userRef);
    
          const userDataArray = [];
          userQuerySnapshot.forEach((doc) => {
            userDataArray.push(doc.data());
          });
    
          return userDataArray;
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
