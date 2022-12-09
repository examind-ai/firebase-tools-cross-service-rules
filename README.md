# Firebase Tools Cross Service Rules

Demo repo created to reproduce bug described here: https://github.com/firebase/firebase-tools/issues/5251

But as it turns out, that bug is not reproducible in this fresh environment, so now we need to find out why firestore.get() in storage.rules works in this repo but not in examind-web.

## Setup

1. Clone this repo
2. Install firebase-tools globally: `npm i -g firebase-tools@11.16.1`
3. Install dependencies: `cd hosting && npm ci`

## Run

1. Run the following in 2 shells:

```bash
npm start
```

```bash
cd hosting && npm run dev
```

2. Open site in browser
3. Sign in with an arbitrary email
4. Open Emulator Suite: http://localhost:4000/
5. Upload a file named `file.txt` to `gs://demo-project.appspot.com/courses/course1/`
6. Return to browser and try to download file
7. Inspect dev tools console

## Note:

In commit 1, I initialized hosting only (`firebase init hosting`), as initializing any other service failed if I didn't set up a default Firebase project from the cloud.
