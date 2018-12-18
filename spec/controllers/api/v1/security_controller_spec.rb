# frozen_string_literal: true

require 'rails_helper'

describe Api::V1::SecurityController do
  let(:token) { 'token' }

  describe '#check_permission' do
    context 'with no permission in session' do
      let(:session) do
        {
          token: token,
          user_details: {
          }
        }
      end

      it 'returns true' do
        process :check_permission,
          method: :get,
          params: { permission: :add_sensitive_people },
          session: session
        expect(response.status).to eq(200)
        expect(response.body).to eq('false')
      end
    end

    context 'with permission to add_sensitive_people' do
      let(:session) do
        {
          token: token,
          user_details: {
            'privileges' => ['Sensitive Persons']
          }
        }
      end

      it 'returns true' do
        process :check_permission,
          method: :get,
          params: { permission: :add_sensitive_people },
          session: session
        expect(response.status).to eq(200)
        expect(response.body).to eq('true')
      end
    end

    context 'without permission to add_sensitive_people' do
      let(:session) do
        {
          token: token,
          user_details: {
            'privileges' => []
          }
        }
      end

      it 'returns false' do
        process :check_permission,
          method: :get,
          params: { permission: :add_sensitive_people },
          session: session
        expect(response.status).to eq(200)
        expect(response.body).to eq('false')
      end
    end
  end

  context 'with override authority' do
    let(:session) do
      {
        token: token,
        user_details: {
          'privileges' => ['Sensitive Persons', 'Statewide Read']
        }
      }
    end

    it 'returns true' do
      process :check_permission,
        method: :get,
        params: { permission: :has_state_override },
        session: session
      expect(response.status).to eq(200)
      expect(response.body).to eq('true')
    end
  end

  context 'without override authority' do
    let(:session) do
      {
        token: token,
        user_details: {
          'privileges' => ['Sensitive Persons', 'Sealed']
        }
      }
    end

    it 'returns false' do
      process :check_permission,
        method: :get,
        params: { permission: :has_state_override },
        session: session
      expect(response.status).to eq(200)
      expect(response.body).to eq('false')
    end
  end

  context 'with a county override' do
    let(:session) do
      {
        token: token,
        user_details: {
          'privileges' => ['Sensitive Persons', 'Countywide Read']
        }
      }
    end

    it 'returns false' do
      process :check_permission,
        method: :get,
        params: { permission: :has_state_override },
        session: session
      expect(response.status).to eq(200)
      expect(response.body).to eq('false')
    end
  end
end
