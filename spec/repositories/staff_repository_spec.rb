# frozen_string_literal: true

require 'rails_helper'

describe StaffRepository do
  let(:security_token) { 'my_security_token' }
  let(:request_id) { 'my_request_id' }

  describe '.find' do
    let(:staff_id) { '66' }
    let(:response) do
      double(:response, body: { 'staff_id' => staff_id, 'first_name' => 'Existing Staff' })
    end

    before do
      expect(FerbAPI).to receive(:make_api_call)
        .with(
          security_token: security_token,
          request_id: request_id,
          url: "/staffpersons/#{staff_id}",
          method: :get
        )
        .and_return(response)
    end

    it 'returns the existing staff person' do
      existing_staff = described_class.find(security_token, request_id, staff_id)
      expect(existing_staff.staff_id).to eq(staff_id)
      expect(existing_staff.first_name).to eq('Existing Staff')
    end
  end
end
