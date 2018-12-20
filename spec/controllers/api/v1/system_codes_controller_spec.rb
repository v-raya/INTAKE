# frozen_string_literal: true

require 'rails_helper'

describe Api::V1::SystemCodesController do
  describe '#index' do
    let(:token) { 'token' }
    let(:session) do
      { token => token }
    end
    let(:response_object) do
      double(
        :response,
        body: [{ 'code' => '123', 'value' => 'abc' }],
        status: 200
      )
    end
    before do
      expect(FerbAPI).to receive(:make_api_call)
        .with(
          token: token,
          request_id: anything,
          url: '/lov',
          method: :get
        )
        .and_return(response_object)
    end

    it 'returns response from Ferb LOV API' do
      process :index, method: :get, session: session, as: :json
      expect(JSON.parse(response.body)).to match array_including(
        a_hash_including('code' => '123', 'value' => 'abc')
      )
      expect(response.status).to eq 200
    end
  end

  describe '#cross_report_agency' do
    let(:token) { 'token' }
    let(:session) do
      { token => token }
    end
    let(:agency_data) do
      [{
        'id' => 'LsUFj7O00E',
        'name' => "Daisie's Preschool",
        'type' => 'COMMUNITY_CARE_LICENSING',
        'county_id' => '1086'
      },
       {
         'id' => 'PaV1yNy00E',
         'name' => "Daisie's Preschool",
         'type' => 'COMMUNITY_CARE_LICENSING',
         'county_id' => '1086'
       },
       {
         'id' => '3qL9VRJ00F',
         'name' => 'LA FBI',
         'type' => 'DEPARTMENT_OF_JUSTICE',
         'county_id' => '1086'
       },
       {
         'id' => '862mwVN00F',
         'name' => 'LA Department of Justice',
         'type' => 'DEPARTMENT_OF_JUSTICE',
         'county_id' => '1086'
       },
       {
         'id' => 'EYIS9Nh75C',
         'name' => 'DOJ Agency',
         'type' => 'DEPARTMENT_OF_JUSTICE',
         'county_id' => '1086'
       },
       {
         'id' => 'K2Eh2w575C',
         'name' => 'FBI',
         'type' => 'DEPARTMENT_OF_JUSTICE',
         'county_id' => '1086'
       },
       {
         'id' => '45Hvp7x00F',
         'name' => 'LA District Attorney',
         'type' => 'DISTRICT_ATTORNEY',
         'county_id' => '1086'
       },
       {
         'id' => '4fECsXh75C',
         'name' => 'DA of LA',
         'type' => 'DISTRICT_ATTORNEY',
         'county_id' => '1086'
       },
       {
         'id' => 'GPumYGQ00F',
         'name' => 'Hoverment Agency',
         'type' => 'COUNTY_LICENSING',
         'county_id' => '1086'
       },
       {
         'id' => 'GPumYGQ00F',
         'name' => 'Hoverment Agency',
         'type' => 'COUNTY_LICENSING',
         'county_id' => '2080'
       },
       {
         'id' => 'BMG2f3J75C',
         'name' => 'The Sheriff',
         'type' => 'LAW_ENFORCEMENT',
         'county_id' => '1086'
       }]
    end
    let(:response_object) do
      double(
        :response,
        body: agency_data.reject { |agency| agency['type'] == '2080' }.to_json,
        status: 200
      )
    end
    before do
      expect(FerbAPI).to receive(:make_api_call)
        .with(
          token: token,
          request_id: anything,
          url: '/cross_report_agency?countyId=1086',
          method: :get
        )
        .and_return(response_object)
    end

    it 'returns response from Ferb cross_report_agency API' do
      process :cross_report_agency,
        method: :get,
        session: session,
        as: :json,
        params: { county_id: 1086 }
      expect(JSON.parse(response.body)).to match array_including(
        agency_data
      )
      expect(response.status).to eq 200
    end
  end

  describe '#cross_report_agency' do
    let(:token) { 'token' }
    let(:session) do
      { token => token }
    end
    let(:agency_data) do
      [{
        'id' => 'LsUFj7O00E',
        'name' => "Daisie's Preschool",
        'type' => 'community_care_licensing',
        'county_id' => '1086'
      },
       {
         'id' => 'PaV1yNy00E',
         'name' => "Daisie's Preschool",
         'type' => 'community_care_licensing',
         'county_id' => '1086'
       },
       {
         'id' => '3qL9VRJ00F',
         'name' => 'LA FBI',
         'type' => 'department_of_justice',
         'county_id' => '1086'
       },
       {
         'id' => '862mwVN00F',
         'name' => 'LA Department of Justice',
         'type' => 'department_of_justice',
         'county_id' => '1086'
       },
       {
         'id' => 'EYIS9Nh75C',
         'name' => 'DOJ Agency',
         'type' => 'department_of_justice',
         'county_id' => '1086'
       },
       {
         'id' => 'K2Eh2w575C',
         'name' => 'FBI',
         'type' => 'department_of_justice',
         'county_id' => '1086'
       },
       {
         'id' => '45Hvp7x00F',
         'name' => 'LA District Attorney',
         'type' => 'district_attorney',
         'county_id' => '1086'
       },
       {
         'id' => '4fECsXh75C',
         'name' => 'DA of LA',
         'type' => 'district_attorney',
         'county_id' => '1086'
       },
       {
         'id' => 'GPumYGQ00F',
         'name' => 'Hoverment Agency',
         'type' => 'county_licensing',
         'county_id' => '1086'
       },
       {
         'id' => 'BMG2f3J75C',
         'name' => 'The Sheriff',
         'type' => 'law_enforcement',
         'county_id' => '1086'
       }]
    end
    let(:response_object) do
      double(
        :response,
        body: agency_data.to_json,
        status: 200
      )
    end
    before do
      expect(FerbAPI).to receive(:make_api_call)
        .with(
          token: token,
          request_id: anything,
          url: '/cross_report_agency?countyId=123',
          method: :get
        )
        .and_return(response_object)
    end

    it 'returns response from Ferb cross_report_agency API' do
      process :cross_report_agency,
        params: { county_id: 123 },
        method: :get,
        session: session,
        as: :json
      expect(JSON.parse(response.body)).to match array_including(
        agency_data
      )
      expect(response.status).to eq 200
    end
  end
end
