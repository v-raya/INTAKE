import ADDRESS_COUNTY from 'data/lov/addressCounty'
import ADDRESS_TYPE from 'data/lov/addressType'
import AGENCY_TYPE from 'data/lov/agencyType'
import ALLEGATION_TYPE from 'data/lov/allegationType'
import CARETAKER_RELATIONSHIP from 'data/lov/caretakerRelationship'
import COUNTY_TYPE from 'data/lov/countyType'
import RELATIONSHIP_TYPE from 'data/lov/relationshipType'
import US_STATE from 'data/lov/usState'

export default [
  ...ADDRESS_COUNTY,
  ...ADDRESS_TYPE,
  ...AGENCY_TYPE,
  ...ALLEGATION_TYPE,
  ...CARETAKER_RELATIONSHIP,
  ...COUNTY_TYPE,
  ...RELATIONSHIP_TYPE,
  ...US_STATE,
  {code: '118', value: 'Request Not Submitted', category: 'approval_status', sub_category: null},
  {code: '5378', value: 'Email', category: 'communication_method', sub_category: null},
  {code: '5375', value: 'Fax', category: 'communication_method', sub_category: null},
  {code: '408', value: 'In person', category: 'communication_method', sub_category: null},
  {code: '410', value: 'Mail', category: 'communication_method', sub_category: null},
  {code: '409', value: 'Phone', category: 'communication_method', sub_category: null},
  {code: '414', value: 'Court', category: 'contact_location', sub_category: null},
  {code: '415', value: 'CWS Office', category: 'contact_location', sub_category: null},
  {code: '417', value: 'Home', category: 'contact_location', sub_category: null},
  {code: '418', value: 'Other', category: 'contact_location', sub_category: null},
  {code: '420', value: 'School', category: 'contact_location', sub_category: null},
  {code: '5524', value: 'In placement', category: 'contact_location', sub_category: null},
  {code: '433', value: 'Conduct Client Evaluation', category: 'contact_purpose', sub_category: null},
  {code: '435', value: 'Investigate Referral', category: 'contact_purpose', sub_category: null},
  {code: '437', value: 'Consult with Service Provider', category: 'contact_purpose', sub_category: null},
  {code: '439', value: 'Consult with Collateral', category: 'contact_purpose', sub_category: null},
  {code: '440', value: 'Deliver Service to Client', category: 'contact_purpose', sub_category: null},
  {code: '5621', value: 'Consult with Staff Person', category: 'contact_purpose', sub_category: null},
  {code: 'A', value: 'Attempted', category: 'contact_status', sub_category: null},
  {code: 'C', value: 'Completed', category: 'contact_status', sub_category: null},
  {code: 'S', value: 'Scheduled', category: 'contact_status', sub_category: null},
  {code: '2094', value: 'Child Abuse Form', category: 'cross_report_comm_method', sub_category: null},
  {code: '2095', value: 'Electronic Report', category: 'cross_report_comm_method', sub_category: null},
  {code: '2096', value: 'Suspected Child Abuse Report', category: 'cross_report_comm_method', sub_category: null},
  {code: '2097', value: 'Telephone Report', category: 'cross_report_comm_method', sub_category: null},
  {code: '6867', value: 'At Risk', category: 'csec', sub_category: null},
  {code: '6868', value: 'Victim Before Foster Care', category: 'csec', sub_category: null},
  {code: '6869', value: 'Victim During Foster Care', category: 'csec', sub_category: null},
  {code: '6870', value: 'Victim in Open Case not in Foster Care', category: 'csec', sub_category: null},
  {code: '6871', value: 'Victim while Absent from Placement', category: 'csec', sub_category: null},
  {code: '6872', value: 'Victim with Closed Case, Rcv ILP Svcs', category: 'csec', sub_category: null},
  {code: '5923', value: 'Other Pacific Islander', category: 'ethnicity_type', sub_category: null},
  {code: '3162', value: 'Caribbean', category: 'ethnicity_type', sub_category: null},
  {code: '841', value: 'White - Central American', category: 'ethnicity_type', sub_category: null},
  {code: '828', value: 'Guamanian', category: 'ethnicity_type', sub_category: null},
  {code: '6351', value: 'Unknown', category: 'ethnicity_type', sub_category: null},
  {code: '820', value: 'Alaskan Native', category: 'ethnicity_type', sub_category: null},
  {code: '821', value: 'American Indian', category: 'ethnicity_type', sub_category: null},
  {code: '840', value: 'Armenian', category: 'ethnicity_type', sub_category: null},
  {code: '5922', value: 'Asian', category: 'ethnicity_type', sub_category: null},
  {code: '822', value: 'Asian Indian', category: 'ethnicity_type', sub_category: null},
  {code: '824', value: 'Cambodian', category: 'ethnicity_type', sub_category: null},
  {code: '3163', value: 'Central American', category: 'ethnicity_type', sub_category: null},
  {code: '825', value: 'Chinese', category: 'ethnicity_type', sub_category: null},
  {code: '6352', value: 'Declined to answer', category: 'ethnicity_type', sub_category: null},
  {code: '826', value: 'Ethiopian', category: 'ethnicity_type', sub_category: null},
  {code: '842', value: 'European', category: 'ethnicity_type', sub_category: null},
  {code: '827', value: 'Filipino', category: 'ethnicity_type', sub_category: null},
  {code: '829', value: 'Hawaiian', category: 'ethnicity_type', sub_category: null},
  {code: '830', value: 'Hispanic', category: 'ethnicity_type', sub_category: null},
  {code: '835', value: 'Hmong', category: 'ethnicity_type', sub_category: null},
  {code: '831', value: 'Japanese', category: 'ethnicity_type', sub_category: null},
  {code: '832', value: 'Korean', category: 'ethnicity_type', sub_category: null},
  {code: '833', value: 'Laotian', category: 'ethnicity_type', sub_category: null},
  {code: '3164', value: 'Mexican', category: 'ethnicity_type', sub_category: null},
  {code: '843', value: 'Middle Eastern', category: 'ethnicity_type', sub_category: null},
  {code: '5922', value: 'Other Asian', category: 'ethnicity_type', sub_category: null},
  {code: '836', value: 'Other Pacific Islander', category: 'ethnicity_type', sub_category: null},
  {code: '836', value: 'Polynesian', category: 'ethnicity_type', sub_category: null},
  {code: '844', value: 'Romanian', category: 'ethnicity_type', sub_category: null},
  {code: '837', value: 'Samoan', category: 'ethnicity_type', sub_category: null},
  {code: '3165', value: 'South American', category: 'ethnicity_type', sub_category: null},
  {code: '6453', value: 'Other Race Unknown', category: 'ethnicity_type', sub_category: null},
  {code: '838', value: 'Vietnamese', category: 'ethnicity_type', sub_category: null},
  {code: '839', value: 'White', category: 'ethnicity_type', sub_category: null},
  {code: 'D', value: 'Declined to answer', category: 'hispanic_origin_code', sub_category: null},
  {code: 'N', value: 'No', category: 'hispanic_origin_code', sub_category: null},
  {code: 'U', value: 'Unknown', category: 'hispanic_origin_code', sub_category: null},
  {code: 'Y', value: 'Yes', category: 'hispanic_origin_code', sub_category: null},
  {code: 'Z', value: 'Unknown', category: 'hispanic_origin_code', sub_category: null},
  {code: '1248', value: 'American Sign Language', category: 'language', sub_category: null},
  {code: '1249', value: 'Arabic', category: 'language', sub_category: null},
  {code: '1250', value: 'Armenian', category: 'language', sub_category: null},
  {code: '1251', value: 'Cambodian', category: 'language', sub_category: null},
  {code: '1252', value: 'Cantonese', category: 'language', sub_category: null},
  {code: '1253', value: 'English', category: 'language', sub_category: null},
  {code: '1254', value: 'Farsi', category: 'language', sub_category: null},
  {code: '1255', value: 'French', category: 'language', sub_category: null},
  {code: '1267', value: 'German', category: 'language', sub_category: null},
  {code: '1268', value: 'Hawaiian', category: 'language', sub_category: null},
  {code: '1256', value: 'Hebrew', category: 'language', sub_category: null},
  {code: '1257', value: 'Hmong', category: 'language', sub_category: null},
  {code: '1258', value: 'Ilacano', category: 'language', sub_category: null},
  {code: '3199', value: 'Indochinese', category: 'language', sub_category: null},
  {code: '1259', value: 'Italian', category: 'language', sub_category: null},
  {code: '1260', value: 'Japanese', category: 'language', sub_category: null},
  {code: '1261', value: 'Korean', category: 'language', sub_category: null},
  {code: '1262', value: 'Lao', category: 'language', sub_category: null},
  {code: '1263', value: 'Mandarin', category: 'language', sub_category: null},
  {code: '1264', value: 'Mien', category: 'language', sub_category: null},
  {code: '1265', value: 'Other Chinese', category: 'language', sub_category: null},
  {code: '1266', value: 'Other Non-English', category: 'language', sub_category: null},
  {code: '1269', value: 'Polish', category: 'language', sub_category: null},
  {code: '1270', value: 'Portuguese', category: 'language', sub_category: null},
  {code: '3200', value: 'Romanian', category: 'language', sub_category: null},
  {code: '1271', value: 'Russian', category: 'language', sub_category: null},
  {code: '1272', value: 'Samoan', category: 'language', sub_category: null},
  {code: '1273', value: 'Sign Language (Not ASL)', category: 'language', sub_category: null},
  {code: '1274', value: 'Spanish', category: 'language', sub_category: null},
  {code: '1275', value: 'Tagalog', category: 'language', sub_category: null},
  {code: '1276', value: 'Thai', category: 'language', sub_category: null},
  {code: '1277', value: 'Turkish', category: 'language', sub_category: null},
  {code: '1278', value: 'Vietnamese', category: 'language', sub_category: null},
  {code: '1327', value: 'Companion Case', category: 'non_cws_id', sub_category: null},
  {code: '1328', value: 'Criminal Investigation Index', category: 'non_cws_id', sub_category: null},
  {code: '1329', value: 'Family Preservation Case', category: 'non_cws_id', sub_category: null},
  {code: '1330', value: 'Juvenile Automated Index', category: 'non_cws_id', sub_category: null},
  {code: '1331', value: 'Medical Record', category: 'non_cws_id', sub_category: null},
  {code: '1332', value: 'Meds ID', category: 'non_cws_id', sub_category: null},
  {code: '6139', value: 'Mental Health', category: 'non_cws_id', sub_category: null},
  {code: '1333', value: 'Previous Case', category: 'non_cws_id', sub_category: null},
  {code: '1334', value: 'Probation Case', category: 'non_cws_id', sub_category: null},
  {code: '6274', value: 'Pupil Identification Number', category: 'non_cws_id', sub_category: null},
  {code: '1335', value: 'Regional Center', category: 'non_cws_id', sub_category: null},
  {code: '822', value: 'Asian Indian', category: 'ethnicity_type', sub_category: 'race_asian'},
  {code: '824', value: 'Cambodian', category: 'ethnicity_type', sub_category: 'race_asian'},
  {code: '825', value: 'Chinese', category: 'ethnicity_type', sub_category: 'race_asian'},
  {code: '827', value: 'Filipino', category: 'ethnicity_type', sub_category: 'race_asian'},
  {code: '831', value: 'Japanese', category: 'ethnicity_type', sub_category: 'race_asian'},
  {code: '832', value: 'Korean', category: 'ethnicity_type', sub_category: 'race_asian'},
  {code: '833', value: 'Laotian', category: 'ethnicity_type', sub_category: 'race_asian'},
  {code: '838', value: 'Vietnamese', category: 'ethnicity_type', sub_category: 'race_asian'},
  {code: '3162', value: 'Caribbean', category: 'ethnicity_type', sub_category: 'race_hispanic'},
  {code: '3164', value: 'Mexican', category: 'ethnicity_type', sub_category: 'race_hispanic'},
  {code: '3165', value: 'South American', category: 'ethnicity_type', sub_category: 'race_hispanic'},
  {code: '6451', value: 'Unknown', category: 'race_type', sub_category: null},
  {code: '821', value: 'American Indian or Alaska Native', category: 'race_type', sub_category: null},
  {code: '820', value: 'American Indian or Alaska Native', category: 'race_type', sub_category: null},
  {code: '835', value: 'Asian', category: 'race_type', sub_category: null},
  {code: '831', value: 'Asian', category: 'race_type', sub_category: null},
  {code: '824', value: 'Asian', category: 'race_type', sub_category: null},
  {code: '838', value: 'Asian', category: 'race_type', sub_category: null},
  {code: '825', value: 'Asian', category: 'race_type', sub_category: null},
  {code: '827', value: 'Asian', category: 'race_type', sub_category: null},
  {code: '822', value: 'Asian', category: 'race_type', sub_category: null},
  {code: '5922', value: 'Asian', category: 'race_type', sub_category: null},
  {code: '832', value: 'Asian', category: 'race_type', sub_category: null},
  {code: '833', value: 'Asian', category: 'race_type', sub_category: null},
  {code: '3162', value: 'Black or African American', category: 'race_type', sub_category: null},
  {code: '823', value: 'Black or African American', category: 'race_type', sub_category: null},
  {code: '826', value: 'Black or African American', category: 'race_type', sub_category: null},
  {code: '6352', value: 'Declined to answer', category: 'race_type', sub_category: null},
  {code: '837', value: 'Native Hawaiian or Other Pacific Islander', category: 'race_type', sub_category: null},
  {code: '5923', value: 'Native Hawaiian or Other Pacific Islander', category: 'race_type', sub_category: null},
  {code: '828', value: 'Native Hawaiian or Other Pacific Islander', category: 'race_type', sub_category: null},
  {code: '836', value: 'Native Hawaiian or Other Pacific Islander', category: 'race_type', sub_category: null},
  {code: '829', value: 'Native Hawaiian or Other Pacific Islander', category: 'race_type', sub_category: null},
  {code: '6453', value: 'Unknown', category: 'race_type', sub_category: null},
  {code: '841', value: 'White', category: 'race_type', sub_category: null},
  {code: '842', value: 'White', category: 'race_type', sub_category: null},
  {code: '844', value: 'White', category: 'race_type', sub_category: null},
  {code: '840', value: 'White', category: 'race_type', sub_category: null},
  {code: '843', value: 'White', category: 'race_type', sub_category: null},
  {code: '839', value: 'White', category: 'race_type', sub_category: null},
  {code: '6351', value: 'Unknown', category: 'race_type', sub_category: null},
  {code: '840', value: 'White - Armenian', category: 'ethnicity_type', sub_category: 'race_white'},
  {code: '841', value: 'White - Central American', category: 'ethnicity_type', sub_category: 'race_white'},
  {code: '842', value: 'White - European', category: 'ethnicity_type', sub_category: 'race_white'},
  {code: '843', value: 'White - Middle Eastern', category: 'ethnicity_type', sub_category: 'race_white'},
  {code: '844', value: 'White - Romanian', category: 'ethnicity_type', sub_category: 'race_white'},
  {code: 'csec', value: 'Commercially Sexually Exploited Children (CSEC)', category: 'report_type', sub_category: null},
  {code: 'ssb', value: 'Safely Surrendered Baby', category: 'report_type', sub_category: null},
  {code: '6401', value: 'Dangerous Animal on Premises', category: 'safety_alert', sub_category: null},
  {code: '6402', value: 'Dangerous Environment', category: 'safety_alert', sub_category: null},
  {code: '6403', value: 'Firearms in Home', category: 'safety_alert', sub_category: null},
  {code: '6404', value: 'Gang Affiliation or Gang Activity', category: 'safety_alert', sub_category: null},
  {code: '6405', value: 'Hostile, Aggressive Client', category: 'safety_alert', sub_category: null},
  {code: '6409', value: 'Other', category: 'safety_alert', sub_category: null},
  {code: '6406', value: 'Remote or Isolated Location', category: 'safety_alert', sub_category: null},
  {code: '6407', value: 'Severe Mental Health Status', category: 'safety_alert', sub_category: null},
  {code: '6408', value: 'Threat or Assault on Staff Member', category: 'safety_alert', sub_category: null},
  {code: '1521', value: 'N/A Secondary Report', category: 'screen_response_time', sub_category: null},
  {code: '1518', value: '10 Day', category: 'screen_response_time', sub_category: null},
  {code: '1516', value: '3 Day', category: 'screen_response_time', sub_category: null},
  {code: '1517', value: '5 Day', category: 'screen_response_time', sub_category: null},
  {code: '1519', value: 'Evaluate Out', category: 'screen_response_time', sub_category: null},
  {code: '1520', value: 'Immediate', category: 'screen_response_time', sub_category: null},
  {code: 'A', value: 'Unknown', category: 'unable_to_determine_code', sub_category: null},
  {code: 'I', value: 'Unknown', category: 'unable_to_determine_code', sub_category: null},
  {code: 'K', value: 'Unknown', category: 'unable_to_determine_code', sub_category: null},
]
