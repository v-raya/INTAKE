# frozen_string_literal: true

require 'rails_helper'

feature 'Screening Information Report Type' do
  let(:victim) { create(:participant, :victim) }
  let(:reporter) { create(:participant, :reporter) }
  let(:perpetrator) { create(:participant, :perpetrator) }

  let(:screening) do
    {
      id: '1',
      name: 'Cameron',
      assignee: 'Mariko',
      report_type: 'csec',
      started_at: '2016-08-13T10:00:00.000Z',
      ended_at: '2016-08-15T11:00:00.000Z',
      communication_method: 'mail',
      incident_address: {},
      addresses: [],
      cross_reports: [],
      participants: [victim.to_json, reporter.to_json, perpetrator.to_json],
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

  scenario 'user edits screening details with report type "csec" and save the card' do
    within '#screening-information-card.edit' do
      fill_in 'Title/Name of Screening', with: screening[:name]
      fill_in 'Assigned Social Worker', with: screening[:assignee]
      fill_in_datepicker 'Screening Start Date/Time', with: '08/15/2016 3:00 AM'
      fill_in_datepicker 'Screening End Date/Time', with: '08/17/2016 3:00 AM'
      select 'Commercially Sexually Exploited Children (CSEC)', from: 'Report Type'
      select screening[:communication_method], from: 'Communication Method'
      click_button 'Save'
    end

    stub_request(:put, ferb_api_url(FerbRoutes.intake_screening_path(screening[:id])))
      .with(json_body(screening.as_json))
      .and_return(json_body(screening.to_json))
    stub_empty_relationships
    stub_empty_history_for_screening(screening)

    expect(
      a_request(:put, ferb_api_url(FerbRoutes.intake_screening_path(screening[:id])))
        .with(body: hash_including(screening.as_json))
    ).to have_been_made
  end
end
