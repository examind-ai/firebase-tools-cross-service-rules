import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  User,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';
import './App.css';
import { auth, db, storage } from './firebase';

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(
    () =>
      onAuthStateChanged(auth, user => {
        setUser(user);
        if (user)
          setDoc(doc(db, 'courses/course1'), {
            users: { [user.uid]: { exists: true } },
          });
      }),
    [setUser],
  );

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const handleDownload = async () => {
    const fileRef = ref(storage, 'courses/course1/file.txt');
    const url = await getDownloadURL(fileRef);
    const response = await fetch(url);
    console.log('response', response);
  };

  return (
    <div className="App">
      {user ? (
        <div>
          <div>Welcome {user.email}</div>
          <div>UID: {user.uid}</div>
          <div>
            <button type="button" onClick={handleDownload}>
              Download
            </button>
          </div>
        </div>
      ) : (
        <div>
          <button type="button" onClick={handleSignIn}>
            Sign in
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
