# frozen_string_literal: true

# Participants Controller handles all service request for
# the creation and modification of screening participant objects.
module Api
  module V1
    class ParticipantsController < ApiController # :nodoc:
      respond_to :json

      def create
        created_participant = ParticipantRepository.create(
          session[:token],
          request.uuid,
          participant_params
        )
        render json: created_participant
      rescue ParticipantRepository::AuthorizationError
        render json: { status: 403 }, status: 403
      end

      def update
        updated_participant = ParticipantRepository.update(
          session[:token],
          request.uuid,
          participant_params
        )
        render json: updated_participant
      end

      def destroy
        ParticipantRepository.delete(
          session[:token],
          request.uuid,
          params[:screening_id],
          params[:id]
        )
      end

      def participant_params
        params.require(:participant).as_json.deep_symbolize_keys
      end
    end
  end
end
