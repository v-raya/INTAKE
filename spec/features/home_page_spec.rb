# frozen_string_literal: true

require 'rails_helper'
require 'feature/testing'
feature 'home page' do
  let(:screenings) do
    [
      {
        id: 1,
        name: "It's bigger on the inside",
        assignee: 'Clara Oswald',
        started_at: '2016-08-12T00:00:00.157Z',
        screening_decision: 'promote_to_referral',
        screening_decision_detail: nil,
        screening_status: 'open'
      },
      {
        id: 2,
        started_at: 1.year.ago.strftime('%FT%T.%LZ'),
        screening_decision: 'promote_to_referral',
        screening_decision_detail: 'immediate',
        screening_status: 'submitted'
      },
      {
        id: 3,
        screening_decision: 'promote_to_referral',
        screening_decision_detail: '3_days',
        screening_status: 'submitted'
      },
      {
        id: 4,
        screening_decision: 'promote_to_referral',
        screening_decision_detail: '5_days',
        screening_status: 'submitted'
      },
      {
        id: 5,
        screening_decision: 'promote_to_referral',
        screening_decision_detail: '10_days',
        screening_status: 'submitted'
      },
      {
        id: 6,
        screening_decision: 'screen_out',
        screening_decision_detail: 'evaluate_out',
        screening_status: 'submitted'
      },
      {
        id: 7,
        screening_decision: 'screen_out',
        screening_decision_detail: 'information_request',
        screening_status: 'submitted'
      },
      {
        id: 8,
        screening_decision: 'screen_out',
        screening_decision_detail: 'consultation',
        screening_status: 'submitted'
      },
      {
        id: 9,
        screening_decision: 'screen_out',
        screening_decision_detail: 'other',
        screening_status: 'submitted'
      }
    ]
  end

  it_behaves_like :authenticated do
    context 'when screenings is not enabled' do
      around do |example|
        Feature.run_with_deactivated(:screenings) do
          example.run
        end
      end

      scenario 'hide list of screenings' do
        visit root_path(accessCode: access_code)
        expect(
          a_request(:get, ferb_api_url(FerbRoutes.screenings_path))
        ).to_not have_been_made
        expect(page).not_to have_button 'Start Screening'
        expect(page).not_to have_css 'table'
      end
    end

    context 'when snapshot is not enabled' do
      around do |example|
        Feature.run_with_deactivated(:snapshot) do
          example.run
        end
      end

      scenario 'hide start snapshot button' do
        stub_request(:get, ferb_api_url(FerbRoutes.screenings_path)).and_return(
          json_body([], status: 200)
        )
        visit root_path(accessCode: access_code)
        expect(page).not_to have_button 'Start Snapshot'
      end
    end

    context 'when both screenings and snapshot are enabled' do
      scenario 'includes title and navigation links' do
        stub_request(:get, ferb_api_url(FerbRoutes.screenings_path)).and_return(
          json_body([], status: 200)
        )
        visit root_path(accessCode: access_code)
        expect(page).to have_title 'Intake'
        expect(page).to have_button 'Start Screening'
      end

      scenario 'screenings display response time if decision is promote to referral' do
        stub_request(:get, ferb_api_url(FerbRoutes.screenings_path))
          .and_return(json_body(screenings.to_json, status: 200))

        visit root_path(accessCode: access_code)

        within 'thead' do
          expect(page).to have_css('th', text: 'Screening Name')
          expect(page).to have_css('th', text: 'Type/Decision')
          expect(page).to have_css('th', text: 'Status')
          expect(page).to have_css('th', text: 'Assignee')
          expect(page).to have_css('th', text: 'Report Date and Time')
        end

        within 'tbody' do
          rows = all('tr')
          within rows[0] do
            expect(page).to have_text(
              "It's bigger on the inside open Clara Oswald 08/11/2016 5:00 PM"
            )
          end
          within rows[1] do
            expect(page).to have_content('Immediate submitted')
          end
          within rows[2] do
            expect(page).to have_content('3 days submitted')
          end
          within rows[3] do
            expect(page).to have_content('5 days submitted')
          end
          within rows[4] do
            expect(page).to have_content('10 days submitted')
          end
          within rows[5] do
            expect(page).to have_content('Evaluate out submitted')
          end
          within rows[6] do
            expect(page).to have_content('Information request submitted')
          end
          within rows[7] do
            expect(page).to have_content('Consultation submitted')
          end
          within rows[8] do
            expect(page).to have_content('Other submitted')
          end
        end
      end

      scenario 'screenings display reported date time time from now' do
        stub_request(:get, ferb_api_url(FerbRoutes.screenings_path))
          .and_return(json_body([screenings[1]].to_json, status: 200))

        visit root_path(accessCode: access_code)
        within 'tbody' do
          expect(page).to have_content('(a year ago)')
        end
      end
    end
  end
end
