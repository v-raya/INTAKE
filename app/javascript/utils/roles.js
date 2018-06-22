import {
  ROLE_TYPE_REPORTER,
  ROLE_TYPE_NON_REPORTER,
} from 'enums/RoleType'

export const hasReporter = (roles) =>
  roles.some((role) => ROLE_TYPE_REPORTER.includes(role))
export const hasNonReporter = (roles) =>
  roles.some((role) => ROLE_TYPE_NON_REPORTER.includes(role))
