![BitRewards App Icon](./android/app/src/main/res/mipmap-xhdpi/ic_launcher.png)

# BitRewards 💰

> React Native 0.56.4 app. Supported operating systems are >= **Android 4.1 (API 16)** and >= **iOS 9.0**.

## Get Started 🚀

- `npm install`
- Create file `/android/local.properties` with path to SDK dir. For example: `sdk.dir=/Users/{username}/Library/Android/sdk`

### Generating the release APK

- `mkdir -p android/app/src/main/assets`
- `react-native bundle --platform android --dev false --entry-file index.android.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/`
- `cd android && ./gradlew assembleRelease`
