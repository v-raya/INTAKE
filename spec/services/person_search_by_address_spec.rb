# frozen_string_literal: true

require 'rails_helper'

describe PersonSearchByAddress do
  let(:search_term) { 'city_search_term' }
  let(:address_only_query) { PersonSearchResultBuilder.new.address_only_query }
  let(:address_city_only) { PersonSearchResultBuilder.new.address_city_only }
  let(:params) do
    { city: search_term,
      county: 'county_search_term',
      street: 'street_number_and_name_search_term' }
  end

  describe '.query' do
    context 'returns hash' do
      it 'with query' do
        query_builder = QueryBuilder.new(search_address: params)
        query = query_builder.extend(described_class).query
        expect(query.as_json).to eq address_only_query['query']
      end
    end
  end

  describe '.query' do
    context 'returns hash' do
      it 'with query' do
        hash = { search_address: { city: search_term } }
        query_builder = QueryBuilder.new(hash)
        query = query_builder.extend(described_class).query

        expect(query.as_json).to eq address_city_only['query']
      end
    end
  end
end
