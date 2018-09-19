# frozen_string_literal: true

require 'rails_helper'

describe PersonSearchByAddress do
  let(:search_term) { 'city_search_term' }
  let(:address_only_query) { PersonSearchResultBuilder.new.address_only_query }
  let(:address_city_only) { PersonSearchResultBuilder.new.address_city_only }
  let(:address_query) do
    hash = { city: 'city_search_term',
             county: 'county_search_term',
             street: 'street_number_and_name_search_term' }
    described_class.new(search_address: hash)
  end

  describe '.query' do
    context 'returns hash' do
      it 'with query' do
        expect(address_query.query).to eq address_only_query[:query]
      end
    end
  end

  describe '.query' do
    context 'returns hash' do
      it 'with query' do
        address_query.search_term = nil
        address_query.county = nil
        expect(address_query.query).to eq address_city_only[:query]
      end
    end
  end
end
