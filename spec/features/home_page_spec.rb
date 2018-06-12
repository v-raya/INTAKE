# frozen_string_literal: true

require 'rails_helper'
require 'feature/testing'
feature 'home page' do
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

      scenario 'includes a list of saved screenings' do
        screening_one = {
          id: 1,
          name: 'Little Shop of Horrors',
          assignee: 'Melody Pond',
          started_at: '2016-08-11T18:24:22.157Z',
          screening_decision: 'differential_response',
          screening_status: 'submitted'
        }
        screening_two = {
          id: 2,
          name: 'The Shining',
          assignee: 'Sarah Jane Smith',
          started_at: '2016-08-12T12:12:22.157Z',
          screening_decision: 'information_to_child_welfare_services',
          screening_status: 'open'
        }
        screening_without_name = {
          id: 3,
          assignee: 'Rory Williams',
          started_at: '2016-08-17T01:24:22.157Z',
          screening_decision: 'differential_response',
          screening_status: 'open'
        }
        screening_without_decision = {
          id: 4,
          name: 'Elm Street',
          assignee: 'Freddy Krueger',
          started_at: '2017-10-13T00:24:22.157Z',
          screening_decision: nil,
          screening_status: 'open'
        }
        screenings =
          [screening_one, screening_two, screening_without_name, screening_without_decision]

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
          expect(page).to have_css('tr', count: 4)
          rows = all('tr')
          within rows[0] do
            expect(page).to have_link(screening_one[:name],
              href: screening_path(id: screening_one[:id]))
            expect(page).to have_text(
              'Little Shop of Horrors Differential response submitted Melody Pond 08/11/2016 11:24 AM'
            )
          end
          within rows[1] do
            expect(page).to have_link(screening_two[:name],
              href: screening_path(id: screening_two[:id]))
            expect(page).to have_text(
              'The Shining Information to child welfare '\
              'services open Sarah Jane Smith 08/12/2016 5:12 AM'
            )
          end
          within rows[2] do
            expect(page).to have_link(
              screening_without_name[:id],
              href: screening_path(id: screening_without_name[:id])
            )
            expect(page).to have_text(
              'Differential response open Rory Williams 08/16/2016 6:24 PM'
            )
          end
          within rows[3] do
            expect(page).to have_link(
              screening_without_decision[:name],
              href: screening_path(id: screening_without_decision[:id])
            )
            expect(page).to have_text('Elm Street open Freddy Krueger 10/12/2017 5:24 PM')
          end
        end
      end

      scenario 'screenings display response time if decision is promote to referral' do
        screenings = [
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
          }
        ]
        stub_request(:get, ferb_api_url(FerbRoutes.screenings_path))
          .and_return(json_body(screenings.to_json, status: 200))

        visit root_path(accessCode: access_code)
        within 'tbody' do
          rows = all('tr')
          within rows[0] do
            expect(page).to have_text("It's bigger on the inside open Clara Oswald 08/11/2016 5:00 PM")
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
        end
      end

      scenario 'screenings display category if decision is screen out' do
        screenings = [
          {
            id: 1,
            name: "It's bigger on the inside",
            assignee: 'Clara Oswald',
            started_at: '2016-08-12T00:00:00.157Z',
            screening_decision: 'screen_out',
            screening_decision_detail: nil,
            screening_status: 'submitted'
          },
          {
            id: 2,
            screening_decision: 'screen_out',
            screening_decision_detail: 'evaluate_out',
            screening_status: 'submitted',
          },
          {
            id: 3,
            screening_decision: 'screen_out',
            screening_decision_detail: 'information_request',
            screening_status: 'submitted'
          },
          {
            id: 4,
            screening_decision: 'screen_out',
            screening_decision_detail: 'consultation',
            screening_status: 'submitted'
          },
          {
            id: 5,
            screening_decision: 'screen_out',
            screening_decision_detail: 'other',
            screening_status: 'submitted'
          }
        ]
        stub_request(:get, ferb_api_url(FerbRoutes.screenings_path))
          .and_return(json_body(screenings.to_json, status: 200))

        visit root_path(accessCode: access_code)
        within 'tbody' do
          rows = all('tr')
          within rows[0] do
            expect(page).to have_text("It's bigger on the inside submitted Clara Oswald 08/11/2016 5:00 PM")
          end
          within rows[1] do
            expect(page).to have_content('Evaluate out submitted')
          end
          within rows[2] do
            expect(page).to have_content('Information request submitted')
          end
          within rows[3] do
            expect(page).to have_content('Consultation submitted')
          end
          within rows[4] do
            expect(page).to have_content('Other submitted')
          end
        end
      end

      scenario 'screenings display reported date time time from now' do
        screening = {
          id: 1,
          started_at: 1.year.ago.strftime('%FT%T.%LZ')
        }
        stub_request(:get, ferb_api_url(FerbRoutes.screenings_path))
          .and_return(json_body([screening].to_json, status: 200))

        visit root_path(accessCode: access_code)
        within 'tbody' do
          expect(page).to have_content('(a year ago)')
        end
      end
    end
  end
end
