# Yukutto ([https://web.yukutto.com/])

## 概要
お気に入りの場所を記録・共有できるアプリを開発しました。  
地図上にピンを立てて、その場所に関する自分のコメントを記録するアプリです。  
個人の体験を大切にし、口コミ評価ではなく「本当におすすめしたい場所」を記録・発信できることを重視しています。

## 基本的な使い方
1.下記のゲスト用アカウントでログイン
2.「新しく投稿を作成」をクリックし、投稿のタイトルを決める  
3.表示されている地図をクリックすると、クリックした場所にピンが表示される  
4.タイトルを入力して保存を押すと、マーカーを保存することができる

・ゲスト用アカウント
名前　　　　　：Yukutto  
メールアドレス：test@test.com  
パスワード　　：password  

## インフラ構成図
![スクリーンショット 2025-03-11 0 36 38](https://github.com/user-attachments/assets/b75971e1-dbe3-4c87-af4b-d7d499c976e2)

## ER図
![スクリーンショット 2025-03-11 0 36 10](https://github.com/user-attachments/assets/41335cfd-1ea0-40cd-9fca-eadfd1abd270)

## 使用技術
### 言語、フレームワーク等
・Ruby 3.2.2  
・Ruby on Rails 7.0.8.4  
・React 18.3.1  
・TypeScript 5.6.2  

### インフラ
・AWS  (VPC、S3、Cloudfront、Application Load Balancer、ECS、RDS)  
・Docker  
・GithubActions  

### テスト
・RSpec
・Vitest

### 外部API
・Google Maps API  

### その他主要ライブラリ
・carrierwave
・devise_token_auth
・vite
・react-router-dom
・axios
・tailwindcss

## 機能一覧
・投稿機能
  ・マーカー投稿  
  ・ポスト投稿  
  ・画像投稿  
・ページネーション機能  
・ブックマーク機能  
・ログイン機能  
・フォロー機能  














