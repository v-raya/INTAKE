# frozen_string_literal: true

# Be sure to restart your server when you modify this file.
Feature.with(:centralized_sessions) do
  Rails.application.config.session_store CwdsStore::Store,
    host: ENV.fetch('REDIS_HOST', 'localhost'),
    port: ENV.fetch('REDIS_PORT', '6379')
end

Feature.without(:centralized_sessions) do
  Rails.application.config.session_store(
    :cookie_store,
    key: '_ca_intake_session',
    expire_after: 4.hours
  )
end
