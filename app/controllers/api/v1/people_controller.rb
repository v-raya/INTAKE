# frozen_string_literal: true

# Participants Controller handles all service request for
# the creation and modification of screening participant objects.
module Api
  module V1
    class PeopleController < ApiController # :nodoc:
      def index
        response = Dora::PersonSearchRepository
                   .search(search_params,
                     request.uuid,
                     security_token: session[:security_token])
        render json: response
      end

      def show
        ParticipantRepository.authorize(session[:security_token], request_id, id)

        search_response = Dora::PersonSearchRepository.find(
          id,
          request_id,
          security_token: session[:security_token]
        )
        render json: search_response.to_json, status: 200
      rescue ParticipantRepository::AuthorizationError
        render json: { status: 403 }, status: 403
      end

      private

      def id
        params[:id]
      end

      def request_id
        request.uuid
      end

      def search_params
        params.permit(:search_term, :is_client_only, :search_after,
          search_address: %i[street city county])
      end
    end
  end
end
