# frozen_string_literal: true

require 'rails_helper'

describe PersonSearchQueryBuilder do
  describe '.build' do
    let(:search_term) { 'person_search_term' }
    let(:person_only_query) { PersonSearchResultBuilder.new.person_only_query }

    context 'when search_after is present and searching all participants' do
      let(:search_after) { %w[one two] }

      it 'builds a person search query with search_after' do
        result = described_class.new(search_term: search_term,
                                     search_after: search_after).build
        expect(result[:_source].as_json).to eq person_only_query['_source']
        expect(result[:size].as_json).to eq person_only_query['size']
        expect(result[:sort].as_json).to eq person_only_query['sort']
        expect(result[:track_scores].as_json).to eq person_only_query['track_scores']
        expect(result[:highlight].as_json).to eq person_only_query['highlight']
        expect(result[:search_after].as_json).to eq search_after
        expect(result[:query].as_json).to eq person_only_query['query']
      end
    end

    context 'when search_after is not present and searching clients only' do
      let(:search_after) { nil }

      it 'builds a person search query without search_after' do
        result = described_class.new(search_term: search_term,
                                     search_after: search_after).build
        expect(result[:query].as_json).to eq person_only_query['query']
        expect(result[:search_after].as_json).to eq search_after
      end
    end

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
          query_builder = PersonSearchQueryBuilder.new(search_term: search_term)
          result = query_builder.send('formatted_query')
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
          query_builder = PersonSearchQueryBuilder.new(search_term: search_term)
          result = query_builder.send('formatted_query')
          expect(result).to eq expected_results[index]
        end
      end

      it 'keeps apostrophes and slashes in the name' do
        search_term = "A/li'son Juniper 01/02"
        expected_search_term = "a/li'son juniper 0102"

        query_builder = PersonSearchQueryBuilder.new(search_term: search_term)
        result = query_builder.send('formatted_query')
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
          query_builder = PersonSearchQueryBuilder.new(search_term: search_term)
          result = query_builder.send('formatted_query')
          expect(result).to eq expected_results[index]
        end
      end
    end
  end
end
