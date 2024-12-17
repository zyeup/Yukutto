class Marker < ApplicationRecord
  belongs_to :post
  mount_uploader :image, ImageUploader

  def image_url
    "#{Rails.application.routes.default_url_options[:host]}#{image.url}"
  end
end
