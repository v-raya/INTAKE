# frozen_string_literal: true

# PeopleSearchQueryBuilder is a service class responsible for creation
# of an elastic search person search query
module PersonSearchQueryBuilder
  include QueryBuilderHelper
  ATTRIBUTES = {
    'first_name' => HIGH_BOOST,
    'last_name' => HIGH_BOOST,
    'first_name.phonetic' => LOW_BOOST,
    'last_name.phonetic' => LOW_BOOST,
    'date_of_birth_as_text' => HIGH_BOOST,
    'ssn' => HIGH_BOOST
  }.freeze

  def build_match_query(string)
    ATTRIBUTES.map do |k, v|
      match_query(k, formatted_query(string), boost: v)
    end
  end

  def build_query(builder)
    builder.payload[:query] = query
  end

  def query
    { bool: { must: must, should: should } }
  end

  def must
    # the client_only_search config option overrides the @is_client_only value
    return [base_query] unless Rails.configuration.intake[:client_only_search] ||
                               @is_client_only

    [base_query, client_only]
  end

  def should
    [match_query('autocomplete_search_bar', formatted_query(@search_term),
      operator: 'and', boost: MEDIUM_BOOST),
     build_match_query(@search_term)].flatten.compact
  end

  def base_query
    { bool: { should: [
      match_query('autocomplete_search_bar', formatted_query(@search_term),
        operator: 'and', boost: LOW_BOOST),
      match_query('autocomplete_search_bar.diminutive', formatted_query(@search_term),
        operator: 'and', boost: NO_BOOST),
      match_query('autocomplete_search_bar.phonetic', formatted_query(@search_term),
        operator: 'and', boost: NO_BOOST)
    ].compact } }
  end

  def client_only
    { match: { 'legacy_descriptor.legacy_table_name' => 'CLIENT_T' } }
  end
end
