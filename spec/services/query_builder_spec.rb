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
        qb = described_class.new(search_term: 'hello', is_client_only: 'true')
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
        qb = described_class.new(search_term: 'hello', is_client_only: 'true')
        expect(qb.must.last).to \
          include(match: { "legacy_descriptor.legacy_table_name": 'CLIENT_T' })
      end

      it 'return match for legacy with table name "CLIENT_T" if is_client_only blank' do
        qb = described_class.new(search_term: 'hello')
        expect(qb.must.last).to \
          include(match: { "legacy_descriptor.legacy_table_name": 'CLIENT_T' })
      end

      it 'return match for legacy with table name "CLIENT_T" if is_client_only "false"' do
        qb = described_class.new(search_term: 'hello', is_client_only: 'false')
        expect(qb.must.last).to \
          include(match: { "legacy_descriptor.legacy_table_name": 'CLIENT_T' })
      end
    end

    context 'is_client_only is false' do
      before(:each) do
        Rails.configuration.intake[:client_only_search] = false
      end

      it 'return match for legacy with table name "CLIENT_T" if is_client_only "true"' do
        qb = described_class.new(search_term: 'hello', is_client_only: 'true')
        expect(qb.must.last).to \
          include(match: { "legacy_descriptor.legacy_table_name": 'CLIENT_T' })
      end

      it 'return match for legacy with table name "CLIENT_T" if is_client_only blank' do
        qb = described_class.new(search_term: 'hello')
        expect(qb.must.last).to  \
          include(match: { "legacy_descriptor.legacy_table_name": 'CLIENT_T' })
      end

      it 'return match for legacy with table name "CLIENT_T" if is_client_only "false"' do
        qb = described_class.new(search_term: 'hello', is_client_only: 'false')
        expect(qb.must.last).not_to  \
          include(match: { "legacy_descriptor.legacy_table_name": 'CLIENT_T' })
      end
    end
  end

  describe '.build_query' do
    context 'when search_term and search_address are present' do
      it 'returns query with person and address' do
        result = described_class.new(search_term: search_term,
                                     search_address: search_address).build_query
        expect(result[:_source].sort).to eq person_and_address[:_source].sort
        expect(result[:size]).to eq person_and_address[:size]
        expect(result[:sort]).to eq person_and_address[:sort]
        expect(result[:track_scores]).to eq person_and_address[:track_scores]
        expect(result[:highlight]).to eq person_and_address[:highlight]
        expect(result[:query]).to eq person_and_address[:query]
      end
    end
  end
end
