# frozen_string_literal: true

require 'rails_helper'
require 'factory_bot'
require 'feature/testing'

feature 'CSEC validation' do
  let(:victim) { FactoryBot.create(:participant, :victim) }
  let(:screening) do
    {
      id: '1',
      name: 'James',
      assignee: 'Lisa',
      report_type: 'csec',
      started_at: '2016-08-13T10:00:00.000Z',
      ended_at: '2016-08-15T11:00:00.000Z',
      communication_method: 'mail',
      incident_address: {},
      addresses: [],
      cross_reports: [],
      participants: [victim.as_json.symbolize_keys],
      allegations: [],
      safety_alerts: []
    }
  end

  before do
    stub_and_visit_edit_screening(screening)
  end
  context 'csec start date field' do
    let(:csec_start_date_error_message) { 'Start date must be entered.' }
    scenario 'displays an error if the user does not enter a start date' do
      within "#participants-card-#{victim.id}" do
        expect(page).to have_content('CSEC Start Date')
        expect(page).not_to have_content(csec_start_date_error_message)
        fill_in_datepicker 'CSEC Start Date', with: '', blur: false
        expect(page).not_to have_content(csec_start_date_error_message)
        blur_field
        expect(page).to have_content(csec_start_date_error_message)
        fill_in_datepicker 'CSEC Start Date', with: '06-11-2018', blur: true
        expect(page).not_to have_content(csec_start_date_error_message)
      end
    end
  end
  context 'csec types field' do
    let(:csec_types_error_message) { 'CSEC type must be selected.' }
    scenario 'displays an error if the user does not enter a csec types' do
      within "#participants-card-#{victim.id}" do
        expect(page).to have_content('CSEC Types')
        expect(page).not_to have_content(csec_types_error_message)
        fill_in_react_select('CSEC Types', with: '')
        expect(page).not_to have_content(csec_types_error_message)
        blur_field
        expect(page).to have_content(csec_types_error_message)
        fill_in_react_select('CSEC Types', with: 'At Risk')
        blur_field
        expect(page).not_to have_content(csec_types_error_message)
      end
    end
  end
end
