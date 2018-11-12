# frozen_string_literal: true

# rubocop:disable Metrics/ModuleLength
module PersonSearchByAddressHelper
  def address_only_query
    {
      "size": '10',
      "track_scores": 'true',
      "sort": [
        {
          "_score": 'desc',
          "_uid": 'desc'
        }
      ],
      "query": {
        "bool": {
          "must": [
            {
              "nested": {
                "path": 'addresses',
                "query": {
                  "bool": {
                    "must": [
                      {
                        "match": {
                          "addresses.autocomplete_searchable_address": {
                            "query": 'street_number_and_name_search_term',
                            "operator": 'and'
                          }
                        }
                      },
                      {
                        "match": {
                          "addresses.autocomplete_city": {
                            "query": 'city_search_term'
                          }
                        }
                      },
                      {
                        "match": {
                          "addresses.county.description": {
                            "query": 'county_search_term'
                          }
                        }
                      },
                      {
                        "match": {
                          "addresses.last_known": {
                            "query": 'true'
                          }
                        }
                      }
                    ]
                  }
                },
                "inner_hits": {
                  "highlight": {
                    "fields": {
                      "addresses.autocomplete_city": {},
                      "addresses.autocomplete_searchable_address": {},
                      "addresses.county.description": {}
                    }
                  }
                }
              }
            }
          ],
          "should": [
            {
              "nested": {
                "path": 'addresses',
                "query": {
                  "bool": {
                    "should": [
                      {
                        "match": {
                          "addresses.searchable_address": {
                            "query": 'street_number_and_name_search_term',
                            "operator": 'and',
                            "boost": '3'
                          }
                        }
                      },
                      {
                        "match": {
                          "addresses.city": {
                            "query": 'city_search_term',
                            "boost": '3'
                          }
                        }
                      }
                    ]
                  }
                }
              }
            }
          ]
        }
      },
      "_source": source,
      "highlight": highlight
    }.as_json
  end

  def address_city_only
    {
      "query": {
        "bool": {
          "must": [
            {
              "nested": {
                "path": 'addresses',
                "query": {
                  "bool": {
                    "must": [
                      {
                        "match": {
                          "addresses.autocomplete_city": {
                            "query": 'city_search_term'
                          }
                        }
                      },
                      {
                        "match": {
                          "addresses.last_known": {
                            "query": 'true'
                          }
                        }
                      }
                    ]
                  }
                },
                "inner_hits": {
                  "highlight": {
                    "fields": {
                      "addresses.autocomplete_city": {},
                      "addresses.autocomplete_searchable_address": {},
                      "addresses.county.description": {}
                    }
                  }
                }
              }
            }
          ],
          "should": [
            {
              "nested": {
                "path": 'addresses',
                "query": {
                  "bool": {
                    "should":
                      [{
                        "match": {
                          "addresses.city": {
                            "query": 'city_search_term',
                            "boost": '3'
                          }
                        }
                      }]
                  }
                }
              }
            }
          ]
        }
      }
    }.as_json
  end
end
