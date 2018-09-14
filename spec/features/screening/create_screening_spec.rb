# frozen_string_literal: true

require 'rails_helper'
require 'feature/testing'

feature 'Create Screening' do
  it_behaves_like :authenticated do
    context 'when authentication is enabled' do
      context 'user has full name and staff Id' do
        let(:staff_info) do
          {
            first_name: 'Joe',
            middle_initial: 'B',
            last_name: 'Cool',
            county: 'Mendocino',
            staff_id: '1234'
          }
        end

        scenario 'via start screening link' do
          user_name_display = 'Joe B. Cool - Mendocino'
          allow(LUID).to receive(:generate).and_return(['DQJIYK'])
          stub_county_agencies('1090')

          stub_request(:get, ferb_api_url(FerbRoutes.screenings_path))
            .and_return(json_body([].to_json, status: 200))
          visit root_path(accessCode: access_code)
          click_button 'Start Screening'

          within '.page-header-mast' do
            expect(page).to have_content('New Screening')
          end

          expect(page).to have_field(
            'Assigned Social Worker',
            with: user_name_display,
            disabled: true
          )
        end
      end

      context 'incident information county uses userInfo county' do
        let(:staff_info) do
          {
            first_name: 'Joe',
            middle_initial: 'B',
            last_name: 'Cool',
            county: 'Mendocino',
            county_code: '23',
            staff_id: '1234'
          }
        end

        scenario 'via start screening link' do
          allow(LUID).to receive(:generate).and_return(['DQJIYK'])
          stub_county_agencies('1090')

          stub_request(:get, ferb_api_url(FerbRoutes.screenings_path))
            .and_return(json_body([].to_json, status: 200))

          stub_request(:get, ferb_api_url(FerbRoutes.staff_path('1234')))
            .and_return(json_body(staff_info.to_json, status: 200))

          visit root_path(accessCode: access_code)
          click_button 'Start Screening'

          within '.page-header-mast' do
            expect(page).to have_content('New Screening')
          end

          expect(page).to have_select('Incident County', selected: 'Mendocino', disabled: true)

          within '#incident-information-card' do
            click_button 'Cancel'
            expect(page).to have_content('Mendocino')
          end
        end
      end

      context 'user has first and last name' do
        let(:staff_info) do
          {
            first_name: 'Joe',
            last_name: 'Cool',
            county: 'Mendocino',
            staff_id: '1234'
          }
        end

        scenario 'via start screening link' do
          user_name_display = 'Joe Cool - Mendocino'
          allow(LUID).to receive(:generate).and_return(['DQJIYK'])

          stub_county_agencies('1090')
          stub_request(:get, ferb_api_url(FerbRoutes.screenings_path))
            .and_return(json_body([].to_json, status: 200))

          visit root_path(accessCode: access_code)
          click_button 'Start Screening'

          within '.page-header-mast' do
            expect(page).to have_content('New Screening')
          end

          expect(page).to have_field(
            'Assigned Social Worker',
            with: user_name_display,
            disabled: true
          )
        end
      end

      context 'no user information' do
        let(:staff_info) { {} }
        scenario 'via start screening link' do
          allow(LUID).to receive(:generate).and_return(['DQJIYK'])

          stub_request(:get, ferb_api_url(FerbRoutes.screenings_path))
            .and_return(json_body([].to_json, status: 200))

          visit root_path(accessCode: access_code)
          click_button 'Start Screening'

          within '.page-header-mast' do
            expect(page).to have_content('New Screening')
          end

          expect(page).to have_field('Assigned Social Worker', with: '', disabled: false)
        end
      end
    end

    scenario 'via start screening link' do
      allow(LUID).to receive(:generate).and_return(['DQJIYK'])

      stub_request(:get, ferb_api_url(FerbRoutes.screenings_path))
        .and_return(json_body([].to_json, status: 200))

      visit root_path(accessCode: access_code)
      click_button 'Start Screening'

      within '.page-header-mast' do
        expect(page).to have_content('New Screening')
      end
    end
  end
end
