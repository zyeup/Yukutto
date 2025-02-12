class Api::V1::MarkersController < ApplicationController
  before_action :set_marker, only: [:show, :update, :destroy]

  def index
    post_id = params[:post_id].to_i
    if post_id > 0
      @markers = Marker.where(post_id: post_id).order(:id)
    else
      @markers = Marker.order(:id) # post_idが0なら全件取得
    end
    render json: @markers.as_json(include: :location)
  end

  def show
    render json: @marker.as_json(include: :location).as_json.merge(image_url: @marker.image.url)
  end

  def create
    @marker = Marker.new(marker_params)

    if @marker.save
      render json: @marker.as_json(include: :location).merge(image_url: @marker.image.url), status: :created
    else
      render json: @marker.errors, status: :unprocessable_entity
    end
  end

  def update
    if @marker.update(marker_params)
      render json: @marker
    else
      render json: @marker.errors, status: :unprocessable_entity
    end

  end

  def destroy
    @marker.destroy
  end

  private

  def set_marker
    @marker = Marker.find(params[:id])
  end

  def marker_params
    params.require(:marker).permit(:lat, :lng, :title, :content, :full_address, :post_id, :image, location_attributes: [:country, :prefecture, :city])
  end

end
