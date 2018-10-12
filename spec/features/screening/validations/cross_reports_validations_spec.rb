# frozen_string_literal: true

require 'rails_helper'

feature 'Cross Reports Validations' do
  let(:screening) do
    {
      id: '1',
      incident_address: {},
      allegations: [],
      participants: [],
      safety_alerts: [],
      cross_reports: [{
        id: '1',
        county_id: '1077',
        agencies: [{
          id: nil,
          type: 'COUNTY_LICENSING'
        }]
      }]
    }
  end

  context 'on the edit page' do
    context 'reported_on field' do
      before do
        stub_county_agencies('1077')
        stub_and_visit_edit_screening(screening)
      end

      it 'shows reported_on validation on blur' do
        validate_message_as_user_interacts_with_date_field(
          card_name: 'cross-report',
          field: 'Cross Reported on Date',
          error_message: 'Please enter a cross-report date.',
          invalid_value: '',
          valid_value: 20.years.ago
        )
      end
    end

    context 'agency name field' do
      let(:error_message) { 'Please enter an agency name.' }
      before do
        stub_county_agencies('1077')
        stub_and_visit_edit_screening(screening)
      end

      context 'save with an agency' do
        before do
          stub_county_agencies('1077')
          screening[:cross_reports][0][:agencies][0][:code] = 'EYIS9Nh75C'
          stub_and_visit_edit_screening(screening)
          stub_request(
            :put,
            ferb_api_url(FerbRoutes.intake_screening_path(screening[:id]))
          ).and_return(json_body(screening.to_json, status: 201))
        end
        scenario 'shows no error when filled in' do
          select 'Hoverment Agency', from: 'County Licensing Agency Name'
          blur_field
          should_not_have_content error_message, inside: '#cross-report-card .card-body'
          save_card('cross-report')
          should_not_have_content error_message, inside: '#cross-report-card .card-body'
        end
      end
    end
  end
end
