# frozen_string_literal: true

# Relationships controller handles all service requests for
# retrieving relationships between people on a screening
module Api
  module V1
    class RelationshipsController < ApiController # :nodoc:
      def by_screening_id
        screening_id = params[:id]
        relationships_for_screening = RelationshipsRepository
                                      .find_by_screening_id(session[:security_token], screening_id)
        render json: relationships_for_screening
      end

      def index
        client_ids = params[:clientIds]&.split ','
        relationships = RelationshipsRepository.search(session[:security_token], client_ids)
        render json: relationships
      end
    end
  end
end
