# frozen_string_literal: true

require 'rails_helper'

feature 'Title changed from New screening to Edit Screening' do
  let(:screening) do
    {
      id: '1',
      name: nil,
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

  before(:each) do
    stub_request(:get, ferb_api_url(FerbRoutes.intake_screening_path(screening[:id])))
      .and_return(json_body(screening.to_json, status: 200))
    stub_request(:put, ferb_api_url(FerbRoutes.intake_screening_path(screening[:id])))
      .and_return(json_body(screening.to_json, status: 200))
    stub_empty_relationships
    stub_empty_history_for_screening(screening)
    visit edit_screening_path(id: screening[:id])
  end

  scenario 'After saving the card title changed to edit screening' do
    within '#screening-information-card' do
      click_button 'Save'
    end
    expect(page).to have_content("Edit Screening #{screening[:id]}")
  end
end
