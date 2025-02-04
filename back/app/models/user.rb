# frozen_string_literal: true

class User < ActiveRecord::Base
  has_many :posts, dependent: :destroy
  has_many :post_bookmarks, dependent: :destroy
  has_many :bookmarked_posts, through: :post_bookmarks, source: :post
  has_many :bookmarks
  has_many :posts, through: :bookmarks

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User
end
