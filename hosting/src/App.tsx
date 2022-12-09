import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  User,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { useEffect, useState } from 'react';
import './App.css';
import { auth, db, storage } from './firebase';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [objectName, setObjectName] = useState<string>();

  useEffect(
    () =>
      onAuthStateChanged(auth, user => {
        setUser(user);
        if (user)
          setDoc(doc(db, 'courses/course1'), {
            users: { [user.uid]: { exists: true } },
            deletedAt: null,
          });
      }),
    [setUser],
  );

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const handleDownload = async () => {
    const fileRef = ref(storage, objectName);
    const url = await getDownloadURL(fileRef);
    const response = await fetch(url);
    console.log('response', response);
  };

  const handleUpload = (e: any) => {
    const file = e.target.files[0];
    const objectName = `courses/course1/${file.name}`;
    const storageRef = ref(storage, objectName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      _snapshot => {},
      error => {
        alert(error.message);
      },
      () => {
        setObjectName(objectName);
      },
    );
  };

  return (
    <div className="App">
      {user ? (
        <div>
          <div>Welcome {user.email}</div>
          <div style={{ marginTop: '24px' }}>
            <p>
              To reproduce bug, upload a file then try to download it
              again.
            </p>
            {objectName ? (
              <div>
                <button type="button" onClick={handleDownload}>
                  Download
                </button>
              </div>
            ) : (
              <div>
                <input type="file" onChange={handleUpload} />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <p>First sign in with any account:</p>
          <button type="button" onClick={handleSignIn}>
            Sign in
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
