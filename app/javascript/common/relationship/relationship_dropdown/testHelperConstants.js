import { formatClient } from '../../../../../_utils/formatters';

export const clientFrodo = {
  identifier: 'DZGcEEgaa1',
  birth_dt: '2003-03-13',
  common_first_name: 'Froddo',
  common_last_name: 'Baggins',
  gender_code: 'M',
};

export const clientGandalf = {
  identifier: 'JoLW4VKaa1',
  birth_dt: '1935-03-13',
  common_first_name: 'Gandalf',
  common_last_name: 'Wizard',
  gender_code: 'M',
};

export const clientHarmoine = {
  identifier: 'NFOtBZeaa1',
  birth_dt: '1973-03-13',
  common_first_name: 'Hermione',
  common_last_name: 'Granger',
  gender_code: 'F',
};

export const clientGandalfNoDOB = {
  identifier: 'JoLW4VKaa1',
  birth_dt: '',
  common_first_name: 'Gandalf',
  common_last_name: 'Wizard',
  gender_code: 'M',
};

export const clientHarmoineNoDOB = {
  identifier: 'NFOtBZeaa1',
  birth_dt: '',
  common_first_name: 'Hermione',
  common_last_name: 'Granger',
  gender_code: 'F',
};

export const clientFrodoUnkownGender = {
  identifier: 'DZGcEEgaa1',
  birth_dt: '2003-03-13',
  common_first_name: 'Froddo',
  common_last_name: 'Baggins',
  gender_code: 'U',
};

export const clientFrodoUnkownGenderNoDOB = {
  identifier: 'DZGcEEgaa1',
  birth_dt: '',
  common_first_name: 'Froddo',
  common_last_name: 'Baggins',
  gender_code: 'U',
};

export const clientHarmoineUnknowGenderNoDOB = {
  identifier: 'NFOtBZeaa1',
  birth_dt: '',
  common_first_name: 'Hermione',
  common_last_name: 'Granger',
  gender_code: 'U',
};

export const clientGandalfUnknowGender = {
  identifier: 'JoLW4VKaa1',
  birth_dt: '1973-03-13',
  common_first_name: 'Gandalf',
  common_last_name: 'Wizard',
  gender_code: 'U',
};

export const genderCodeMM = {
  value: 179,
  logical_code: 'BR',
  gender_code: 'MM',
  label: 'Brother/Brother',
};
export const genderCodemM = {
  value: 285,
  logical_code: 'S',
  gender_code: 'mM',
  label: 'Son/Father (Birth)',
};
export const genderCodeMm = {
  value: 211,
  logical_code: 'F',
  gender_code: 'Mm',
  label: 'Father/Son (Birth)',
};
export const genderCodeFM = {
  value: 276,
  logical_code: 'SI',
  gender_code: 'FM',
  label: 'Sister/Brother',
};
export const genderCodeFm = {
  value: 252,
  logical_code: 'M',
  gender_code: 'Fm',
  label: 'Mother/Son (Birth)',
};
export const genderCodemF = {
  value: 291,
  logical_code: 'S',
  gender_code: 'mF',
  label: 'Son/Mother (Birth)',
};
export const genderCodeMF = {
  value: 182,
  logical_code: 'BR',
  gender_code: 'MF',
  label: 'Brother/Sister',
};
export const genderCodeMf = {
  value: 205,
  logical_code: 'F',
  gender_code: 'Mf',
  label: 'Father/Daughter (Birth)',
};
export const genderCodefM = {
  value: 190,
  logical_code: 'D',
  gender_code: 'fM',
  label: 'Daughter/Father (Birth)',
};

export const genderCodefF = {
  value: 196,
  logical_code: 'D',
  gender_code: 'fF',
  label: 'Daughter/Mother (Birth)',
};

export const genderCodeFF = {
  value: 197,
  logical_code: 'FD',
  gender_code: 'FF',
  label: 'Daughter/Mother (Foster)',
};

export const genderCodeFf = {
  value: 247,
  logical_code: 'M',
  gender_code: 'Ff',
  label: 'Mother/Daughter (Birth)',
};

export const clientFrodoFormatted = formatClient(clientFrodo);
export const clientGandalfFormatted = formatClient(clientGandalf);
export const clientHarmoineFormatted = formatClient(clientHarmoine);
export const clientGandalfNoDOBFormatted = formatClient(clientGandalfNoDOB);
export const clientHarmoineNoDOBFormatted = formatClient(clientHarmoineNoDOB);
export const clientFrodoUnknowGenderFromatted = formatClient(
  clientFrodoUnkownGender
);
export const clientFrodoUnkownGenderNoDOBFormatted = formatClient(
  clientFrodoUnkownGenderNoDOB
);
export const clientHarmoineUnknowGenderNoDOBFormatted = formatClient(
  clientHarmoineUnknowGenderNoDOB
);
export const clientGandalfUnknowGenderFormatted = formatClient(
  clientGandalfUnknowGender
);
