class Post < ApplicationRecord
  belongs_to :user
  has_many :markers, dependent: :destroy
  has_many :post_bookmarks, dependent: :destroy
  has_many :bookmarked_users, through: :post_bookmarks, source: :user
end
