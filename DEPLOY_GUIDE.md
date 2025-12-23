# GitHub Pages へのデプロイ手順

このサイトを GitHub Pages を使ってインターネット上に公開する手順です。

## 準備するもの
- GitHub アカウント
- 公開したい音楽ファイルが `assets/music/` フォルダに入っていること（現在入れてある `track1.MP3` など）

---

## 方法 A：ブラウザを使ってアップロードする場合（かんたん！）

黒い画面（コマンドライン）を使わずに、ブラウザだけで行う方法です。

1. **GitHubでリポジトリを作る**
   - [GitHub](https://github.com/) にログインし、右上の「+」から「New repository」を選びます。
   - **Repository name** に好きな名前（例: `cnp-music-site`）を入力します。
   - **Public**（公開）を選びます。
   - 「Create repository」ボタンを押します。

2. **ファイルをアップロードする**
   - 作成されたリポジトリの画面で、「uploading an existing file」というリンクをクリックします。
   - お使いのパソコンのフォルダ（`music_download_site`）を開き、中のファイル・フォルダを**すべて**ブラウザの枠内にドラッグ＆ドロップします。
     - `index.html`, `style.css`, `script.js`
     - `assets` フォルダ（中の画像や音楽ごと）
   - ファイルがリストアップされたら、下の「Commit changes」ボタンを押します。

3. **公開設定をする（GitHub Pages）**
   - リポジトリの上のメニューから「**Settings**」をクリックします。
   - 左のメニューから「**Pages**」を選びます。
   - **Branch** のところにある「None」を「**main**」に切り替え、「Save」を押します。
   - しばらく待つ（1〜2分）と、ページの上の方に「Your site is live at...」とURLが表示されます。
   - そのURLをクリックすれば、あなたのサイトが公開されています！

---

## 方法 B：コマンドラインを使う場合（慣れている人向け）

もし Git コマンドが使える場合は、以下の手順でも可能です。

```bash
# 1. ユーザー名とメールアドレスの設定（もし一度もしたことがなければ）
git config --global user.name "あなたのGitHubユーザー名"
git config --global user.email "あなたのメールアドレス"

# 2. 初期化とコミット
git init
git add .
git commit -m "Initial commit"

# 3. リモートリポジトリに追加してプッシュ
# (GitHubで空のリポジトリを作った後に表示されるURLを使ってください)
git branch -M main
git remote add origin https://github.com/あなたのユーザー名/リポジトリ名.git
git push -u origin main
```

その後、方法Aの「3. 公開設定をする」と同じ手順を行ってください。

## 注意点
- **音楽ファイル**: `assets/music/` フォルダの中身も確実にアップロードされているか確認してください。これがないと再生・ダウンロードができません。
- **著作権**: アップロードする音楽や画像の著作権には十分ご注意ください。
