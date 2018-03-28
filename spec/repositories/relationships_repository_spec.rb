# frozen_string_literal: true

require 'rails_helper'

describe RelationshipsRepository do
  let(:security_token) { 'my_security_token' }

  describe '.find_by_screening_id' do
    let(:screening_id) { '12' }
    let(:response) do
      double(:response, body: [], status: 200, headers: {})
    end

    it 'should return the relationships for all participants' do
      expect(IntakeAPI).to receive(:make_api_call)
        .with(security_token, "/api/v1/screenings/#{screening_id}/relationships", :get)
        .and_return(response)

      relationships = described_class.find_by_screening_id(security_token, screening_id)

      expect(relationships).to eq([])
    end
  end

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
end
