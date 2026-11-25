# 減量プラン手帳（個人用・Firebase版）

体重・水分・毎日のチェック・PFCの目安・筋トレメニューを記録するWebアプリです。

- **置き場所**：GitHub Pages（無料）
- **ログイン**：Googleアカウント
- **データベース**：Firebase の Cloud Firestore（無料プランの範囲）
- 記録は**アカウントごとに完全に分かれ、本人しか読み書きできません**。あなたと彼女はそれぞれ自分のGoogleアカウントでログインします。
- 登録した2つのメールアドレス以外のGoogleアカウントは、ログインしても使えません。
- 電波がないときも記録でき、つながったときに自動で送信されます。
- 機種変更・プライベートモード・PCとスマホの使い分けでも、ログインすれば同じ記録が出てきます。

## 入っているファイル

| ファイル | 役割 | どこに置く |
|---|---|---|
| `index.html` | アプリ本体 | GitHub |
| `firebase-config.js` | Firebaseの接続設定（手順1で書き換える） | GitHub |
| `manifest.webmanifest` | スマホに「インストール」するための情報 | GitHub |
| `sw.js` | オフラインでも開けるようにする仕組み | GitHub |
| `icons/`（4ファイル） | アプリのアイコン | GitHub |
| `firestore.rules` | データベースのアクセスルール（手順1で貼る） | Firebaseの画面 |
| `README.md` | この説明書 | どちらでも |

作業の順番は **手順1（Firebase）→ 手順2（GitHub）→ 手順3（Firebaseに戻ってURLを許可）→ 手順4（インストール）** です。全部で20〜30分くらいです。

---

## 手順1. Firebaseを準備する（個人のGoogleアカウントで）

### 1-1. プロジェクトを作る
1. https://console.firebase.google.com を開き、**個人の**Googleアカウントでログインします。
2. 「Firebase プロジェクトを作成」（または「プロジェクトを追加」）を押します。
3. 名前を入れます（例：`diet-app`）。Googleアナリティクスは**オフ**で大丈夫です。
4. 「プロジェクトを作成」を押して、できあがるまで待ちます。

### 1-2. Googleログインをオンにする
1. 左メニューの「構築」→「Authentication」→「始める」を押します。
2. 「ログイン方法」タブで「Google」を選び、「有効にする」をオンにします。
3. 「プロジェクトのサポートメール」に自分のアドレスを選んで「保存」します。

### 1-3. Webアプリを登録して、設定値をコピーする
1. 左上の歯車 →「プロジェクトの設定」を開きます。
2. 下の方の「マイアプリ」で `</>`（ウェブ）のアイコンを押します。
3. ニックネームを入れて（例：`diet-web`）「アプリを登録」を押します。Firebase Hosting のチェックは**不要**です。
4. 画面に次のようなコードが出ます。`{ }` の中（apiKey〜appId の6行）をコピーします。

   ```js
   const firebaseConfig = {
     apiKey: "AIza....",
     authDomain: "diet-app-xxxx.firebaseapp.com",
     projectId: "diet-app-xxxx",
     storageBucket: "diet-app-xxxx.firebasestorage.app",
     messagingSenderId: "1234567890",
     appId: "1:1234567890:web:abcdef..."
   };
   ```

5. 同梱の `firebase-config.js` をメモ帳などで開きます。`firebase: { ... }` の中の6行を、コピーした6行に置き換えます。
6. 同じファイルの `allowedEmails` の2つを、**あなたと彼女のGmailアドレス**に書き換えて保存します。

   ```js
   allowedEmails: [
     "あなた@gmail.com",
     "彼女@gmail.com"
   ]
   ```

> この設定値は、ブラウザから見える前提のもので、公開されても問題ありません。データは次の 1-4 のルールで守られます。

### 1-4. データベース（Cloud Firestore）を作る
1. 左メニューの「構築」→「Firestore Database」→「データベースを作成」を押します。
2. ロケーションは **asia-northeast1（東京）** を選びます（あとから変更できません）。
3. 「本番環境モードで開始」を選んで「作成」を押します。
4. できあがったら「ルール」タブを開きます。
5. 書かれている内容を全部消し、同梱の `firestore.rules` の中身を貼り付けます。
6. 貼り付けたルールの中の `'you@example.com', 'partner@example.com'` を、**あなたと彼女のGmailアドレス**に書き換えます（1-3 の6と同じアドレス）。
7. 「公開」を押します。

---

## 手順2. GitHub Pagesで公開する

1. 個人のGitHubアカウントにログインし、右上の「＋」→「New repository」を選びます。
2. 名前を入れ（例：`diet-app`）、**Public** を選んで「Create repository」を押します。
   - 無料プランでGitHub Pagesを使えるのはPublicのリポジトリだけです。コードは誰でも見られますが、記録はFirebaseにあり、ルールで守られているので見られません。
3. 「uploading an existing file」（または「Add file → Upload files」）を押します。
4. `index.html`・`firebase-config.js`（手順1で書き換えたもの）・`manifest.webmanifest`・`sw.js`・`icons`フォルダを、**フォルダごと**ドラッグ＆ドロップします。
5. 「Commit changes」を押します。
6. 「Settings」→ 左メニューの「Pages」を開きます。
7. 「Branch」で `main`、フォルダは `/ (root)` を選んで「Save」を押します。
8. 1〜2分待つと `https://ユーザー名.github.io/diet-app/` のようなURLが出ます。これがアプリのURLです。

## 手順3. FirebaseでGitHub PagesのURLを許可する

これをしないとログインできません。

1. Firebaseの「Authentication」→「設定」タブ →「承認済みドメイン」を開きます。
2. 「ドメインの追加」で `ユーザー名.github.io` を追加します（`https://` や `/diet-app/` は付けません）。

## 手順4. スマホとPCで使う

1. PixelのChromeでアプリのURLを開き、「Googleでログイン」を押します。
2. 右上の「⋮」→「アプリをインストール」（表示されない場合は「ホーム画面に追加」）を選びます。
3. 最初に「はじめに」のカード（または右上の歯車）から、開始日・開始体重・目標体重を設定します。
4. 彼女も自分のスマホで同じURLを開き、**彼女のGoogleアカウント**でログインします。記録は別々です。
5. PCでは、ChromeかEdgeでURLを開いてログインすれば、スマホと同じ記録が見られます。

---

## アプリを更新するとき

1. Claudeで修正した新しい `index.html` などを受け取ります。
2. GitHubのリポジトリで「Add file → Upload files」から同じ名前のファイルをアップロードし、「Commit changes」を押します（上書きされます）。
   - **`firebase-config.js` は、書き換えた自分の版をそのまま使い続けてください**（新しい版で上書きしないよう注意）。
3. 1〜2分後、アプリを閉じて開き直すと新しい版になります。変わらないときは、`sw.js` の `const CACHE = 'gp3-v1';` の数字を `v2` のように増やしてアップロードします。

## 使える人を変えるとき

`firebase-config.js` の `allowedEmails` と、Firebaseの「Firestore Database」→「ルール」の中のメールアドレスの**両方**を書き換えます（ルールは「公開」を押すまで反映されません）。

## バックアップ

記録はFirebaseに保存されていますが、念のため、ときどき歯車 →「バックアップを保存（ファイル）」でファイルに保存しておくと安心です。「バックアップから復元」で戻せます（ログインしているアカウントに復元されます）。

## 費用について

Firebaseの無料プラン（Spark）で使えます。クレジットカードの登録は不要です。Cloud Firestoreの無料枠は1日あたり書き込み2万回・読み込み5万回で、2人で毎日使っても数百回程度です。無料枠を超えた場合は、課金されるのではなくその日の操作が止まる仕組みです。

## 困ったとき

| 表示 | 対処 |
|---|---|
| Firebaseの設定がまだです | `firebase-config.js` を書き換えてアップロードしたか確認（手順1-3） |
| このサイトのURLがFirebaseで許可されていません | 手順3の承認済みドメインを確認 |
| このGoogleアカウントでは使えません | `firebase-config.js` とルールのメールアドレスを確認。ルールは「公開」を押したか確認 |
| ポップアップがブロックされました | ブラウザの設定でポップアップを許可する |
| 保存でエラーが起きました（permission-denied） | ルールのメールアドレスと「公開」を確認 |
| 更新が反映されない | アプリを閉じて開き直す。だめなら `sw.js` の CACHE の数字を増やしてアップロード |
