# frozen_string_literal: true

# Relationships controller handles all service requests for
# retrieving relationships between people on a screening
module Api
  module V1
    class RelationshipsController < ApiController # :nodoc:
      def index
        relationships = if screening_id_given?
                          RelationshipsRepository.get_relationships_for_screening_id(
                            session[:security_token], params[:screeningId]

                          )
                        else
                          RelationshipsRepository.search(session[:security_token], client_ids)
                        end
        render json: relationships
      end

      def show
        relationship = RelationshipsRepository.find(session[:security_token], params[:id])
        render json: relationship
      end

      def update
        update_relationship = RelationshipsRepository.update(
          session[:security_token],
          params[:id],
          relationship_params
        )
        render json: update_relationship
      end

      private

      def relationship_params
        params.require(:relationship).as_json.symbolize_keys
      end

      def client_ids
        params[:clientIds].split ','
      end

      def screening_id_given?
        params[:screeningId].present? && params[:screeningId] != 'null'
      end
    end
  end
end
