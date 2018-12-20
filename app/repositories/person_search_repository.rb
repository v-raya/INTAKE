# frozen_string_literal: true

# PersonSearchRepository is a service class responsible for search of a person
# resource via the API
class PersonSearchRepository
  class << self
    attr_reader :session

    def search(params, request_id, session: {})
      @session = session
      response = DoraAPI.make_api_call(
        token: session['token'],
        request_id: request_id,
        url: ExternalRoutes.dora_people_light_index_path,
        method: :post,
        payload: search_query(params)
      )
      body(response)
    end

    def find(id, request_id, token: nil)
      raise 'id is required' unless id

      response = FerbAPI.make_api_call(
        token: token,
        request_id: request_id,
        url: FerbRoutes.participants_path(id),
        method: :get
      )
      response
    end

    private

    def body(response)
      search_body = response.body
      raise search_body unless response.status == 200
      search_body
    end

    def find_query(id)
      {
        query: {
          bool: {
            must: [{ match: { id: id.to_s } }]
          }
        },
        _source: find_fields
      }
    end

    # These fields are slightly different than the fields search uses. The set
    # was chosen in order to preserve the same data returned by FerbAPI, but
    # in the future find should return the same fields (or a superset) of
    # those returned by search. See person_search_query_builder.rb.
    def find_fields
      %w[ id legacy_source_table first_name middle_name last_name name_suffix gender
          date_of_birth date_of_death ssn languages addresses phone_numbers legacy_descriptor
          sensitivity_indicator race_ethnicity open_case_responsible_agency_code
          csec.start_date csec.end_date csec.csec_code_id csec.description]
    end

    def search_query(params)
      QueryBuilder.build(params).payload
    end
  end
end
