# frozen_string_literal: true

# Relationships controller handles all service requests for
# retrieving relationships between people on a screening
module Api
  module V1
    class RelationshipsController < ApiController # :nodoc:
      def index
        client_ids = params[:clientIds]&.split ','
        relationships = RelationshipsRepository.search(session[:security_token], client_ids)
        render json: relationships
      end

      def show
        relationship = RelationshipsRepository.find(session[:security_token], params[:id])
        render json: relationship
      end

      def update
        relationship = params.require(:relationship).as_json.symbolize_keys
        update_relationship = RelationshipsRepository.update(
          session[:security_token],
          params[:id],
          relationship
        )
        render json: update_relationship
      end
    end
  end
end
