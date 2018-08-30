# frozen_string_literal: true

require 'rails_helper'
require 'feature/testing'

feature 'search card' do
  let(:existing_screening) do
    {
      id: '1',
      incident_address: {},
      addresses: [],
      cross_reports: [],
      participants: [],
      allegations: [],
      safety_alerts: []
    }
  end
  let(:date_of_birth) { 15.years.ago.to_date }
  before do
    stub_request(
      :get, ferb_api_url(FerbRoutes.intake_screening_path(existing_screening[:id]))
    ).and_return(json_body(existing_screening.to_json, status: 200))
    stub_empty_relationships
    stub_empty_history_for_screening(existing_screening)
    stub_system_codes
    visit edit_screening_path(id: existing_screening[:id])
  end

  scenario 'display include address' do
    within '#search-card', text: 'Search' do
      expect(page).to have_content 'Include Address'
      expect(find(:checkbox, 'Include Address')).to_not be_checked
    end
  end

  scenario 'when include address is checked, address input field and search button is displayed' do
    within '#search-card', text: 'Search' do
      find('label', text: /\AInclude Address\z/).click
      expect(page).to have_content 'Address'
      expect(page).to have_button 'Search'
    end
  end
end
