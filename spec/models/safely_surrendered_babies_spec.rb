# frozen_string_literal: true

require 'rails_helper'

describe SafelySurrenderedBabies do
  describe 'as_json' do
    it 'returns the attributes as a hash' do
      attributes = {
        surrendered_by: 'Unknown',
        relation_to_child: '525',
        bracelet_id: '1234',
        parent_guardian_given_bracelet_id: 'U',
        parent_guardian_provided_med_questionaire: 'U',
        med_questionaire_return_date: '1992-05-18',
        comments: 'Mother surrendered the baby',
        participant_child: '25'
      }.with_indifferent_access
      expect(described_class.new(attributes).as_json).to eq({
        surrendered_by: 'Unknown',
        relation_to_child: '525',
        bracelet_id: '1234',
        parent_guardian_given_bracelet_id: 'U',
        parent_guardian_provided_med_questionaire: 'U',
        med_questionaire_return_date: '1992-05-18',
        comments: 'Mother surrendered the baby',
        participant_child: '25'
      }.with_indifferent_access)
    end
  end
end
