class Marker < ApplicationRecord
  belongs_to :post
  belongs_to :location
  accepts_nested_attributes_for :location
  mount_uploader :image, ImageUploader

  validate :validate_image_size

  def image_url
    host = Rails.application.routes.default_url_options[:host] || 'http://localhost:3000'
    "#{host}#{image.url}"
  end

  private

  def validate_image_size
    if image.file.present? && image.file.size > 5.megabytes
      errors.add(:image, "のサイズは5MB以下である必要があります")
    end
  end
end
