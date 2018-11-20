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

    before(:each) do
      stub_request(:post, dora_api_url(ExternalRoutes.dora_people_light_index_path))
        .and_return(json_body(hits.to_json, status: 200))
    end

    context 'searching with no id' do
      it 'raises an error' do
        expect do
          described_class.find(nil, request_id, security_token: security_token)
        end.to raise_error('id is required')
      end
    end

    context 'searching with an id' do
      it 'returns the existing person' do
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
        'took' => 14, 'timed_out' => false, '_shards' => {
          'total' => 5, 'successful' => 5, 'failed' => 0
        }, 'hits' => {
          'total' => 13, 'max_score' => 162.16457, 'hits' => [{
            '_index' => 'people-summary_2018.11.06.16.20.00',
            '_type' => 'person-summary',
            '_id' => 'H0MnVWH0Ht',
            '_score' => 162.16457,
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
              }, {
                'zip' => '0',
                'city' => 'San Francisco',
                'county' => {},
                'legacy_descriptor' => {
                  'legacy_last_updated' => '2018-07-24T15:06:50.945-0700',
                  'legacy_id' => 'BfDkTjB0Ht',
                  'legacy_ui_id' => '0662-5672-0726-9001109',
                  'legacy_table_name' => 'ADDRS_T',
                  'legacy_table_description' => 'Address'
                },
                'effective_start_date' => '2001-02-10',
                'id' => 'BfDkTjB0Ht',
                'type' => {
                  'description' => 'Permanent Mailing Address', 'id' => '31'
                },
                'state_code' => 'CA',
                'street_name' => 'Menomonie Trail'
              }, {
                'zip' => '0',
                'city' => 'California',
                'county' => {},
                'legacy_descriptor' => {
                  'legacy_last_updated' => '2018-07-24T15:06:50.945-0700',
                  'legacy_id' => 'JAWH3I50Ht',
                  'legacy_ui_id' => '1088-8427-1139-7001109',
                  'legacy_table_name' => 'ADDRS_T',
                  'legacy_table_description' => 'Address'
                },
                'effective_start_date' => '2001-02-07',
                'id' => 'JAWH3I50Ht',
                'type' => {
                  'description' => 'Business', 'id' => '27'
                },
                'state_code' => 'CA',
                'street_name' => 'Lyons Junction'
              }], 'gender' => 'female', 'languages' => [{
                'name' => 'English',
                'id' => '1253',
                'primary' => true
              }], 'date_of_birth' => '2005-01-03', 'legacy_descriptor' => {
                'legacy_last_updated' => '2018-07-24T15:08:37.948-0700',
                'legacy_id' => 'H0MnVWH0Ht',
                'legacy_ui_id' => '0965-9408-8355-7001109',
                'legacy_table_name' => 'CLIENT_T', 'legacy_table_description' => 'Client'
              }, 'last_name' => 'Timson', 'id' => 'H0MnVWH0Ht',
              'first_name' => 'Sarah', 'sensitivity_indicator' => 'N',
              'client_counties' => [{
                'description' => 'Santa Cruz',
                'id' => '1111'
              }, {
                'description' => 'Madera',
                'id' => '1087'
              }]
            },
            'highlight' => {
              'autocomplete_search_bar' => ['<em>Timson</em>']
            },
            'sort' => [162.16457, 'person-summary#H0MnVWH0Ht']
          }]
        }
      }
    end

    let(:response_without_street_details) do
      { 'took' => 14, 'timed_out' => false, '_shards' => {
        'total' => 5, 'successful' => 5, 'failed' => 0
      }, 'hits' => {
        'total' => 13, 'max_score' => 162.16457, 'hits' => [{
          '_index' => 'people-summary_2018.11.06.16.20.00',
          '_type' => 'person-summary',
          '_id' => 'H0MnVWH0Ht',
          '_score' => 162.16457, '_source' => {
            'addresses' => [{
              'zip' => '92530',
              'city' => 'Lake Elsinore',
              'county' => {},
              'id' => '8Uywd2T0Ht',
              'type' => {
                'description' => 'Residence',
                'id' => '32'
              },
              'state_code' => 'CA'
            }, {
              'zip' => '0',
              'city' => 'San Francisco',
              'county' => {},
              'legacy_descriptor' => {
                'legacy_last_updated' => '2018-07-24T15:06:50.945-0700',
                'legacy_id' => 'BfDkTjB0Ht',
                'legacy_ui_id' => '0662-5672-0726-9001109',
                'legacy_table_name' => 'ADDRS_T',
                'legacy_table_description' => 'Address'
              },
              'effective_start_date' => '2001-02-10',
              'id' => 'BfDkTjB0Ht',
              'type' => {
                'description' => 'Permanent Mailing Address', 'id' => '31'
              },
              'state_code' => 'CA'
            }, {
              'zip' => '0',
              'city' => 'California',
              'county' => {},
              'legacy_descriptor' => {
                'legacy_last_updated' => '2018-07-24T15:06:50.945-0700',
                'legacy_id' => 'JAWH3I50Ht',
                'legacy_ui_id' => '1088-8427-1139-7001109',
                'legacy_table_name' => 'ADDRS_T',
                'legacy_table_description' => 'Address'
              },
              'effective_start_date' => '2001-02-07',
              'id' => 'JAWH3I50Ht',
              'type' => { 'description' => 'Business', 'id' => '27' },
              'state_code' => 'CA'
            }],
            'gender' => 'female',
            'languages' => [{ 'name' => 'English', 'id' => '1253', 'primary' => true }],
            'date_of_birth' => '2005-01-03',
            'legacy_descriptor' => {
              'legacy_last_updated' => '2018-07-24T15:08:37.948-0700',
              'legacy_id' => 'H0MnVWH0Ht',
              'legacy_ui_id' => '0965-9408-8355-7001109',
              'legacy_table_name' => 'CLIENT_T',
              'legacy_table_description' => 'Client'
            },
            'last_name' => 'Timson',
            'id' => 'H0MnVWH0Ht',
            'first_name' => 'Sarah',
            'sensitivity_indicator' => 'N',
            'client_counties' => [
              { 'description' => 'Santa Cruz', 'id' => '1111' },
              { 'description' => 'Madera', 'id' => '1087' }
            ]
          },
          'highlight' => { 'autocomplete_search_bar' => ['<em>Timson</em>'] },
          'sort' => [162.16457, 'person-summary#H0MnVWH0Ht']
        }]
      } }
    end

    it 'strip out street_name and street_number' do
      expect(PersonSearchRepository.send(:filtered_response, response))
        .to eq response_without_street_details
    end
  end
end
