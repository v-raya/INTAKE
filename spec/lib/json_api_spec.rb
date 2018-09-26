# frozen_string_literal: true

require 'rails_helper'

describe JsonAPI do
  let(:api_class) do
    Class.new(JsonAPI) do
      class << self
        def api_url
          'http://api_url'
        end
      end
    end
  end

  describe '.make_api_call' do
    let(:security_token) { FFaker::Guid.guid }
    let(:request_id) { FFaker::Guid.guid }

    it 'sends get requests to the JSON API' do
      stub_request(:get, 'http://api_url/api/v1/screening/1')
      api_class.make_api_call(
        security_token: security_token,
        request_id: request_id,
        url: '/api/v1/screening/1',
        method: :get
      )
      expect(
        a_request(:get, 'http://api_url/api/v1/screening/1')
        .with(headers: {
                Authorization: security_token,
                'Request-Id': request_id,
                'Session-Id': security_token
              })
      ).to have_been_made
    end

    it 'sends request id and session id headers' do
      stub_request(:get, 'http://api_url/api/v1/screening/1')
        .with(headers: {
                'Accept' => '*/*',
                'Accept-Encoding' => 'gzip;q=1.0,deflate;q=0.6,identity;q=0.3',
                'Authorization' => security_token,
                'Session-Id' => security_token,
                'User-Agent' => 'Faraday v0.14.0'
              })
      api_class.make_api_call(
        security_token: security_token,
        request_id: request_id,
        url: '/api/v1/screening/1',
        method: :get
      )
      expect(
        a_request(:get, 'http://api_url/api/v1/screening/1')
          .with(headers: {
                  Authorization: security_token
                })
      ).to have_been_made
    end

    it 'sends get requests with params instead of a body' do
      stub_request(:get, 'http://api_url/api/v1/screening/1?foo=ABC&foo=DEF&bar=BAZ')
      api_class.make_api_call(
        security_token: security_token,
        request_id: request_id,
        method: :get,
        url: '/api/v1/screening/1',
        payload: {
          foo: %w[ABC DEF],
          bar: 'BAZ'
        }
      )
      expect(
        a_request(:get, 'http://api_url/api/v1/screening/1?foo=ABC&foo=DEF&bar=BAZ')
      ).to have_been_made
    end

    it 'sends post requests to the JSON API' do
      stub_request(:post, 'http://api_url/api/v1/screening').and_return(status: 201)
      api_class.make_api_call(
        security_token: security_token,
        request_id: request_id,
        method: :post,
        url: '/api/v1/screening',
        payload: {
          name: 'my new screening'
        }
      )
      expect(
        a_request(:post, 'http://api_url/api/v1/screening')
        .with(
          body: { name: 'my new screening' },
          headers: { 'Content-Type' => 'application/json', Authorization: security_token }
        )
      ).to have_been_made
    end

    it 'sends put requests to the JSON API' do
      stub_request(:put, 'http://api_url/api/v1/screening/1').and_return(status: 200)
      api_class.make_api_call(
        security_token: security_token,
        request_id: request_id,
        method: :put,
        url: '/api/v1/screening/1',
        payload: {
          name: 'my new screening'
        }
      )
      expect(
        a_request(:put, 'http://api_url/api/v1/screening/1')
        .with(
          body: { name: 'my new screening' },
          headers: { 'Content-Type' => 'application/json', Authorization: security_token }
        )
      ).to have_been_made
    end

    it 'sends delete requests to the JSON API' do
      stub_request(:delete, 'http://api_url/api/v1/screening/1').and_return(status: 204)
      api_class.make_api_call(
        security_token: security_token,
        request_id: request_id,
        method: :delete,
        url: '/api/v1/screening/1'
      )
      expect(
        a_request(:delete, 'http://api_url/api/v1/screening/1')
        .with(headers: { Authorization: security_token })
      ).to have_been_made
    end

    it 'rescue exception and return an ApiError' do
      stub_request(:get, 'http://api_url/api/v1/screening/1')
        .and_raise(Errno::ECONNREFUSED.new)

      expect do
        api_class.make_api_call(
          security_token: security_token,
          request_id: request_id,
          method: :get,
          url: '/api/v1/screening/1'
        )
      end.to(raise_error do |error|
        expect(error).to be_a(ApiError)
        expect(error.message).to eq('Connection refused')
        expect(error.api_error).to match a_hash_including(
          response_body: 'Internal Server Error',
          http_code: 500,
          url: '/api/v1/screening/1',
          method: :get,
          sent_attributes: ''
        )
      end)

      expect(
        a_request(:get, 'http://api_url/api/v1/screening/1')
        .with(headers: { Authorization: security_token })
      ).to have_been_made
    end
  end
end
