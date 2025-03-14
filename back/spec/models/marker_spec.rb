require 'rails_helper'

RSpec.describe Marker, type: :model do

  describe "validations" do
    subject { build(:marker) }

    it { should validate_length_of(:title).is_at_most(12) }
    it { should validate_length_of(:content).is_at_most(140) }
  end

  describe "validate image_size" do
    let(:marker) { build(:marker) }

    context "when image size is within the limit" do
      it "does not error to image" do
        # 5MB以内
        file_double = double("file", size: 4.megabytes)
        allow(marker.image).to receive(:file).and_return(file_double)

        marker.validate
        expect(marker.errors[:image]).to be_empty
      end
    end

    context "when image size exceeds 5MB" do
      it "add an error to image" do
        # 5MBを超える
        file_double = double("file", size: 6.megabytes)
        allow(marker.image).to receive(:file).and_return(file_double)

        marker.validate
        expect(marker.errors[:image]).to include("のサイズは5MB以下である必要があります")
      end
    end

    context "when image file is not present" do
      it "does not add an error" do
        allow(marker.image).to receive(:file).and_return(nil)

        marker.validate
        expect(marker.errors[:image]).to be_empty
      end
    end
  end
end
