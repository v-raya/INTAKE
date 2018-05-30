# frozen_string_literal: true

# Model for storing Intake person information.
class SafelySurrenderedBabies
  include Virtus.model

  attribute :surrendered_by, String
  attribute :relation_to_child, String
  attribute :bracelet_id, String
  attribute :parent_guardian_given_bracelet_id, String
  attribute :parent_guardian_provided_med_questionaire, String
  attribute :med_questionaire_return_date, String
  attribute :comments, String
  attribute :participant_child, String
end
