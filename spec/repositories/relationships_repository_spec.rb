# frozen_string_literal: true

require 'rails_helper'

describe RelationshipsRepository do
  let(:security_token) { 'my_security_token' }

  describe '.search' do
    let(:empty_response) do
      double(:response, body: [], status: 200, headers: {})
    end

    let(:relationships) do
      [{
        id: 'EwsPYbG07n',
        first_name: 'berry',
        last_name: 'Badger',
        relationship_to: [{
          related_person_first_name: 'amy',
          related_person_last_name: 'Brownbridge',
          relationship_context: '',
          related_person_relationship: '300',
          indexed_person_relationship: '300',
          legacy_descriptor: { legacy_id: 'EwsPYbG07n' }
        }],
        legacy_descriptor: { legacy_id: 'EwsPYbG07n' }
      }, {
        id: 'ABCDEFGHIJ',
        relationship_to: [],
        legacy_descriptor: { legacy_id: 'ABCDEFGHIJ' }
      }, {
        id: 'ZYXWVUTSRQ',
        first_name: 'Jon',
        last_name: 'Snow',
        relationship_to: [{
          related_person_first_name: 'Arya',
          related_person_last_name: 'Stark',
          relationship_context: '',
          related_person_relationship: '280',
          indexed_person_relationship: '280',
          legacy_descriptor: { legacy_id: 'ZYXWVUTSRQ' }
        }],
        legacy_descriptor: { legacy_id: 'ZYXWVUTSRQ' }
      }]
    end

    let(:single_response) do
      double(:response, body: [relationships.first])
    end

    let(:full_response) do
      double(:response, body: relationships)
    end

    it 'should return an empty list when no relationships found' do
      relationships = described_class.search(security_token, [])

      expect(relationships).to eq([])
    end

    it 'should return all relationships found for a single id' do
      expect(FerbAPI).to receive(:make_api_call)
        .with(
          security_token,
          '/clients/relationships',
          :get,
          clientIds: ['EwsPYbG07n']
        ).and_return(single_response)

      relationships = described_class.search(security_token, ['EwsPYbG07n'])

      expect(relationships).to eq([relationships.first])
    end

    it 'should return all relationships for multiple clients' do
      expect(FerbAPI).to receive(:make_api_call)
        .with(
          security_token,
          '/clients/relationships',
          :get,
          clientIds: %w[EwsPYbG07n ABCDEFGHIJ ZYXWVUTSRQ]
        ).and_return(full_response)

      relationships = described_class.search(security_token, %w[EwsPYbG07n ABCDEFGHIJ ZYXWVUTSRQ])

      expect(relationships).to eq(relationships)
    end
  end

  describe '.find' do
    let(:id) { '12345' }
    let(:relationship) do
      {
        id: id,
        client_id: 'ZXY123',
        relative_id: 'ABC987',
        relationship_type: '190',
        absent_parent_indicator: false,
        same_home_status: 'Y',
        start_date: '1999-10-01',
        end_date: '2010-10-01',
        legacy_id: 'A1b2x'
      }
    end

    let(:relationship_response) do
      double(:response, body: relationship)
    end

    context 'when relationship has an id' do
      before do
        expect(FerbAPI).to receive(:make_api_call)
          .with(
            security_token,
            "/screening_relationships/#{id}",
            :get
          ).and_return(relationship_response)
      end

      it 'should return a relationship' do
        updated_relationship = described_class.find(security_token, id)
        expect(updated_relationship.as_json).to eq(relationship.as_json)
      end
    end

    context 'when relationship has no id' do
      let(:id) { nil }

      it 'raises an error' do
        expect do
          described_class.find(security_token, id)
        end.to raise_error('Error updating relationship: id is required')
      end
    end
  end

  describe '.update' do
    let(:id) { '12345' }
    let(:relationship) do
      {
        id: id,
        client_id: 'ZXY123',
        relative_id: 'ABC987',
        relationship_type: '190',
        absent_parent_indicator: false,
        same_home_status: 'Y',
        start_date: '1999-10-01',
        end_date: '2010-10-01',
        legacy_id: 'A1b2x'
      }
    end

    let(:update_relationship_response) do
      double(:response, body: relationship)
    end

    context 'when relationship has an id' do
      before do
        expect(FerbAPI).to receive(:make_api_call)
          .with(
            security_token,
            "/screening_relationships/#{id}",
            :put,
            relationship
          ).and_return(update_relationship_response)
      end

      it 'should update the relationship' do
        updated_relationship = described_class.update(security_token, id, relationship)
        expect(updated_relationship.as_json).to eq(relationship.as_json)
      end
    end

    context 'when relationship has no id' do
      let(:id) { nil }

      it 'raises an error' do
        expect do
          described_class.update(security_token, id, relationship)
        end.to raise_error('Error updating relationship: id is required')
      end
    end
  end
end
