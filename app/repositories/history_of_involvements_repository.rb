# frozen_string_literal: true

# HistoryOfInvolvementsRepository is a service class responsible for retrieval
# of HOI information from upstream APIs like Ferb
class HistoryOfInvolvementsRepository
  def self.search(token, request_id, client_ids)
    return { cases: [], referrals: [], screenings: [] } if client_ids.blank?

    FerbAPI.make_api_call(
      token: token,
      request_id: request_id,
      url: FerbRoutes.history_of_involvements_path,
      method: :get,
      payload: { clientIds: client_ids }
    ).body
  end
end
