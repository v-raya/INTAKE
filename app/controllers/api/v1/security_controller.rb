# frozen_string_literal: true

# Participants Controller handles all service request for
# the creation and modification of screening participant objects.
module Api
  module V1
    class SecurityController < ApiController # :nodoc:
      respond_to :json

      def check_permission
        permission = params[:permission].to_sym

        result = !permissions_set?(permission) && (
          add_sensitive_people?(permission) ||
          state_override?(permission)
        )

        render json: result
      end

      private

      def add_sensitive_people?(permission)
        privileges = session_user_details['privileges']
        permission == :add_sensitive_people && privileges.include?('Sensitive Persons')
      end

      def state_override?(permission)
        privileges = session_user_details['privileges']
        permission == :has_state_override && (
          privileges.include?('Statewide Read') ||
          privileges.include?('State Read Assignment')
        )
      end

      def permissions_set?(permission)
        permission.blank? ||
          session_user_details.blank? ||
          session_user_details['privileges'].blank?
      end
    end
  end
end
