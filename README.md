# ChatApp - ReactFire

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Issues](https://img.shields.io/github/issues/ykdevelops/chatapp-reactfire)](https://github.com/ykdevelops/chatapp-reactfire/issues)
[![PRs](https://img.shields.io/github/issues-pr/ykdevelops/chatapp-reactfire)](https://github.com/ykdevelops/chatapp-reactfire/pulls)

## Overview

ChatApp-ReactFire is a simple, yet sophisticated, real-time chat application developed with React.js and Firebase. This application serves as a fantastic starter for anyone seeking to understand and implement real-time functionality using Firebase in a React application.

## Features

- User Authentication
- Real-time messaging
- Create new chat rooms
- Join existing chat rooms

## Installation and Setup

Clone the repository:

```bash
git clone https://github.com/ykdevelops/chatapp-reactfire.git
```

Navigate into the directory:

```bash
cd chatapp-reactfire
```

Install the dependencies:

```bash
npm install
```

## Firebase Setup

This project uses Firebase for real-time database and user authentication.

1. Set up a new project on [Firebase](https://firebase.google.com/).
2. Enable Email/Password sign-in under Authentication > Sign-in method.
3. Create a new Firestore database under Firestore > Create database.
4. Grab your project configuration under Project settings. It should look something like this:

```javascript
const firebaseConfig = {
  apiKey: "YOUR-API-KEY",
  authDomain: "YOUR-AUTH-DOMAIN",
  projectId: "YOUR-PROJECT-ID",
  storageBucket: "YOUR-STORAGE-BUCKET",
  messagingSenderId: "YOUR-MESSAGING-SENDER-ID",
  appId: "YOUR-APP-ID",
};
```

5. Create a `.env` file in the root of the project and fill it with your Firebase configuration values.

```bash
REACT_APP_FIREBASE_API_KEY="YOUR-API-KEY"
REACT_APP_FIREBASE_AUTH_DOMAIN="YOUR-AUTH-DOMAIN"
REACT_APP_FIREBASE_PROJECT_ID="YOUR-PROJECT-ID"
REACT_APP_FIREBASE_STORAGE_BUCKET="YOUR-STORAGE-BUCKET"
REACT_APP_FIREBASE_MESSAGING_SENDER_ID="YOUR-MESSAGING-SENDER-ID"
REACT_APP_FIREBASE_APP_ID="YOUR-APP-ID"
```

## Run the Application

After setting up Firebase, you can now run the application:

```bash
npm start
```

The application will start on [http://localhost:3000](http://localhost:3000).

## Contribution

This project is open to any kind of contribution! To get started:

1. Fork the project
2. Create a new branch (`git checkout -b new-feature`)
3. Commit your changes (`git commit -m 'Add a new feature'`)
4. Push to the branch (`git push origin new-feature`)
5. Open a pull request

## License

This project is open source and available under the [MIT License](https://opensource.org/licenses/MIT).

## Support

For any questions or support, please open an issue or pull request, or alternatively, get in touch with the maintainers.

## Acknowledgements

- [React.js](https://reactjs.org/)
- [Firebase](https://firebase.google.com/)
