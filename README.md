# Firebase Tools Cross Service Rules

Demo repo created to reproduce bug described here: https://github.com/firebase/firebase-tools/issues/5251

But as it turns out, that bug is not reproducible in this fresh environment, so now we need to find out why firestore.get() in storage.rules works in this repo but not in examind-web.

## Steps to reproduce

1. Clone this repo
2. Run the following in 2 shells:

```bash
npm start
```

```bash
cd hosting && npm run dev
```

3. Open site in browser
4. Sign in with an arbitrary email
5. Open Emulator Suite: http://localhost:4000/
6. Upload a file named `file.txt` to `gs://demo-project.appspot.com/courses/course1/`
7. Return to browser and try to download file
8. Inspect dev tools console

## Note:

In commit 1, I initialized hosting only (`firebase init hosting`), as initializing any other service failed if I didn't set up a default Firebase project from the cloud.
