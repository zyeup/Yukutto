class Post < ApplicationRecord
  has_many :markers, dependent: :destroy
end
