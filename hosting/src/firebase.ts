import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { connectStorageEmulator, getStorage } from 'firebase/storage';
import {
  connectFirestoreEmulator,
  getFirestore,
} from 'firebase/firestore';

const app = initializeApp({
  projectId: 'demo-project',
  apiKey: 'test', // Need an arbitrary value to keep our SDK happy: https://stackoverflow.com/a/72839398/188740
  appId: 'test',
  authDomain: 'demo-project.firebaseapp.com',
  storageBucket: 'demo-project.appspot.com',
});

const auth = getAuth(app);
connectAuthEmulator(auth, 'http://localhost:9099');

const db = getFirestore(app);
connectFirestoreEmulator(db, 'localhost', 8080);

const storage = getStorage(app);
connectStorageEmulator(storage, 'localhost', 9199);

export { auth, db, storage };
