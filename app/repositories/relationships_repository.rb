# frozen_string_literal: true

# RelationshipsRepository is a service class responsible for retrieval of
# relationships via the API
class RelationshipsRepository
  def self.search(security_token, client_ids)
    return [] if client_ids.blank?

    FerbAPI.make_api_call(
      security_token,
      FerbRoutes.relationships_path,
      :get,
      clientIds: client_ids
    ).body
  end

  def self.update(security_token, id, relationship)
    raise 'Error updating relationship: id is required' unless id
    FerbAPI.make_api_call(
      security_token,
      FerbRoutes.screening_relationship_path(id),
      :put,
      relationship
    ).body
  end
end
