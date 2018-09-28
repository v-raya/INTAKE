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

  let(:expected_json_for_screening_id) do
    [
      {
        id: '1',
        date_of_birth: '1958-11-11',
        age: '59',
        age_unit: 'Y',
        first_name: 'New York',
        middle_name: 'C',
        last_name: 'Pechan',
        name_suffix: 'Sr.',
        gender: 'M',
        relationship_to: [
          {
            relationship_id: 123,
            related_person_id: 2,
            related_person_first_name: 'North-Carolina',
            related_person_middle_name: 'B',
            related_person_last_name: 'Walburn',
            related_person_name_suffix: 'Jr. ',
            related_person_gender: 'M',
            related_person_date_of_birth: '1997-02-02'
          }
        ], candidate_to: [
          {
            candidate_id: 7,
            candidate_first_name: 'Jim',
            candidate_middle_name: '',
            candidate_last_name: 'Dowles',
            candidate_name_suffix: 'Mr',
            candidate_gender: 'M',
            candidate_date_of_birth: '1988-11-11',
            candidate_age: 20,
            candidate_age_unit: 'Y'
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
  let(:relationships_params) do
    [
      {
        absent_parent_indicator: false,
        client_id: 'ZXY123',
        end_date: '2010-10-01',
        legacy_id: 'A1b2x',
        relationship_id: '26',
        relationship_type: '190',
        relative_id: 'ABC987',
        same_home_status: 'Y',
        start_date: '1999-10-01'
      },
      {
        absent_parent_indicator: true,
        client_id: 'ABC123',
        end_date: '2011-10-01',
        legacy_id: 'BEb2x',
        relationship_id: '31',
        relationship_type: '200',
        relative_id: 'ZED987',
        same_home_status: 'N',
        start_date: '1999-10-01'
      }
    ]
  end

  let(:created_relationships) do
    [
      {
        id: '1',
        absent_parent_indicator: false,
        client_id: 'ZXY123',
        end_date: '2010-10-01',
        legacy_id: 'A1b2x',
        relationship_id: '26',
        relationship_type: '190',
        relative_id: 'ABC987',
        same_home_status: 'Y',
        start_date: '1999-10-01'
      },
      {
        id: '2',
        absent_parent_indicator: true,
        client_id: 'ABC123',
        end_date: '2011-10-01',
        legacy_id: 'BEb2x',
        relationship_id: '31',
        relationship_type: '200',
        relative_id: 'ZED987',
        same_home_status: 'N',
        start_date: '1999-10-01'
      }
    ]
  end

  let(:client_ids) do
    ['12']
  end

  let(:screening_id) do
    '1'
  end

  describe '#create' do
    it 'has a route' do
      expect(post: 'api/v1/relationships').to route_to(
        format: :json,
        controller: 'api/v1/relationships',
        action: 'create'
      )
    end

    it 'responds with success and return a collections of relationships' do
      allow(RelationshipsRepository).to receive(:create)
        .with(security_token, anything, anything)
        .and_return(created_relationships)
      process :create,
        method: :post,
        params: { relationships: relationships_params },
        session: session
      expect(response).to be_successful
      expect(JSON.parse(response.body)).to eq created_relationships.as_json
    end
  end

  describe '#index' do
    it 'fetches relationships for snapshot' do
      expect(RelationshipsRepository).to receive(:search)
        .with(security_token, anything, client_ids)
        .and_return(expected_json)

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

    it 'fetches relationships for a screening' do
      expect(RelationshipsRepository).to receive(:get_relationships_for_screening_id)
        .with(security_token, anything, screening_id)
        .and_return(expected_json_for_screening_id)

      process :index,
        method: :get,
        params: { clientIds: client_ids.join(','), screeningId: screening_id },
        session: session
      expect(JSON.parse(response.body)).to match array_including(
        a_hash_including(
          'id' => '1',
          'date_of_birth' => '1958-11-11',
          'age' => '59',
          'age_unit' => 'Y',
          'first_name' => 'New York',
          'middle_name' => 'C',
          'last_name' => 'Pechan',
          'name_suffix' => 'Sr.',
          'gender' => 'M',
          'relationship_to' => array_including(
            a_hash_including(
              'relationship_id' => 123,
              'related_person_id' => 2,
              'related_person_first_name' => 'North-Carolina',
              'related_person_middle_name' => 'B',
              'related_person_last_name' => 'Walburn',
              'related_person_name_suffix' => 'Jr. ',
              'related_person_gender' => 'M',
              'related_person_date_of_birth' => '1997-02-02'
            )
          ),
          'candidate_to' => array_including(
            a_hash_including(
              'candidate_id' => 7,
              'candidate_first_name' => 'Jim',
              'candidate_middle_name' => '',
              'candidate_last_name' => 'Dowles',
              'candidate_name_suffix' => 'Mr',
              'candidate_gender' => 'M',
              'candidate_date_of_birth' => '1988-11-11',
              'candidate_age' => 20,
              'candidate_age_unit' => 'Y'
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
        .with(security_token, anything, id)
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
        .with(security_token, anything, id, anything)
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
