# frozen_string_literal: true

require 'rails_helper'

describe QueryBuilder do
  let(:search_term) { 'person_search_term' }
  let(:search_address) do
    { city: 'city_search_term',
      county: 'county_search_term',
      street: 'street_number_and_name_search_term' }
  end

  let(:person_and_address) { PersonSearchResultBuilder.new.person_and_address }

  describe '.is_client_only?' do
    context 'is_client_only is true' do
      it 'return true' do
        qb = described_class.build(search_term: 'hello', is_client_only: 'true')
        expect(qb.is_client_only).to be true
      end
    end

    context 'is_client_only is blank' do
      it 'return true' do
        qb = described_class.new(search_term: 'hello')
        expect(qb.is_client_only).to be true
      end
    end

    context 'is_client_only is blank' do
      it 'return false' do
        qb = described_class.new(search_term: 'hello', is_client_only: 'false')
        expect(qb.is_client_only).to be false
      end
    end
  end

  describe '.must' do
    context 'is_client_only is true' do
      before(:each) do
        Rails.configuration.intake[:client_only_search] = true
      end

      it 'return match for legacy with table name "CLIENT_T" if is_client_only "true"' do
        qb = described_class.build(search_term: 'hello', is_client_only: 'true')
        expect(qb.must.last.as_json).to  \
          include({ match: { "legacy_descriptor.legacy_table_name": 'CLIENT_T' } }.as_json)
      end

      it 'return match for legacy with table name "CLIENT_T" if is_client_only blank' do
        qb = described_class.build(search_term: 'hello')
        expect(qb.must.last.as_json).to  \
          include({ match: { "legacy_descriptor.legacy_table_name": 'CLIENT_T' } }.as_json)
      end

      it 'return match for legacy with table name "CLIENT_T" if is_client_only "false"' do
        qb = described_class.build(search_term: 'hello', is_client_only: 'false')
        expect(qb.must.last.as_json).to  \
          include({ match: { "legacy_descriptor.legacy_table_name": 'CLIENT_T' } }.as_json)
      end
    end

    context 'is_client_only is false' do
      before(:each) do
        Rails.configuration.intake[:client_only_search] = false
      end

      it 'return match for legacy with table name "CLIENT_T" if is_client_only "true"' do
        qb = described_class.build(search_term: 'hello', is_client_only: 'true')
        expect(qb.must.last.as_json).to  \
          include({ match: { "legacy_descriptor.legacy_table_name": 'CLIENT_T' } }.as_json)
      end

      it 'return match for legacy with table name "CLIENT_T" if is_client_only blank' do
        qb = described_class.build(search_term: 'hello')
        expect(qb.must.last.as_json).to  \
          include({ match: { "legacy_descriptor.legacy_table_name": 'CLIENT_T' } }.as_json)
      end

      it 'return match for legacy with table name "CLIENT_T" if is_client_only "false"' do
        qb = described_class.build(search_term: 'hello', is_client_only: 'false')
        expect(qb.must.last.as_json).not_to  \
          include({ match: { "legacy_descriptor.legacy_table_name": 'CLIENT_T' } }.as_json)
      end
    end
  end

  describe '.build_query' do
    context 'when search_after is not present and searching clients only' do
      let(:search_after) { nil }

      it 'builds a person search query without search_after' do
        query = described_class.new(search_after: search_after)
                               .build_query

        expect(query[:search_after]).to eq search_after
      end
    end

    context 'when search_after is present and searching all participants' do
      let(:search_after) { %w[one two] }

      it 'builds a person search query with search_after' do
        query = described_class.new(search_after: search_after).build_query
        expect(query[:search_after]).to eq search_after
      end
    end
  end

  describe '#build' do
    context 'when search_term and search_address are present' do
      it 'returns query with person and address' do
        result = described_class.build(search_term: search_term,
                                       search_address: search_address)
                                .payload.as_json
        expect(result['_source']).to eq person_and_address['_source']
        expect(result['size']).to eq person_and_address['size']
        expect(result['sort']).to eq person_and_address['sort']
        expect(result['track_scores']).to eq person_and_address['track_scores']
        expect(result['highlight']).to eq person_and_address['highlight']
        expect(result['query']).to eq person_and_address['query']
      end
    end
  end

  describe '.formatted_query' do
    context 'when the search term includes date of birth' do
      it 'filters out slashes in the date of birth' do
        search_terms = [
          '01/02/2001',
          '02/2001',
          '2001',
          '01/02',
          '1/2/2001',
          '2/2001',
          '1/2'
        ]
        expected_results = %w[
          01022001
          022001
          2001
          0102
          122001
          22001
          12
        ]
        search_terms.each_with_index do |search_term, index|
          result = described_class.new.formatted_query(search_term)
          expect(result).to eq expected_results[index]
        end
      end

      it 'filters out dashes' do
        search_terms = [
          '01-02-2001',
          '02-2001',
          '2001',
          '01-02',
          '1-2-2001',
          '2-2001',
          '1-2'
        ]
        expected_results = %w[
          01022001
          022001
          2001
          0102
          122001
          22001
          12
        ]
        search_terms.each_with_index do |search_term, index|
          result = described_class.new.formatted_query(search_term)
          expect(result).to eq expected_results[index]
        end
      end

      it 'keeps apostrophes and slashes in the name' do
        search_term = "A/li'son Juniper 01/02"
        expected_search_term = "a/li'son juniper 0102"

        result = described_class.new.formatted_query(search_term)
        expect(result).to eq expected_search_term
      end

      it 'removes slashes in date times as the user is typing' do
        search_terms = [
          '0',
          '01',
          '01/',
          '01/0',
          '01/02',
          '01/02/',
          '01/02/1',
          '01/02/19',
          '01/02/199',
          '01/02/1995',
          '//0/1/0//2/1/9/9/5//',
          '1',
          '1/',
          '1/2',
          '1/2/',
          '1/2/1',
          '1/2/19',
          '1/2/199',
          '1/2/1995'
        ]
        expected_results = %w[
          0
          01
          01
          010
          0102
          0102
          01021
          010219
          0102199
          01021995
          01021995
          1
          1
          12
          12
          121
          1219
          12199
          121995
        ]
        search_terms.each_with_index do |search_term, index|
          result = described_class.new.formatted_query(search_term)
          expect(result).to eq expected_results[index]
        end
      end
    end
  end
end
