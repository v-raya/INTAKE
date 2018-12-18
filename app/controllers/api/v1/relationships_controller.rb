# frozen_string_literal: true

# Relationships controller handles all service requests for
# retrieving relationships between people on a screening
module Api
  module V1
    class RelationshipsController < ApiController # :nodoc:
      def create
        created_relationships = RelationshipsRepository.create(
          session[:token],
          request.uuid,
          relationships_params
        )
        render json: created_relationships
      end

      def index
        render json: screening_id_given? ? relationships_by_screening_id : relationships_by_search
      end

      def show
        relationship = RelationshipsRepository.find(
          session[:token],
          request.uuid,
          params[:id]
        )
        render json: relationship
      end

      def update
        update_relationship = RelationshipsRepository.update(
          session[:token],
          request.uuid,
          params[:id],
          relationship_params
        )
        render json: update_relationship
      end

      private

      def relationships_by_screening_id
        RelationshipsRepository.get_relationships_for_screening_id(
          session[:token],
          request.uuid,
          params[:screeningId]
        )
      end

      def relationships_by_search
        RelationshipsRepository.search(
          session[:token],
          request.uuid,
          client_ids
        )
      end

      def relationship_params
        params.require(:relationship).as_json.symbolize_keys
      end

      def relationships_params
        params.require(:relationships).as_json
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
