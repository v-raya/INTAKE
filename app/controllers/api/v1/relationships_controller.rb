# frozen_string_literal: true

# Relationships controller handles all service requests for
# retrieving relationships between people on a screening
module Api
  module V1
    class RelationshipsController < ApiController # :nodoc:
      def index
        if params[:screening_id].present?
          relationships = RelationshipsRepository.get_relationships_for_screening_id(session[:security_token], params[:screening_id])
        else
          client_ids = params[:clientIds]&.split ','
          relationships = RelationshipsRepository.search(session[:security_token], client_ids)
        end
        render json: relationships
      end
    end
  end
end
