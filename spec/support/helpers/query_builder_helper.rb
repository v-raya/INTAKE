# frozen_string_literal: true

module QueryBuilderHelper
  def highlight
    {
      "order": 'score',
      "number_of_fragments": '10',
      "require_field_match": 'false',
      "fields": {
        "autocomplete_search_bar": {
          "matched_fields": [
            'autocomplete_search_bar',
            'autocomplete_search_bar.phonetic',
            'autocomplete_search_bar.diminutive'
          ]
        },
        "searchable_date_of_birth": {}
      }
    }
  end

  def source
    [
      'id',
      'legacy_source_table',
      'first_name',
      'middle_name',
      'last_name',
      'name_suffix',
      'gender',
      'date_of_birth',
      'date_of_death',
      'ssn',
      'languages',
      'races',
      'ethnicity',
      'client_counties',
      'addresses.id',
      'addresses.effective_start_date',
      'addresses.street_name',
      'addresses.street_number',
      'addresses.city',
      'addresses.county',
      'addresses.state_code',
      'addresses.zip',
      'addresses.type',
      'addresses.legacy_descriptor',
      'addresses.phone_numbers.number',
      'addresses.phone_numbers.type',
      'legacy_descriptor',
      'highlight',
      'phone_numbers.id',
      'phone_numbers.number',
      'phone_numbers.type',
      'sensitivity_indicator',
      'race_ethnicity',
      'open_case_responsible_agency_code'
    ]
  end
end
