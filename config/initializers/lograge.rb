# frozen_string_literal: true

Rails.application.configure do
  unless Rails.env.development?
    config.lograge.enabled = true
    config.lograge.formatter = Lograge::Formatters::Logstash.new
    config.lograge.base_controller_class = 'ActionController::Base'
    config.lograge.custom_options = lambda do |event|
      exceptions = %w[controller action format accessCode search_term]
      options = {
        request_id: event.payload[:headers]['action_dispatch.request_id'],
        session_id: event.payload[:headers]['rack.session'][:token],
        rails_session_id: event.payload[:headers]['rack.request.cookie_hash']['_session_id'],
        staff_id: event.payload[:staff_id],
        staff_county: event.payload[:staff_county],
        staff_county_description: event.payload[:staff_county_description],
        logger: config.lograge.formatter.class.to_s,
        params: event.payload[:params].except(*exceptions)
      }
      options
    end
  end
end
