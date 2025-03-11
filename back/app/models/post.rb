class Post < ApplicationRecord
  belongs_to :user
  has_many :markers, dependent: :destroy
  has_many :post_bookmarks, dependent: :destroy
  has_many :bookmarked_users, through: :post_bookmarks, source: :user

  validates :title, length: { maximum: 30 }
  validates :content, length: { maximum: 400 }
end
