# frozen_string_literal: true

SystemInformation.configure do |config|
  config.application = 'Intake App'
  config.version = ENV.fetch('APP_VERSION', 'unknown').to_s
  config.checks =
    [
      { name: :redis,
        url: "redis://#{ENV.fetch('REDIS_HOST', 'localhost')}:"\
          "#{ENV.fetch('REDIS_PORT', 6379)}" },
      { name: :perry,
        url: "#{ENV.fetch('AUTHENTICATION_URL', 'http://localhost/perry')}/"\
          'system-information' },
      { name: :ferb_api,
        url: "#{ENV.fetch('FERB_API_URL', 'http://localhost/ferb')}/"\
          'system-information' },
      { name: :dora_api,
        url: "#{ENV.fetch('DORA_API_URL', 'http://localhost/dora')}/"\
          'system-information' }
    ]
end
