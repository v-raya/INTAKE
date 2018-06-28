# frozen_string_literal: true

require 'rails_helper'
require 'feature/testing'

feature 'New Screening' do
  it_behaves_like :authenticated do
    context 'when authentication is enabled' do
      let(:new_screening) do
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

      before do
        allow(LUID).to receive(:generate).and_return(['DQJIYK'])
      end

      scenario 'user starts a new screening and saving the first card should trigger POST' do
        stub_request(:get, ferb_api_url(FerbRoutes.screenings_path)).and_return(
          json_body([], status: 200)
        )
        visit root_path(accessCode: access_code)

        stub_empty_history_for_screening(new_screening)
        stub_empty_relationships
        stub_request(:post, ferb_api_url(FerbRoutes.intake_screenings_path))
          .and_return(json_body(new_screening.to_json, status: 201))
        stub_request(
          :get, ferb_api_url(FerbRoutes.intake_screening_path(new_screening[:id]))
        ).and_return(json_body(new_screening.to_json, status: 200))

        click_button 'Start Screening'

        within '#screening-information-card' do
          click_button 'Save'
        end

        expect(a_request(:post,
          ferb_api_url(FerbRoutes.intake_screenings_path))).to have_been_made

        stub_empty_history_for_screening(new_screening)
        stub_empty_relationships
        stub_request(:put, ferb_api_url(FerbRoutes.intake_screening_path(new_screening[:id])))
          .and_return(json_body(new_screening.to_json, status: 201))
        stub_request(
          :get, ferb_api_url(FerbRoutes.intake_screening_path(new_screening[:id]))
        ).and_return(json_body(new_screening.to_json, status: 200))

        within '#narrative-card' do
          click_button 'Save'
        end

        expect(
          a_request(:put, ferb_api_url(FerbRoutes.intake_screening_path(new_screening[:id])))
            .with(body: hash_including(new_screening))
        ).to have_been_made
      end
    end
  end
end
