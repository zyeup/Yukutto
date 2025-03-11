# Yukutto ([https://web.yukutto.com/])

## 概要
お気に入りの場所を記録・共有できるアプリを開発しました。  
地図上にピンを立てて、その場所に関する自分のコメントを記録するアプリです。  
個人の体験を大切にし、口コミ評価ではなく「本当におすすめしたい場所」を記録・発信できることを重視しています。
![スクリーンショット 2025-03-11 21 44 17](https://github.com/user-attachments/assets/6114defb-e1e6-44a8-b466-ad6c329408e6)

## 基本的な使い方
・ゲスト用アカウント  
名前　　　　　：Yukutto  
メールアドレス：test@test.com  
パスワード　　：password  
  
ホーム画面(投稿一覧)
![スクリーンショット 2025-03-11 21 44 33](https://github.com/user-attachments/assets/7dd57a02-5b13-4cc3-b053-6e80565aafcf)  

投稿の内容
![スクリーンショット 2025-03-11 21 46 36](https://github.com/user-attachments/assets/4a56b749-e06a-493b-ad77-6882bf4b23a2)  

ログイン後にできること  
・新規投稿  
・ユーザー自身の投稿一覧  
・ブックマークした投稿の一覧(星型のマーク)  
・ユーザー情報、フォロー機能  
・サインアウト
![スクリーンショット 2025-03-11 21 47 48](https://github.com/user-attachments/assets/b760f296-88b7-42ed-a056-db21622298a4)

ユーザー情報、フォロー機能  
![スクリーンショット 2025-03-11 22 17 04](https://github.com/user-attachments/assets/cc467d54-a3b9-49d8-a1f8-b4460a6866a7)



# インフラ構成図
![スクリーンショット 2025-03-11 0 36 38](https://github.com/user-attachments/assets/b75971e1-dbe3-4c87-af4b-d7d499c976e2)

# ER図
![スクリーンショット 2025-03-11 0 36 10](https://github.com/user-attachments/assets/41335cfd-1ea0-40cd-9fca-eadfd1abd270)

# 使用技術
## 言語、フレームワーク等
・Ruby 3.2.2  
・Ruby on Rails 7.0.8.4  
・React 18.3.1  
・TypeScript 5.6.2  

## インフラ
・AWS  (VPC、S3、Cloudfront、Application Load Balancer、ECS、RDS)  
・Docker  
・GithubActions  

## テスト
・RSpec
・Vitest

## 外部API
・Google Maps API  

## その他主要ライブラリ
・carrierwave
・devise_token_auth
・vite
・react-router-dom
・axios
・tailwindcss

# 機能一覧
・投稿機能
  ・マーカー投稿  
  ・ポスト投稿  
  ・画像投稿  
・ページネーション機能  
・ブックマーク機能  
・ログイン機能  
・フォロー機能  














