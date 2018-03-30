# frozen_string_literal: true

require 'rails_helper'

describe FerbRoutes do
  describe '.staff_path' do
    it 'returns /staffpersons/:id' do
      expect(described_class.staff_path(24)).to eq('/staffpersons/24')
    end
  end

  describe '.screening_history_of_involvements_path' do
    it 'returns /screenings/:id/history_of_involvements' do
      expect(described_class.screening_history_of_involvements_path(82)).to eq(
        '/screenings/82/history_of_involvements'
      )
    end
  end

  describe '.investigations_contacts_path' do
    it 'returns /investigations/:id/contacts' do
      expect(described_class.investigations_contacts_path(33)).to eq(
        '/investigations/33/contacts'
      )
    end
  end

  describe '.relationships_path' do
    it 'returns the base path' do
      expect(described_class.relationships_path).to eq(
        '/clients/relationships'
      )
    end
  end

  describe '.history_of_involvements_path' do
    it 'returns the base path' do
      expect(described_class.history_of_involvements_path).to eq(
        '/clients/history_of_involvements'
      )
    end
  end

  describe '.lov_path' do
    it 'returns /lov' do
      expect(described_class.lov_path).to eq('/lov')
    end
  end
end
