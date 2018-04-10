# frozen_string_literal: true

shared_examples :authenticated do
  let(:access_code) { 'tempToken123' }
  let(:auth_base_url) { 'http://www.example.com' }
  let(:auth_login_url) { 'http://www.example.com/authn/login?callback=' }
  let(:auth_logout_url) { 'http://www.example.com/authn/logout' }
  let(:auth_validation_url) { "http://www.example.com/authn/validate?token=#{access_code}" }
  let(:auth_access_code_url) { "http://www.example.com/authn/token?accessCode=#{access_code}" }
  let(:auth_artifact) do
    {
      staffId: '1234',
      privileges: ['Hotline-rollout', 'Snapshot-rollout']
    }
  end
  let(:base_path) { '' }
  let(:staff_url)  { ferb_api_url(FerbRoutes.staff_path(1234)) }
  let(:staff_info) do
    {
      first_name: 'Joe',
      last_name: 'Cool'
    }
  end

  def stub_authentication
    stub_request(:get, auth_access_code_url)
      .and_return(json_body(access_code, status: 200))
    stub_request(:get, auth_validation_url)
      .and_return(json_body(auth_artifact.to_json, status: 200))
    stub_request(:get, staff_url)
      .and_return(json_body(staff_info.to_json, status: 200))
  end

  around do |example|
    Feature.run_with_activated(:authentication, :perry_version_two) do
      with_config(
        authentication_base_url: auth_base_url,
        authentication_login_url: auth_login_url,
        authentication_logout_url: auth_logout_url,
        base_path: base_path
      ) do
        example.run
      end
    end
  end

  before do
    stub_authentication
  end
end
