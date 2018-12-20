# frozen_string_literal: true

# Staff Repository is a service class responsible for retrieving information about staff
# resource via the API
class StaffRepository
  def self.find(token, request_id, id)
    response = FerbAPI.make_api_call(
      token: token,
      request_id: request_id,
      url: FerbRoutes.staff_path(id),
      method: :get
    )
    Staff.new(response.body)
  end
end
