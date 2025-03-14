FactoryBot.define do
  factory :marker do
    title { "Test Title" }
    content { "Test content" }
    lat { 100 }
    lng { 100 }
    full_address { "Test address" }
    association :post
    association :location
  end
end
