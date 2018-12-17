# frozen_string_literal: true

require 'rails_helper'
require 'feature/testing'

feature 'Adding and removing a person from a snapshot' do
  around do |example|
    Feature.run_with_activated(:release_two) do
      example.run
    end
  end

  let(:participant) do
    {
      first_name: 'Mar',
      last_name: 'Simpson',
      gender: 'male',
      ssn: '',
      roles: [],
      addresses: [{
        messages: [],
        type: 'Placement Home',
        street_address: 'P.O. Box 162',
        city: 'Pala',
        state: 'CA',
        zip: '92089',
        legacy_descriptor: {
          legacy_id: '7OFBh9m2St',
          legacy_ui_id: '0419-8132-6960-2009479',
          legacy_last_updated: '1998-01-02T10:09:29.000-0800',
          legacy_table_name: 'PLC_HM_T',
          legacy_table_description: 'Placement Home'
        }
      }, {
        messages: [],
        type: 'Home',
        street_address: '6321 Di Loreto Point',
        city: 'San Diego',
        state: 'CA',
        zip: '0',
        legacy_descriptor: {
          legacy_id: 'C9dNEEl0AB',
          legacy_ui_id: '0690-4298-3587-5000631',
          legacy_last_updated: '1999-11-19T10:24:06.637-0800',
          legacy_table_name: 'ADDRS_T',
          legacy_table_description: 'Address'
        }
      }],
      races: [{ race: 'American Indian or Alaska Native', race_detail: 'American Indian' },
              { race: 'Asian', race_detail: 'Chinese' }],
      ethnicity: [{ hispanic_latino_origin: 'No', ethnicity_detail: [] }],
      middle_name: '',
      name_suffix: '',
      approximate_age: '30',
      approximate_age_units: 'years',
      languages: ['English', 'American Sign Language'],
      phone_numbers: [{ id: '1', number: '(971) 287-6774' }],
      sealed: false,
      sensitive: false,
      probation_youth: false,
      legacy_descriptor: {
        legacy_id: '1234567890',
        legacy_ui_id: '1621-3598-1936-3000631',
        legacy_last_updated: '1999-11-23T12:45:34.372-0800',
        legacy_table_name: 'CLIENT_T',
        legacy_table_description: 'Client'
      },
      csec: []
    }
  end

  before(:each) do
    allow(PersonSearchRepository).to \
      receive(:address_privilege?).and_return(true)
    stub_system_codes
    stub_empty_history_for_clients [participant.dig(:legacy_descriptor, :legacy_id)]
    stub_request(
      :get,
      ferb_api_url(
        FerbRoutes.relationships_path
      ) + "?clientIds=#{participant.dig(:legacy_descriptor, :legacy_id)}"
    ).and_return(json_body([].to_json, status: 200))

    search_response = PersonSearchResponseBuilder.build do |response|
      response.with_total(1)
      response.with_hits do
        [
          PersonSearchResultBuilder.build do |builder|
            builder.with_first_name(participant[:first_name])
            builder.with_legacy_descriptor(participant[:legacy_descriptor])
            builder.with_last_name(participant[:last_name])
            builder.with_phone_number(participant[:phone_numbers].first)
            builder.with_addresses do
              [
                AddressSearchResultBuilder.build do |address|
                  address.with_state_code(participant[:addresses][0][:state])
                  address.with_city(participant[:addresses][0][:city])
                  address.with_zip(participant[:addresses][0][:zip])
                  address.with_type do
                    AddressTypeSearchResultBuilder.build('Home')
                  end
                  address.with_phone_number(participant[:phone_numbers].first)
                end
              ]
            end
            builder.with_gender(participant[:gender])
            builder.with_date_of_birth(participant[:date_of_birth])
            builder.with_ssn(participant[:ssn])
            builder.with_race_and_ethnicity do
              RaceEthnicitySearchResultBuilder.build do |race_ethnicity|
                race_ethnicity.with_race_codes do
                  [
                    RaceCodesSearchResultBuilder.build('Unable to Determine')
                  ]
                end
              end
            end
          end
        ]
      end
    end

    stub_person_search(person_response: search_response)
    stub_request(
      :get,
      ferb_api_url(
        FerbRoutes.client_authorization_path(
          participant.dig(:legacy_descriptor, :legacy_id)
        )
      )
    ).and_return(json_body('', status: 200))
    stub_person_find(id: participant.dig(:legacy_descriptor, :legacy_id),
                     person_response: participant)
  end

  scenario 'User can add and remove users on snapshot' do
    visit snapshot_path

    within '#search-card', text: 'Search' do
      fill_in 'Search for clients', with: 'Ma'
    end

    within '#search-card', text: 'Search' do
      expect(page).not_to have_content 'Create a new person'
      page.find('strong', text: participant[:first_name]).click
    end

    expect(
      a_request(
        :get, ferb_api_url(
                FerbRoutes.client_authorization_path(
                  participant.dig(:legacy_descriptor, :legacy_id)
                )
        )
      )
    ).to have_been_made

    within show_participant_card_selector(participant.dig(:legacy_descriptor, :legacy_id)) do
      within '.card-body' do
        expect(page).to have_content(participant[:legacy_descriptor][:legacy_ui_id])
        expect(page).to have_content(participant[:first_name])
        expect(page).to have_content(participant[:last_name])
        expect(page).to have_content(participant[:phone_numbers].first[:number])
        expect(page).to have_content(participant[:phone_numbers].first[:type])
        expect(page).to have_content(participant[:gender].capitalize)
        expect(page).to have_content(participant[:approximate_age])
        expect(page).to have_content(participant[:ssn])
        expect(page).to have_content(participant[:races].first[:race])
      end

      within '.card-header' do
        expect(page).not_to have_content 'Edit'
        expect(page).to_not have_content('Sensitive')
        expect(page).to have_content("#{participant[:first_name]} #{participant[:last_name]}")
        click_button 'Remove person'
      end
    end

    expect(
      a_request(
        :get,
        ferb_api_url(
          FerbRoutes.history_of_involvements_path
        ) + "?clientIds=#{participant.dig(:legacy_descriptor, :legacy_id)}"
      )
    ).to have_been_made.times(1)

    expect(
      a_request(
        :get,
        ferb_api_url(
          FerbRoutes.relationships_path
        ) + "?clientIds=#{participant.dig(:legacy_descriptor, :legacy_id)}"
      )
    ).to have_been_made.times(1)

    expect(page).not_to have_content show_participant_card_selector('person.id')
    expect(page).not_to have_content(participant[:first_name])
  end

  scenario 'Clicking Start Over removes people from the snapshot page' do
    visit snapshot_path

    within '#search-card', text: 'Search' do
      fill_in 'Search for clients', with: 'Ma'
    end

    within '#search-card', text: 'Search' do
      expect(page).not_to have_content 'Create a new person'
      page.find('strong', text: participant[:first_name]).click
    end

    expect(
      a_request(
        :get, ferb_api_url(
                FerbRoutes.client_authorization_path(
                  participant.dig(:legacy_descriptor, :legacy_id)
                )
        )
      )
    ).to have_been_made

    within show_participant_card_selector(participant.dig(:legacy_descriptor, :legacy_id)) do
      within '.card-header' do
        expect(page).to have_content("#{participant[:first_name]} #{participant[:last_name]}")
      end
    end

    click_button 'Start Over'

    expect(page).not_to have_content(
      show_participant_card_selector(participant.dig(:legacy_descriptor, :legacy_id))
    )
    expect(page).not_to have_content(participant[:first_name])
  end
end
