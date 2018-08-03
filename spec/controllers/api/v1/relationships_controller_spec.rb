# frozen_string_literal: true

require 'rails_helper'

describe Api::V1::RelationshipsController do
  let(:security_token) { 'my_security_token' }
  let(:session) { { security_token: security_token } }

  let(:expected_json) do
    [
      {
        id: '12',
        first_name: 'Aubrey',
        last_name: 'Campbell',
        relationships: [
          {
            first_name: 'Jake',
            last_name: 'Campbell',
            relationship: 'Sister',
            related_person_id: '7'
          }
        ]
      }
    ].to_json
  end

  let(:id) { '12345' }
  let(:relationship) do
    {
      absent_parent_indicator: false,
      client_id: 'ZXY123',
      end_date: '2010-10-01',
      legacy_id: 'A1b2x',
      relationship_id: id,
      relationship_type: '190',
      relative_id: 'ABC987',
      same_home_status: 'Y',
      start_date: '1999-10-01'
    }
  end

  describe '#index' do
    let(:client_ids) do
      ['12']
    end

    before do
      expect(RelationshipsRepository).to receive(:search)
        .with(security_token, client_ids)
        .and_return(expected_json)
    end

    it 'responds with success' do
      process :index,
        method: :get,
        params: { clientIds: client_ids.join(',') },
        session: session
      expect(JSON.parse(response.body)).to match array_including(
        a_hash_including(
          'id' => '12',
          'first_name' => 'Aubrey',
          'last_name' => 'Campbell',
          'relationships' => array_including(
            a_hash_including(
              'first_name' => 'Jake',
              'last_name' => 'Campbell',
              'relationship' => 'Sister',
              'related_person_id' => '7'
            )
          )
        )
      )
    end
  end

  describe '#show' do
    it 'has a route' do
      expect(get: 'api/v1/relationships/20').to route_to(
        format: :json,
        controller: 'api/v1/relationships',
        action: 'show',
        id: '20'
      )
    end

    it 'responds with success and return a relationship' do
      allow(RelationshipsRepository).to receive(:find)
        .with(security_token, id)
        .and_return(relationship)
      process :show, method: :get, params: { id: id }, session: session
      expect(response).to be_successful
      expect(JSON.parse(response.body)).to eq relationship.as_json
    end
  end

  describe '#update' do
    it 'has a route' do
      expect(put: 'api/v1/relationships/20').to route_to(
        format: :json,
        controller: 'api/v1/relationships',
        action: 'update',
        id: '20'
      )
    end

    it 'responds with success and return a relationship' do
      allow(RelationshipsRepository).to receive(:update)
        .with(security_token, id, anything)
        .and_return(relationship)
      process :update,
        method: :put,
        params: { id: id, relationship: relationship },
        session: session
      expect(response).to be_successful
      expect(JSON.parse(response.body)).to eq relationship.as_json
    end
  end
end
