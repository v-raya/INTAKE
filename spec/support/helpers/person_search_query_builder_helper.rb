# frozen_string_literal: true

# rubocop:disable Metrics/ModuleLength
module PersonSearchQueryBuilderHelper
  def person_and_address
    { "size": '10',
      "track_scores": 'true',
      "sort": [{
        "_score": 'desc',
        "_uid": 'desc'
      }],
      "query": { "bool": {
        "must": [{
          "bool": {
            "should": [{
              "match": {
                "autocomplete_search_bar": {
                  "query": 'person_search_term',
                  "operator": 'and',
                  "boost": '2'
                }
              }
            }, {
              "match": {
                "autocomplete_search_bar.diminutive": {
                  "query": 'person_search_term',
                  "operator": 'and',
                  "boost": '1'
                }
              }
            }, {
              "match": {
                "autocomplete_search_bar.phonetic": {
                  "query": 'person_search_term',
                  "operator": 'and',
                  "boost": '1'
                }
              }
            }]
          }
        }, {
          "match": {
            "legacy_descriptor.legacy_table_name": 'CLIENT_T'
          }
        }, {
          "nested": {
            "path":
            'addresses',
            "query": { "bool": {
              "must": [{
                "match": {
                  "addresses.autocomplete_searchable_address": {
                    "query": 'street_number_and_name_search_term',
                    "operator": 'and'
                  }
                }
              }, {
                "match": {
                  "addresses.autocomplete_city": {
                    "query": 'city_search_term'
                  }
                }
              }, {
                "match": {
                  "addresses.county.description": {
                    "query": 'county_search_term'
                  }
                }
              }, {
                "match": {
                  "addresses.last_known": {
                    "query": 'true'
                  }
                }
              }]
            } },
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
        }], "should": [{
          "match": {
            "autocomplete_search_bar": {
              "query": 'person_search_term',
              "operator": 'and',
              "boost": '3'
            }
          }
        }, {
          "match": {
            "first_name": {
              "query": 'person_search_term',
              "boost": '7'
            }
          }
        }, {
          "match": {
            "last_name": {
              "query": 'person_search_term',
              "boost": '7'
            }
          }
        }, {
          "match": {
            "first_name.phonetic": {
              "query": 'person_search_term',
              "boost": '2'
            }
          }
        }, {
          "match": {
            "last_name.phonetic": {
              "query": 'person_search_term',
              "boost": '2'
            }
          }
        }, {
          "match": {
            "date_of_birth_as_text": {
              "query": 'person_search_term',
              "boost": '7'
            }
          }
        }, {
          "match": {
            "ssn": {
              "query": 'person_search_term',
              "boost": '7'
            }
          }
        }, {
          "nested": {
            "path": 'addresses',
            "query": {
              "bool": {
                "should": [{
                  "match": {
                    "addresses.searchable_address": {
                      "query": 'street_number_and_name_search_term',
                      "operator": 'and',
                      "boost": '3'
                    }
                  }
                }, {
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
        }]
      } },
      "_source": source,
      "highlight": highlight }.as_json
  end

  def person_only_query
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
              "bool": {
                "should": [
                  {
                    "match": {
                      "autocomplete_search_bar": {
                        "query": 'person_search_term',
                        "operator": 'and',
                        "boost": '2'
                      }
                    }
                  },
                  {
                    "match": {
                      "autocomplete_search_bar.diminutive": {
                        "query": 'person_search_term',
                        "operator": 'and',
                        "boost": '1'
                      }
                    }
                  },
                  {
                    "match": {
                      "autocomplete_search_bar.phonetic": {
                        "query": 'person_search_term',
                        "operator": 'and',
                        "boost": '1'
                      }
                    }
                  }
                ]
              }
            },
            {
              "match": {
                "legacy_descriptor.legacy_table_name": 'CLIENT_T'
              }
            }
          ],
          "should": [
            {
              "match": {
                "autocomplete_search_bar": {
                  "query": 'person_search_term',
                  "operator": 'and',
                  "boost": '3'
                }
              }
            },
            {
              "match": {
                "first_name": {
                  "query": 'person_search_term',
                  "boost": '7'
                }
              }
            },
            {
              "match": {
                "last_name": {
                  "query": 'person_search_term',
                  "boost": '7'
                }
              }
            },
            {
              "match": {
                "first_name.phonetic": {
                  "query": 'person_search_term',
                  "boost": '2'
                }
              }
            },
            {
              "match": {
                "last_name.phonetic": {
                  "query": 'person_search_term',
                  "boost": '2'
                }
              }
            },
            {
              "match": {
                "date_of_birth_as_text": {
                  "query": 'person_search_term',
                  "boost": '7'
                }
              }
            },
            {
              "match": {
                "ssn": {
                  "query": 'person_search_term',
                  "boost": '7'
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
end
