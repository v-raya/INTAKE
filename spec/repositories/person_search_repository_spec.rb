# frozen_string_literal: true

require 'rails_helper'

describe PersonSearchRepository do
  let(:security_token) { 'security_token' }
  let(:privileges) { ['Snapshot-Street-Address'] }
  let(:session) do
    { security_token: security_token,
      user_details: { privileges: privileges } }
  end
  let(:request_id) { 'my_request_id' }
  let(:params) do
    {
      search_term: 'hello world'
    }
  end

  describe '.search' do
    context 'when response from DORA is successful' do
      it 'returns status 200' do
        stub_request(:post, dora_api_url(ExternalRoutes.dora_people_light_index_path))
          .and_return(json_body(['hello world'], status: 200))
        result = described_class.search(params, request_id, session: session)
        expect(result).to eq ['hello world']
      end
    end

    context 'when response from DORA is unsuccessful' do
      it 'raise error when status not 200' do
        stub_request(:post, dora_api_url(ExternalRoutes.dora_people_light_index_path))
          .and_return(json_body(['Created'], status: 201))

        expect do
          described_class.search(params, request_id, session: session)
        end.to raise_error(TypeError)
      end
    end
  end

  describe '.find' do
    let(:id) { '123456788' }
    let(:hits) do
      { 'hits' => { 'hits' => [{ '_source' => { 'id' => id } }] } }
    end

    context 'searching with no id' do
      it 'raises an error' do
        stub_request(:get, ferb_api_url(FerbRoutes.attach_client_path(id)))
          .and_return(json_body(hits.to_json, status: 200))
        expect do
          described_class.find(nil, request_id, security_token: security_token)
        end.to raise_error('id is required')
      end
    end

    context 'searching with an id' do
      it 'returns the existing person' do
        stub_request(:get, ferb_api_url(FerbRoutes.attach_client_path(id)))
          .and_return(json_body(hits.to_json, status: 200))
        result = described_class.find(id, request_id, security_token: security_token)
        expect(result['id']).to eq id
      end
    end
  end

  describe '.address_privilege?' do
    it 'return true when privileges contains Snapshot-Street-Address' do
      expect(PersonSearchRepository.send(:address_privilege?)).to eq true
    end
  end

  describe '.filtered_response' do
    let(:response) do
      {
        'hits' => {
          'hits' => [{
            '_source' => {
              'addresses' => [{
                'zip' => '92530',
                'city' => 'Lake Elsinore',
                'county' => {},
                'street_number' => '4451',
                'id' => '8Uywd2T0Ht',
                'type' => {
                  'description' => 'Residence', 'id' => '32'
                },
                'state_code' => 'CA',
                'street_name' => 'Anniversary Parkway'
              }]
            }
          }]
        }
      }
    end

    let(:response_without_street_details) do
      {
        'hits' => {
          'hits' => [{
            '_source' => {
              'addresses' => [{
                'zip' => '92530',
                'city' => 'Lake Elsinore',
                'county' => {},
                'id' => '8Uywd2T0Ht',
                'type' => {
                  'description' => 'Residence', 'id' => '32'
                },
                'state_code' => 'CA'
              }]
            }
          }]
        }
      }
    end

    it 'strip out street_name and street_number' do
      expect(PersonSearchRepository.send(:filtered_response, response))
        .to eq response_without_street_details
    end
  end
end
