# frozen_string_literal: true

# ScreeningRepository is a service class responsible for creation of a screening
# resource via the API
class ScreeningRepository
  def self.create(token, request_id, screening)
    response = FerbAPI.make_api_call(
      token: token,
      request_id: request_id,
      url: FerbRoutes.intake_screenings_path,
      method: :post,
      payload: screening.as_json(except: 'id')
    )
    response.body.to_json
  end

  def self.find(token, request_id, id)
    response = FerbAPI.make_api_call(
      token: token,
      request_id: request_id,
      url: FerbRoutes.intake_screening_path(id),
      method: :get
    )
    response.body.as_json
  end

  def self.update(token, request_id, screening)
    raise 'Error updating screening: id is required' unless screening[:id]
    response = FerbAPI.make_api_call(
      token: token,
      request_id: request_id,
      url: FerbRoutes.intake_screening_path(screening[:id]),
      method: :put,
      payload: screening
    )
    response.body.as_json
  end

  def self.search(token, request_id)
    response = FerbAPI.make_api_call(
      token: token,
      request_id: request_id,
      url: FerbRoutes.screenings_path,
      method: :get
    )
    response.body.to_json
  end

  def self.history_of_involvements(token, request_id, id)
    api = FerbAPI
    path = FerbRoutes.screening_history_of_involvements_path(id)
    response = api.make_api_call(
      token: token,
      request_id: request_id,
      url: path,
      method: :get
    )
    response.body
  end

  def self.submit(token, request_id, id)
    response = FerbAPI.make_api_call(
      token: token,
      request_id: request_id,
      url: FerbRoutes.screening_submit_path(id),
      method: :post,
      payload: {}
    )
    response.body.as_json
  end

  def self.contact(token, request_id, id, contact)
    response = FerbAPI.make_api_call(
      token: token,
      request_id: request_id,
      url: FerbRoutes.contacts_path(id),
      method: :post,
      payload: contact
    )
    response.body.as_json
  end
end
