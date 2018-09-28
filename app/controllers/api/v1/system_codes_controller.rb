# frozen_string_literal: true

# System codes Controller handles loading legacy system codes
# from the lov service
module Api
  module V1
    class SystemCodesController < ApiController # :nodoc:
      respond_to :json

      def index
        response = FerbAPI.make_api_call(
          security_token: session['security_token'],
          request_id: request.uuid,
          url: FerbRoutes.lov_path,
          method: :get
        )
        render json: response.body, status: response.status
      end

      def cross_report_agency
        response = FerbAPI.make_api_call(
          security_token: session['security_token'],
          request_id: request.uuid,
          url: "#{FerbRoutes.cross_report_agency}?countyId=#{params[:county_id]}",
          method: :get
        )
        render json: response.body, status: response.status
      end
    end
  end
end
