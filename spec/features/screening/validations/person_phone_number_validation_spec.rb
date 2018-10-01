# frozen_string_literal: true

require 'rails_helper'

feature 'Person Phone Number Validation' do
  let(:screening) do
    {
      id: '1',
      incident_address: {},
      addresses: [],
      cross_reports: [],
      participants: [person.as_json.symbolize_keys],
      allegations: [],
      report_narrative: '',
      started_at: Time.new(2018, 12, 13)
    }
  end

  let(:person_name) { "#{person.first_name} #{person.last_name}" }

  before do
    stub_and_visit_edit_screening(screening)
  end

  context 'phone number with leading zero is not valid' do
    let(:valid_phone_number) { '1234567890' }

    let(:invalid_phone_numbers) { [{ id: 1, number: '0123456789', type: 'Home' }] }
    let(:person) { FactoryBot.create :participant, phone_numbers: invalid_phone_numbers }

    context 'phone number has leading zero' do
      let(:invalid_phone_number) { '0121234567' }
      let(:error_message) { 'The phone number should not start from 0' }

      scenario 'error is displayed until user enters a valid phone number' do
        expect(page).to have_content person_name
        validate_message_as_user_interacts_with_person_card(
          screening_id: screening[:id],
          person: person,
          error_message: error_message,
          person_updates: { phone_numbers: valid_phone_numbers }
        ) do
          within '.card', text: person_name do
            fill_in 'Phone Number', with: valid_phone_number
          end
        end
      end
    end
  end
end
