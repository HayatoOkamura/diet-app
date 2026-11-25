// ===== Firebaseの設定 =====
// README の「手順1-3」で表示された firebaseConfig の中身を、下の { } の中にそのまま貼り付けてください。
// （この値は公開されても問題ない種類のものです。データは firestore.rules で守られます）
export default {
  firebase: {
    apiKey: "AIzaSyAkVBfmzDUfbvgCTZd-EyccGAcWvdRRbf8",
    authDomain: "diet-app-firebase-62c2a.firebaseapp.com",
    projectId: "diet-app-firebase-62c2a",
    storageBucket: "diet-app-firebase-62c2a.firebasestorage.app",
    messagingSenderId: "795315867680",
    appId: "1:795315867680:web:24220ac2721fb5d630ec45",
    measurementId: "G-1GV7BXRXLE",
  },

  // このアプリを使えるGoogleアカウントのメールアドレス（firestore.rules にも同じものを書く）
  allowedEmails: ["keepsmile.lucky7@gmail.com", "partner@example.com"],
};
