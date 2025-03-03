FROM node:22.x

# 作業ディレクトリの設定
RUN mkdir /myapp
WORKDIR /myapp

# package.json と package-lock.json をコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# アプリケーションのコードをコピー
COPY . .


CMD ["npm","run","dev"]
