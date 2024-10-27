class Api::V1::MarkersController < ApplicationController
  def index
    @markers = Marker.all
    render json: @markers
  end

  def show
    @markers = Marker.find(params[:id])
    render json: @markers
  end

  def create
    @markers = Marker.new(marker_params)

    if @markers.save
      render json: @markers, status: :created
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
    params.require(:marker).permit(:title, :lat, :lng)
  end

end
