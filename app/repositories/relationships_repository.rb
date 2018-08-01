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

  def self.get_relationships_for_screening_id(security_token, screeing_id)
    return [] if screeing_id.blank?
    FerbAPI.make_api_call(
      security_token,
      FerbRoutes.relationships_for_screening_path(screeing_id),
      :get
    ).body
  end
end
