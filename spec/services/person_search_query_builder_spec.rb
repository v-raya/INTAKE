# frozen_string_literal: true

require 'rails_helper'

describe PersonSearchQueryBuilder do
  describe '.build_query' do
    let(:search_term) { 'person_search_term' }
    let(:person_only_query) { PersonSearchResultBuilder.new.person_only_query }

    context 'returns hash' do
      it 'with query' do
        query_builder = QueryBuilder.new(search_term: search_term)
        query = query_builder.extend(described_class).query
        expect(query.as_json).to eq person_only_query['query']
      end
    end
  end
end
