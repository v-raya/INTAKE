# frozen_string_literal: true

# RelationshipsRepository is a service class responsible for retrieval of
# relationships via the API
class RelationshipsRepository
  def self.create(security_token, request_id, relationships)
    return [] if relationships.blank?
    FerbAPI.make_api_call(
      security_token: security_token,
      request_id: request_id,
      url: FerbRoutes.screening_relationships,
      method: :post,
      payload: relationships
    ).body
  end

  def self.search(security_token, request_id, client_ids)
    return [] if client_ids.blank?
    FerbAPI.make_api_call(
      security_token: security_token,
      request_id: request_id,
      url: FerbRoutes.relationships_path,
      method: :get,
      payload: {
        clientIds: client_ids
      }
    ).body
  end

  def self.get_relationships_for_screening_id(security_token, request_id, screening_id)
    return [] if screening_id.blank?
    FerbAPI.make_api_call(
      security_token: security_token,
      request_id: request_id,
      url: FerbRoutes.relationships_for_screening_path(screening_id),
      method: :get
    ).body
  end

  def self.find(security_token, request_id, id)
    raise StandardError, 'Error updating relationship: id is required' if id.blank?
    FerbAPI.make_api_call(
      security_token: security_token,
      request_id: request_id,
      url: FerbRoutes.screening_relationship_path(id),
      method: :get
    ).body
  end

  def self.update(security_token, request_id, id, relationship)
    raise StandardError, 'Error updating relationship: id is required' if id.blank?
    FerbAPI.make_api_call(
      security_token: security_token,
      request_id: request_id,
      url: FerbRoutes.screening_relationship_path(id),
      method: :put,
      payload: relationship
    ).body
  end
end
