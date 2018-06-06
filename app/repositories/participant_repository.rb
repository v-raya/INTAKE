# frozen_string_literal: true

# ParticipantRepository is a service class responsible for creation of a participant
# resource via the API
class ParticipantRepository
  class AuthorizationError < StandardError; end

  def self.create(security_token, participant)
    id = participant.legacy_descriptor&.legacy_id

    authorize security_token, id

    response =
      if id.blank?
        create_with_ferb(security_token, participant)
      else
        create_with_intake(security_token, participant)
      end
    Participant.new(response.body)
  end

  def self.delete(security_token, id)
    IntakeAPI.make_api_call(
      security_token,
      ExternalRoutes.intake_api_participant_path(id),
      :delete
    )
  end

  def self.update(security_token, participant)
    raise 'Error updating participant: id is required' unless participant.id
    response = IntakeAPI.make_api_call(
      security_token,
      ExternalRoutes.intake_api_participant_path(participant.id),
      :put,
      participant_json_without_root_id(participant)
    )
    Participant.new(response.body)
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

  private_class_method def self.create_with_intake(security_token, participant)
    IntakeAPI.make_api_call(
      security_token,
      ExternalRoutes.intake_api_screening_people_path(participant.screening_id.to_s),
      :post,
      post_data(participant).as_json
    )
  end

  private_class_method def self.create_with_ferb(security_token, participant)
    FerbAPI.make_api_call(
      security_token,
      FerbRoutes.screening_participants_path(participant.screening_id.to_s),
      :post,
      participant.as_json
    )
  end
end
