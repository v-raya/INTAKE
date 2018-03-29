# frozen_string_literal: true

# HistoryOfInvolvementsRepository is a service class responsible for retrieval
# of HOI information from upstream APIs like Ferb
class HistoryOfInvolvementsRepository
  def self.search(security_token, client_ids)
    return { cases: [], referrals: [], screenings: [] } if client_ids.blank?

    FerbAPI.make_api_call(
      security_token,
      ExternalRoutes.ferb_api_history_of_involvements_path,
      :get,
      clientIds: client_ids
    ).body
  end
end
