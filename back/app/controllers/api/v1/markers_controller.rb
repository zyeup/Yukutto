class Api::V1::MarkersController < ApplicationController
  def index
    post_id = params[:post_id]
    @markers = Marker.where(post_id: post_id).order(:id)
    render json: @markers
  end

  def show
    @markers = Marker.find(params[:id])
    render json: @markers.as_json.merge(image_url: @markers.image.url)
  end

  def create
    @markers = Marker.new(marker_params)

    if @markers.save
      render json: @markers.as_json.merge(image_url: @markers.image.url), status: :created
    else
      render json: @markers.errors, status: :unprocessable_entity
    end
  end

  def update
    @markers = Marker.find(params[:id])
    if @markers.update(marker_params)
      render json: @markers
    else
      render json: @markers.errors, status: :unprocessable_entity
    end

  end

  def destroy
    @markers = Marker.find(params[:id])
    @markers.destroy
  end

  private

  def marker_params
    params.permit(:lat, :lng, :title, :content, :post_id, :image)
  end

end
