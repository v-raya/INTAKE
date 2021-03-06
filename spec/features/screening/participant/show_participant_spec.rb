# frozen_string_literal: true

require 'rails_helper'

feature 'Show Screening' do
  address = FactoryBot.create(
    :address,
    street_address: '123 Fake St',
    city: 'Springfield',
    state: 'NY',
    zip: '12345',
    type: 'Home'
  )
  phone_number = FactoryBot.create(:phone_number, number: '4567891234', type: 'Home')

  date_of_birth = rand(100..1000).weeks.ago

  existing_participant = FactoryBot.create(
    :participant,
    date_of_birth: date_of_birth.to_s(:db),
    gender: 'male',
    middle_name: 'Jay',
    name_suffix: 'esq',
    ssn: '123-__-____',
    sealed: false,
    sensitive: true,
    addresses: [address],
    roles: ['Victim', 'Mandated Reporter'],
    races: [
      { race: 'Asian', race_detail: 'Korean' },
      { race: 'Native Hawaiian or Other Pacific Islander' }
    ],
    phone_numbers: [phone_number],
    ethnicity: {
      hispanic_latino_origin: 'Yes',
      ethnicity_detail: ['Mexican']
    },
    languages: %w[Korean Lao Hawaiian]
  )
  existing_screening = {
    id: '1',
    incident_address: {},
    cross_reports: [],
    allegations: [],
    safety_alerts: [],
    participants: [existing_participant.as_json.symbolize_keys]
  }

  before do
    stub_request(
      :get, ferb_api_url(FerbRoutes.intake_screening_path(existing_screening[:id]))
    ).and_return(json_body(existing_screening.to_json, status: 200))
    stub_empty_history_for_screening(existing_screening)
    stub_empty_relationships
  end

  scenario 'showing existing participant' do
    visit screening_path(id: existing_screening[:id])

    within show_participant_card_selector(existing_participant.id) do
      within '.card-header' do
        expect(page).to have_content('Sensitive')
        expect(page).to have_content(
          "#{existing_participant.first_name} Jay #{existing_participant.last_name}, Esq"
        )
        expect(page).to have_link 'Edit person'
        expect(page).to have_button 'Remove person'
      end

      within '.card-body' do
        table_description = existing_participant.legacy_descriptor.legacy_table_description
        ui_id = existing_participant.legacy_descriptor.legacy_ui_id
        expect(page).to have_content("#{table_description} ID #{ui_id} in CWS-CMS")
        expect(page).to have_content(
          "#{existing_participant.first_name} Jay #{existing_participant.last_name}, Esq"
        )
        expect(page).to have_content('(456) 789-1234')
        expect(page).to have_content('Home')
        expect(page).to have_content('Male')
        expect(page).to have_content('Victim')
        expect(page).to have_content('Mandated Reporter')
        expect(page).to have_content('Language(s) (Primary First)')
        expect(page).to have_content('Korean (Primary), Lao, Hawaiian')
        expect(page).to have_content(date_of_birth.strftime('%m/%d/%Y'))
        expect(page).to have_content(/123-\s*-\s*/)
        expect(page).to have_content(address.street_address)
        expect(page).to have_content(address.city)
        expect(page).to have_content('New York')
        expect(page).to have_content(address.zip)
        expect(page).to have_content(address.type)
        expect(page).to have_content('Hispanic/Latino Origin')
        expect(page).to have_content('Mexican - Yes')
        expect(page).to have_content('Asian - Korean (primary), '\
                                     'Native Hawaiian or Other Pacific Islander')
      end
    end
  end

  context 'has participant of hispanic/latino origin but with no ethnicity details' do
    before do
      existing_participant.ethnicity[:ethnicity_detail] = []
      existing_screening[:participants] = [existing_participant]
      stub_request(
        :get, ferb_api_url(FerbRoutes.intake_screening_path(existing_screening[:id]))
      ).and_return(json_body(existing_screening.to_json, status: 200))
      stub_empty_history_for_screening(existing_screening)
      stub_empty_relationships
    end

    scenario('display only hispanic/latino origin') do
      visit screening_path(id: existing_screening[:id])
      within show_participant_card_selector(existing_participant.id) do
        within '.card-body' do
          expect(page).to have_content('Hispanic/Latino Origin Yes', normalize_ws: true)
          expect(page).not_to have_content('Yes-')
        end
      end
    end
  end

  context 'participant with approximate age and no date of birth' do
    approximate_participant = FactoryBot.create(
      :participant,
      date_of_birth: nil,
      approximate_age: 10,
      approximate_age_units: 'Months'
    )
    approximate_screening = {
      id: '1',
      incident_address: {},
      cross_reports: [],
      allegations: [],
      safety_alerts: [],
      participants: [approximate_participant.as_json.symbolize_keys]
    }

    before do
      stub_request(
        :get, ferb_api_url(FerbRoutes.intake_screening_path(approximate_screening[:id]))
      ).and_return(json_body(approximate_screening.to_json, status: 200))
      stub_empty_history_for_screening(approximate_screening)
      stub_empty_relationships
    end

    scenario 'shows approximate age' do
      visit screening_path(id: approximate_screening[:id])

      within show_participant_card_selector(approximate_participant.id) do
        within '.card-body' do
          expect(page).to have_content('10')
          expect(page).to have_content('Months')
        end
      end
    end
  end

  scenario 'editing an existing participant on the show page' do
    visit screening_path(id: existing_screening[:id])

    within show_participant_card_selector(existing_participant.id) do
      click_link 'Edit person'
    end

    expect(page).to have_css(edit_participant_card_selector(existing_participant.id))
  end
end
