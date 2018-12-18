# frozen_string_literal: true

# CA Intake Application Controller.
class ApplicationController < ActionController::Base # :nodoc:
  before_action :set_cache_headers
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def append_info_to_payload(payload)
    super
    payload[:staff_id] = session[:user_details].try(:staff_id)
    payload[:staff_county] = session[:user_details].try(:county_code)
    payload[:staff_county_description] = session[:user_details].try(:county)
  end

  private

  def authenticate_user
    token = SecurityRepository.retrieve_token(
      access_code: params[:accessCode], token: params[:token]
    )
    session.delete(:token) if token
    return if session[:token]

    process_token(token)
  end

  def process_token(token)
    auth_artifact = SecurityRepository.auth_artifact_for_token(token)
    if auth_artifact
      session[:token] = token
      return unless json?(auth_artifact)
      assign_and_log_user_details(auth_artifact, token)
    else
      redirect_to SecurityRepository.login_url(request.original_url)
    end
  end

  def set_user_details_on_session(token, staff_id, auth_data)
    return unless staff_id
    begin
      session[:user_details] = StaffRepository.find(token, request.uuid, staff_id)
    rescue StandardError
      session[:user_details] = Staff.new('staffId' => staff_id)
    end
    session[:user_details]['privileges'] = auth_data['privileges']
  end

  def delete_user_from_session
    session.clear
  end

  def authentication_enabled?
    Feature.active?(:authentication)
  end

  def set_cache_headers
    response.headers['Cache-Control'] = 'no-cache, no-store'
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = '0'
    response.headers['X-Frame-Options'] = 'DENY'
    response.headers['X-XSS-Protection'] = '1'
  end

  def json?(json_candidate)
    JSON.parse(json_candidate)
    true
  rescue StandardError
    false
  end

  def assign_and_log_user_details(auth_artifact, token)
    auth_data = JSON.parse(auth_artifact)
    staff_id = auth_data['staffId']
    set_user_details_on_session(token, staff_id, auth_data)
    Rails.logger.info("User Authenticated: #{staff_id}")
  end
end
