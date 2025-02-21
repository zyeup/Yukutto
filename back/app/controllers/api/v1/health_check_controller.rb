# app/controllers/api/v1/health_check_controller.rb
module Api
  module V1
    class HealthCheckController < ApplicationController
      def index
        head 200
      end
    end
  end
end
