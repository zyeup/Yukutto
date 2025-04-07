require 'rails_helper'

RSpec.describe Post, type: :model do
  describe 'バリデーションのテスト' do
    let(:user) { create(:user) }

    it '有効なPostは保存できる' do
      post = Post.new(user: user, title: 'タイトル', content: '内容です')
      expect(post).to be_valid
    end

    it 'タイトルが31文字以上だと無効' do
      post = Post.new(user: user, title: 'a' * 31, content: '内容です')
      expect(post).to be_invalid
    end

    it '内容が401文字以上だと無効' do
      post = Post.new(user: user, title: 'タイトル', content: 'a' * 401)
      expect(post).to be_invalid
    end
  end
end
