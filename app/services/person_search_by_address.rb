# frozen_string_literal: true

# PeopleSearchByAddress is a service class responsible for creation
# of an elastic search person search query
module PersonSearchByAddress
  include QueryBuilderHelper

  ATTRIBUTES = {
    'addresses.searchable_address' => HIGH_BOOST,
    'addresses.city' => HIGH_BOOST,
    'addresses.county' => LOW_BOOST
  }.freeze

  def base_query
    { nested:
        { path: 'addresses',
          query: { bool: nested_must },
          inner_hits: highlight } }
  end

  def build_query(builder)
    builder.payload[:query][:bool][:must].concat(must)
    builder.payload[:query][:bool][:should].concat(should)
  end

  def highlight
    {
      highlight: {
        fields: { 'addresses.autocomplete_city' => {},
                  'addresses.autocomplete_searchable_address' => {},
                  'addresses.county.description' => {} }
      }
    }
  end

  def must
    [base_query]
  end

  def nested_must
    { must:
      [match_query('addresses.autocomplete_searchable_address', @street, operator: 'and'),
       match_query('addresses.autocomplete_city', @city),
       match_query('addresses.county.description', @county),
       { match: { "addresses.last_known": { query: 'true' } } }].compact }
  end

  def query
    { bool: { must: must, should: should } }
  end

  def should
    [{ "nested": { "path": 'addresses', "query": { "bool": {
      "should": [
        match_query('addresses.searchable_address', @street,
          operator: 'and', boost: MEDIUM_BOOST),
        match_query('addresses.city', @city, boost: MEDIUM_BOOST)
      ].compact
    } } } }]
  end
end
