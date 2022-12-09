# Firebase Tools Cross Service Rules

Demo repo created to reproduce bug described here: https://github.com/firebase/firebase-tools/issues/5251

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

2. Open site in browser: http://localhost:5173/
3. Sign in with any user account (create a new one if you need to)
4. Upload a file then try to download it again
5. Inspect error in dev tools console
6. Inspect shell running Firebase Emulator, notice this exception:

```
com.google.firebase.rules.runtime.common.EvaluationException: Error: [path redacted]/storage.rules line [5], column [31]. Service call error. Function: [firestore.get], Argument: [path_value {
  segments {
    simple: "databases"
  }
  segments {
    simple: "(default)"
  }
  segments {
    simple: "documents"
  }
  segments {
    simple: "courses"
  }
  segments {
    simple: "course1"
  }
}
].
```

## Note:

In commit 1, I initialized hosting only (`firebase init hosting`), as initializing any other service failed if I didn't set up a default Firebase project from the cloud.
