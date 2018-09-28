# frozen_string_literal: true

# parent class for dora search
class QueryBuilder
  include QueryBuilderHelper

  attr_reader :search_term, :search_after, :is_client_only,
    :payload, :params, :city, :county, :street

  # class methods
  def self.build(params = {})
    builder = new(params)
    builder.extend(PersonSearchQueryBuilder).build_query(builder)
    builder.extend(PersonSearchByAddress).build_query(builder) if builder.address_searched?
    builder
  end

  # instance methods
  def initialize(params = {})
    @params = params.with_indifferent_access
    initialize_search
    initialize_address
    @payload = build_query
  end

  def initialize_search
    @search_term    = params[:search_term]
    @search_after   = params[:search_after]
    @is_client_only = params.fetch(:is_client_only, 'true') == 'true'
  end

  def initialize_address
    return unless address_searched?

    @city = params.dig(:search_address, :city)
    @county = params.dig(:search_address, :county)
    @street = params.dig(:search_address, :street)
  end

  def address_searched?
    params[:search_address].to_h.values.any?(&:present?)
  end

  def build_query
    {
      size: SIZE, track_scores: TRACK_SCORES, sort: [{ _score: 'desc', _uid: 'desc' }],
      _source: fields, highlight: highlight
    }.tap { |query| query[:search_after] = @search_after if @search_after }
  end

  def auto_bar_highlight
    { 'matched_fields':
      ['autocomplete_search_bar',
       'autocomplete_search_bar.phonetic',
       'autocomplete_search_bar.diminutive'] }
  end

  def fields
    %w[id legacy_source_table first_name middle_name last_name name_suffix gender
       date_of_birth date_of_death ssn languages races ethnicity client_counties
       addresses.id addresses.effective_start_date addresses.street_name addresses.street_number
       addresses.city addresses.county addresses.state_code addresses.zip addresses.type
       addresses.legacy_descriptor addresses.phone_numbers.number addresses.phone_numbers.type
       csec.start_date csec.end_date csec.csec_code_id csec.description
       legacy_descriptor highlight phone_numbers.id phone_numbers.number
       phone_numbers.type sensitivity_indicator race_ethnicity open_case_responsible_agency_code]
  end

  def highlight
    { order: 'score',
      number_of_fragments: NUMBER_OF_FRAGMENTS,
      require_field_match: REQUIRE_FIELD_MATCH,
      fields: {
        autocomplete_search_bar: auto_bar_highlight,
        searchable_date_of_birth: {}
      } }
  end
end
