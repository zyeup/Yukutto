FactoryBot.define do
  factory :post do
    title   { "Sample Title" }
    content { "Sample content" }
    association :user
  end
end
