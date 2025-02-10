class Location < ApplicationRecord
  has_many :markers
  validates :country, :prefecture, :city, presence: true
end
