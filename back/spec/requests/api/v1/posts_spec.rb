require 'rails_helper'

RSpec.describe "Api::V1::Posts", type: :request do

  before do
    host! "api.yukutto.com"  # Hostヘッダーを上書き
  end

  # テスト用のユーザーとポスト
  let!(:user)  { FactoryBot.create(:user, name: "Test User") }
  let!(:posts) { FactoryBot.create_list(:post, 3, user: user) }
  let(:post_id) { posts.first.id }

  describe "GET /api/v1/posts" do
    before { get "/api/v1/posts" }

    it "returns all posts" do
      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json.size).to eq(3)
    end
  end

  describe "GET /api/v1/posts/:id" do
    context "when the post exists" do
      before { get "/api/v1/posts/#{post_id}" }

      it "returns the post" do
        expect(response).to have_http_status(:ok)
        json = JSON.parse(response.body)
        expect(json["id"]).to eq(post_id)
        expect(json["user"]["name"]).to eq("Test User")
      end
    end

    context "when the post does not exist" do
      it "returns 404 Not Found or raises ActiveRecord::RecordNotFound" do
        begin
          get "/api/v1/posts/999999"
          expect(response).to have_http_status(:not_found)
        rescue ActiveRecord::RecordNotFound
          expect(true).to be_truthy
        end
      end
    end

  end

  describe "POST /api/v1/posts" do
    let(:valid_attributes) { { post: { title: "New Title", content: "New content", user_id: user.id } } }

    context "when the request is valid" do
      before { post "/api/v1/posts", params: valid_attributes }

      it "creates a new post" do
        expect(response).to have_http_status(:created)
        json = JSON.parse(response.body)
        expect(json["title"]).to eq("New Title")
      end
    end

    context "when the request is invalid" do
      before { post "/api/v1/posts", params: { post: { title: "", content: "", user_id: nil } } }

      it "returns unprocessable entity" do
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe "PUT /api/v1/posts/:id" do
    let(:update_attributes) { { post: { title: "Updated Title" } } }
    before { put "/api/v1/posts/#{post_id}", params: update_attributes }

    it "updates the post" do
      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json["title"]).to eq("Updated Title")
    end
  end

  describe "DELETE /api/v1/posts/:id" do
    before { delete "/api/v1/posts/#{post_id}" }

    it "deletes the post" do
      expect(response).to have_http_status(:no_content)
      expect(Post.find_by(id: post_id)).to be_nil
    end
  end
end
