# frozen_string_literal: true

module Api
  module V1
    # HOI controller handles endpoints that fetch history of involvements
    class HistoryOfInvolvementsController < ApiController
      def by_client_ids
        client_ids = params[:clientIds]&.split ','
        hois = HistoryOfInvolvementsRepository.search(
          session[:security_token],
          request.uuid,
          client_ids
        )
        render json: hois
      end
    end
  end
end
