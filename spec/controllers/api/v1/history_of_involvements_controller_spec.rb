# frozen_string_literal: true

require 'rails_helper'

describe Api::V1::HistoryOfInvolvementsController do
  let(:security_token) { 'blanket' }
  let(:session) { { security_token: security_token } }

  let(:expected_json) do
    {
      cases: ['ABC'],
      referrals: ['DEF'],
      screenings: ['GHI']
    }.to_json
  end

  describe '#by_client_ids' do
    let(:client_ids) do
      ['12']
    end

    before do
      expect(HistoryOfInvolvementsRepository).to receive(:search)
        .with(security_token, anything, client_ids)
        .and_return(expected_json)
    end

    it 'should respond with success' do
      process :by_client_ids,
        method: :get,
        params: { clientIds: client_ids.join(',') },
        session: session
      expect(JSON.parse(response.body)).to match a_hash_including(
        'cases' => ['ABC'],
        'referrals' => ['DEF'],
        'screenings' => ['GHI']
      )
    end
  end
end
