# frozen_string_literal: true

# Relationships controller handles all service requests for
# retrieving relationships between people on a screening
module Api
  module V1
    class RelationshipsController < ApiController # :nodoc:
      def index
        if params[:screeningId].present? && params[:screeningId] != 'null'
          relationships = RelationshipsRepository.get_relationships_for_screening_id(session[:security_token], params[:screeningId])
        else
          client_ids = params[:clientIds]&.split ','
          relationships = RelationshipsRepository.search(session[:security_token], client_ids)
        end
        render json: relationships
      end
    end
  end
end