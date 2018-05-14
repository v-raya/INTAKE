# frozen_string_literal: true

require 'rails_helper'
require 'spec_helper'

feature 'Participant Address' do
  let(:marge) { FactoryBot.create(:participant) }
  let(:screening) do
    {
      id: '1',
      incident_address: {},
      cross_reports: [],
      allegations: [],
      safety_alerts: [],
      participants: [marge.as_json.symbolize_keys]
    }
  end
  before do
    stub_request(:get, ferb_api_url(FerbRoutes.intake_screening_path(screening[:id])))
      .and_return(json_body(screening.to_json, status: 200))
    stub_request(
      :put, intake_api_url(ExternalRoutes.intake_api_participant_path(marge.id))
    ).and_return(json_body(marge.to_json, status: 200))
    stub_empty_relationships
    stub_empty_history_for_screening(screening)
  end

  scenario 'addresses order' do
    old_address =
      FactoryBot.create(
        :address,
        id: '1',
        street_address: '1 old st',
        city: 'Old Springfield',
        state: 'NY',
        zip: '12345'
      )
    new_address =
      FactoryBot.create(
        :address,
        id: '2',
        street_address: '2 new st',
        city: 'New Springfield',
        state: 'NY',
        zip: '12345'
      )

    marge = FactoryBot.create(:participant, addresses: [old_address, new_address])
    screening = FactoryBot.create(:screening, participants: [marge])
    stub_request(:get, intake_api_url(ExternalRoutes.intake_api_screening_path(screening.id)))
      .and_return(json_body(screening.to_json, status: 200))
    stub_empty_relationships
    stub_empty_history_for_screening(screening)
    visit edit_screening_path(id: screening.id)
    within edit_participant_card_selector(marge.id) do
      within all('.list-item').first do
        expect(page).to have_field('Address', with: '2 new st')
        expect(page).to have_field('City', with: 'New Springfield')
      end
      within all('.list-item').last do
        expect(page).to have_field('Address', with: '1 old st')
        expect(page).to have_field('City', with: 'Old Springfield')
      end
    end
  end

  scenario 'adding a new address to a participant' do
    visit edit_screening_path(id: screening[:id])

    within edit_participant_card_selector(marge.id) do
      click_button 'Add new address'

      within all('.row.list-item').first do
        fill_in 'Address', with: '1234 Some Lane'
        fill_in 'City', with: 'Someplace'
        select 'California', from: 'State'
        fill_in 'Zip', with: '55555'
        select 'Home', from: 'Address Type'
      end

      click_button 'Save'
    end

    expect(a_request(:put, intake_api_url(ExternalRoutes.intake_api_participant_path(marge.id)))
               .with(body: hash_including(
                 'addresses' => array_including(
                   hash_including(
                     'id' => nil,
                     'street_address' => '1234 Some Lane',
                     'city' => 'Someplace',
                     'state' => 'CA',
                     'zip' => '55555',
                     'type' => '32'
                   )
                 )
               ))).to have_been_made
  end

  scenario 'list of address types is correct' do
    visit edit_screening_path(id: screening[:id])
    within edit_participant_card_selector(marge.id) do
      click_button 'Add new address'
      expect(page).to have_select('Address Type', options: [
                                    '',
                                    'Common',
                                    'Day Care',
                                    'Home',
                                    'Homeless',
                                    'Other',
                                    'Penal Institution',
                                    'Permanent Mailing Address',
                                    'Residence 2',
                                    'Work'
                                  ])
    end
  end
end
