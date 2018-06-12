# frozen_string_literal: true

require 'rails_helper'

feature 'safely surrendered baby' do
  let(:screening) do
    {
      id: '1',
      name: 'James',
      assignee: 'Lisa',
      report_type: '',
      started_at: '2016-08-13T10:00:00.000Z',
      ended_at: '2016-08-15T11:00:00.000Z',
      communication_method: 'mail',
      incident_address: {},
      addresses: [],
      cross_reports: [],
      participants: [],
      allegations: [],
      safety_alerts: []
    }
  end

  let(:screening_response_before_generation) do
    screening.merge(report_type: 'ssb')
  end

  let(:screening_response_after_generation) do
    screening_response_before_generation.merge(
      participants: [baby_doe_response, caretaker_doe_response],
      allegations: [
        id: '500',
        victim_id: '111',
        perpetrator_id: '222',
        allegation_types: ['Caretaker absent/incapacity']
      ]
    )
  end

  let(:baby_doe) do
    {
      id: nil,
      date_of_birth: nil,
      approximate_age: nil,
      approximate_age_units: nil,
      first_name: 'Baby',
      gender: nil,
      last_name: 'Doe',
      middle_name: nil,
      ssn: nil,
      sealed: false,
      sensitive: false,
      name_suffix: nil,
      phone_numbers: [],
      addresses: [],
      legacy_id: nil,
      legacy_source_table: nil,
      screening_id: '1',
      roles: ['Victim'],
      languages: [],
      races: [],
      ethnicity: {
        hispanic_latino_origin: nil,
        ethnicity_detail: []
      },
      legacy_descriptor: nil,
      safelySurrenderedBabies: {
        surrendered_by: 'Unknown Doe',
        relation_to_child: nil,
        bracelet_id: nil,
        parent_guardian_given_bracelet_id: nil,
        parent_guardian_provided_med_questionaire: nil,
        med_questionaire_return_date: nil,
        comments: nil,
        participant_child: nil
      },
      csec_started_at: nil,
      csec_ended_at: nil,
      csec_types: []
    }
  end

  let(:baby_doe_response) do
    baby_doe.merge(
      id: '111',
      safelySurrenderedBabies: {
        surrendered_by: 'Unknown Doe',
        relation_to_child: nil,
        bracelet_id: nil,
        parent_guardian_given_bracelet_id: nil,
        parent_guardian_provided_med_questionaire: nil,
        med_questionaire_return_date: nil,
        comments: nil,
        participant_child: '111'
      }
    )
  end

  let(:caretaker_doe) do
    {
      id: nil,
      date_of_birth: nil,
      approximate_age: '0',
      approximate_age_units: 'days',
      first_name: 'Unknown',
      gender: nil,
      last_name: 'Doe',
      middle_name: nil,
      ssn: nil,
      sealed: false,
      sensitive: false,
      name_suffix: nil,
      phone_numbers: [],
      addresses: [],
      legacy_id: nil,
      legacy_source_table: nil,
      screening_id: '1',
      roles: ['Perpetrator'],
      languages: [],
      races: [],
      ethnicity: {
        hispanic_latino_origin: nil,
        ethnicity_detail: []
      },
      legacy_descriptor: nil,
      safelySurrenderedBabies: nil,
      csec_started_at: nil,
      csec_ended_at: nil,
      csec_types: []
    }
  end

  let(:caretaker_doe_response) do
    caretaker_doe.merge(id: '222')
  end

  before(:each) do
    stub_request(:get, ferb_api_url(FerbRoutes.intake_screening_path(screening[:id])))
      .and_return(json_body(screening.to_json, status: 200))
    stub_request(:put, ferb_api_url(FerbRoutes.intake_screening_path(screening[:id])))
      .with(body: hash_including(participants: []))
      .and_return(json_body(screening_response_before_generation.to_json, status: 200))
    stub_empty_relationships
    stub_empty_history_for_screening(screening)
    visit edit_screening_path(id: screening[:id])

    stub_request(:put, ferb_api_url(FerbRoutes.intake_screening_path(screening[:id])))
      .with(body: hash_including(
        allegations: [{
          id: nil,
          screening_id: screening[:id],
          victim_person_id: baby_doe_response[:id],
          perpetrator_person_id: caretaker_doe_response[:id],
          types: ['Caretaker absent/incapacity']
        }]
      ))
      .and_return(json_body(screening_response_after_generation.to_json))

    stub_request(:post, ferb_api_url(FerbRoutes.screening_participants_path(screening[:id])))
      .with(json_body(hash_including(first_name: 'Baby')))
      .and_return(json_body(baby_doe_response.to_json))

    stub_request(:post, ferb_api_url(FerbRoutes.screening_participants_path(screening[:id])))
      .with(json_body(hash_including(first_name: 'Unknown')))
      .and_return(json_body(caretaker_doe_response.to_json))
  end

  scenario 'user saves a screening as a safely surrendered baby report' do
    within '#screening-information-card.edit' do
      expect(page).to have_field('Report Type', with: '')
      select 'Safely Surrendered Baby', from: 'Report Type'
      click_button 'Save'
    end

    within '#screening-information-card.show' do
      expect(page).to have_content('Safely Surrendered Baby')
      expect(page).to have_content('This screening was flagged as a safely surrendered baby report')
    end

    expect(
      a_request(:put, ferb_api_url(FerbRoutes.intake_screening_path(screening[:id])))
        .with(body: hash_including(screening.merge(report_type: 'ssb').as_json))
    ).to have_been_made

    expect(
      a_request(:post, ferb_api_url(FerbRoutes.screening_participants_path(screening[:id])))
        .with(json_body(baby_doe.to_json))
    ).to have_been_made

    expect(
      a_request(:post, ferb_api_url(FerbRoutes.screening_participants_path(screening[:id])))
        .with(json_body(caretaker_doe.to_json))
    ).to have_been_made

    expect(page).to have_content('Baby Doe')
    expect(page).to have_content('Unknown Doe')

    within edit_participant_card_selector(caretaker_doe_response[:id]) do
      expect(page).to have_react_select_field('Role', with: %w[Perpetrator])
      expect(page).to have_field('Approximate Age', with: '0')
      expect(page).to have_select('approximate_age_units', selected: 'Days')
    end
    within edit_participant_card_selector(baby_doe_response[:id]) do
      expect(page).to have_react_select_field('Role', with: %w[Victim])
      expect(page).to have_field('Surrendered By', disabled: true, with: 'Unknown Doe')
    end
    within '.card.edit', text: 'Allegations' do
      expect(page).to have_react_select_field(
        "allegations_#{baby_doe_response[:id]}_#{caretaker_doe_response[:id]}",
        with: ['Caretaker absent/incapacity']
      )
    end
  end
end
