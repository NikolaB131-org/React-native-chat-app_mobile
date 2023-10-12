# React native chat app mobile

## [Link to backend repo](https://github.com/NikolaB131-org/React-native-chat-app_backend)

## Made with

- Typescript
- React Native
- React Navigation
- React Native config
- React Native keychain
- React Native svg
- Redux
- Redux Toolkit
- Jest
- React Testing Library

## Features

- Messages are sent via websockets
- Only Android app is available, because i don't have mac :(

## How to run

1. Make sure you have done setup steps from [react native docs](https://reactnative.dev/docs/environment-setup)

2. Install dependencies
```bash
npm i
```

3. Run in development mode
```bash
npm start

or

npm run android:dev
```

4. Run in production mode
```bash
npm run android:prod
```

5. After running app if you are also using [local backend server](https://github.com/NikolaB131-org/React-native-chat-app_backend), you need to run `adb reverse tcp:3001 tcp:3001` so that it can connect to the server on your computer. Or if you using wi-fi, follow official [guide](https://reactnative.dev/docs/running-on-device#method-2-connect-via-wi-fi-1)

## Project building

apk file of android builds will be in `android/app/build/outputs/apk`

1. Build in debug mode
```bash
npm run build:android:debug
```

2. Build in release mode
```bash
npm run build:android:release
```

## Other commands

Run tests
```bash
npm test
```

Run linters
```bash
npm run lint
```
## TODO

- Add IOS support
