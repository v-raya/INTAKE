# frozen_string_literal: true

require 'rails_helper'

describe HistoryOfInvolvementsRepository do
  let(:security_token) { 'my_security_token' }
  let(:request_id) { 'my_request_id' }

  describe '.search' do
    let(:empty_hoi) do
      {
        cases: [],
        referrals: [],
        screenings: []
      }
    end

    let(:hoi) do
      {
        cases: [{
          id: 'ABC'
        }],
        referrals: [{
          id: 'DEF'
        }],
        screenings: [{
          id: 'GHI'
        }]
      }
    end
    let(:hoi_response) do
      double(:response, body: hoi, status: 200, headers: {})
    end

    it 'should return an empty HOI when no relationships found' do
      hois = described_class.search(security_token, request_id, [])

      expect(hois).to eq(empty_hoi)
    end

    it 'should return an HOI for a single id' do
      expect(FerbAPI).to receive(:make_api_call)
        .with(
          security_token: security_token,
          request_id: request_id,
          url: '/clients/history_of_involvements',
          method: :get,
          payload: { clientIds: ['EwsPYbG07n'] }
        ).and_return(hoi_response)

      relationships = described_class.search(security_token, request_id, ['EwsPYbG07n'])

      expect(relationships).to eq(hoi)
    end

    it 'should return an HOI for multiple clients' do
      expect(FerbAPI).to receive(:make_api_call)
        .with(
          security_token: security_token,
          request_id: request_id,
          url: '/clients/history_of_involvements',
          method: :get,
          payload: { clientIds: %w[EwsPYbG07n ABCDEFGHIJ ZYXWVUTSRQ] }
        ).and_return(hoi_response)

      relationships = described_class.search(
        security_token,
        request_id,
        %w[EwsPYbG07n ABCDEFGHIJ ZYXWVUTSRQ]
      )

      expect(relationships).to eq(hoi)
    end
  end
end
