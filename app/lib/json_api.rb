# frozen_string_literal: true

class JsonAPI # :nodoc:
  CONTENT_TYPE = 'application/json'

  def self.connection
    Faraday.new(url: api_url) do |connection|
      connection.response :json, content_type: /\bjson$/
      connection.use IntakeFaradayMiddleware::RaiseHttpException
      connection.adapter Faraday.default_adapter
      connection
    end
  end

  def self.make_api_call(security_token:, request_id:, url:, method:, payload: nil)
    connection.send(method) do |req|
      req.url url
      req.headers['Authorization'] = security_token
      req.headers['REQUEST_ID'] = request_id
      req.headers['SESSION_ID'] = security_token
      set_payload(req, method, payload)
    end
  rescue Faraday::Error => e
    raise_api_error(e.message, payload, url, method)
  end

  private_class_method def self.raise_api_error(message, payload, url, method)
    raise ApiError,
      message: message,
      sent_attributes: payload ? payload.to_json : '',
      url: url,
      method: method
  end

  private_class_method def self.set_payload(req, method, payload)
    return req if payload.nil?

    if method == :get
      req.options.params_encoder = Faraday::FlatParamsEncoder
      req.params = payload
    else
      req.headers['Content-Type'] = CONTENT_TYPE
      req.body = payload.to_json
    end
    req
  end
end
