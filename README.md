# Yukutto ([https://web.yukutto.com/])

## 概要
お気に入りの場所を記録・共有できるアプリを開発しました。  
地図上にピンを立てて、その場所に関する自分のコメントを記録するアプリです。  
個人の体験を大切にし、口コミ評価ではなく「本当におすすめしたい場所」を記録・発信できることを重視しています。

## 利用方法
1.「新しく投稿を作成」をクリックし、投稿のタイトルを決める  
2.表示されている地図をクリックすると、クリックした場所にピンが表示される  
3.タイトルを入力して保存を押すと、マーカーを保存することができる

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














