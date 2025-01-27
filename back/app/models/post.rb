class Post < ApplicationRecord
  belongs_to :user
  has_many :markers, dependent: :destroy
end
