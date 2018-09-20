# frozen_string_literal: true

# ParticipantRepository is a service class responsible for creation of a participant
# resource via the API
class ParticipantRepository
  class AuthorizationError < StandardError; end

  def self.create(security_token, participant)
    screening_id = participant[:screening_id]

    response = FerbAPI.make_api_call(
      security_token,
      FerbRoutes.screening_participant_path(screening_id),
      :post,
      participant
    )
    response.body.as_json
  end

  def self.delete(security_token, screening_id, id)
    FerbAPI.make_api_call(
      security_token,
      FerbRoutes.delete_screening_participant_path(screening_id, id),
      :delete
    )
  end

  def self.update(security_token, participant)
    raise 'Error updating participant: id is required' unless participant[:id]

    response = FerbAPI.make_api_call(
      security_token,
      FerbRoutes.screening_participant_path(participant[:screening_id], participant[:id]),
      :put,
      participant.as_json
    )
    response.body.as_json
  end

  def self.participant_json_without_root_id(participant)
    participant.as_json.except('id')
  end

  def self.authorize(security_token, id)
    return if id.blank?

    route = FerbRoutes.client_authorization_path(id)

    begin
      FerbAPI.make_api_call(security_token, route, :get)
    rescue ApiError => e
      raise AuthorizationError if e.api_error[:http_code] == 403

      raise e
    end
  end

  private_class_method def self.post_data(participant)
    {
      screening_id: participant.screening_id.to_s,
      legacy_descriptor: {
        legacy_id: participant.legacy_descriptor&.legacy_id,
        legacy_table_name: participant.legacy_descriptor&.legacy_table_name
      }
    }
  end
end
