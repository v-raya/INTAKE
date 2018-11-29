# frozen_string_literal: true

# The external Ferb routes will be accessible from here.
class FerbRoutes
  class << self
    def intake_screenings_path
      '/intake/screenings'
    end

    def screenings_path
      '/screenings'
    end

    def intake_screening_path(id)
      "/intake/screenings/#{id}"
    end

    def screening_participant_save_path(screening_id, participant_id)
      "/screenings/#{screening_id}/participants/#{participant_id}"
    end

    def screening_history_of_involvements_path(id)
      "/screenings/#{id}/history_of_involvements"
    end

    def screening_participant_path(screening_id, participant_id = nil)
      if participant_id
        screening_participant_save_path(screening_id, participant_id)
      else
        "/screenings/#{screening_id}/participants"
      end
    end

    def screening_submit_path(id)
      "/screenings/#{id}/submit"
    end

    def delete_screening_participant_path(screening_id, id)
      "/screenings/#{screening_id}/participants/#{id}"
    end

    def contacts_path(id)
      "/investigations/#{id}/contacts"
    end

    def lov_path
      '/lov'
    end

    def cross_report_agency
      '/cross_report_agency'
    end

    def staff_path(id)
      "/staffpersons/#{id}"
    end

    def client_authorization_path(id)
      "/authorize/client/#{id}"
    end

    def relationships_path
      '/clients/relationships'
    end

    def history_of_involvements_path
      '/clients/history_of_involvements'
    end

    def relationships_for_screening_path(screening_id)
      "/screenings/#{screening_id}/relationships_with_candidates"
    end

    def screening_relationships
      '/screening_relationships/batch'
    end

    def screening_relationship_path(id)
      "/screening_relationships/#{id}"
    end

    def attach_client_path(id)
      "/clients/#{id}"
    end
  end
end
