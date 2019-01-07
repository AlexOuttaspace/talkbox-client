import * as yup from 'yup'

const ALPHANUMERIC_REGEXP = /^.[a-zA-Z0-9]+$/

export const required = 'field is required'

export const username = yup
  .string()
  .ensure()
  .required(required)
  .min(3, 'should be at least 3 characters')
  .matches(ALPHANUMERIC_REGEXP, 'can only contain letters and numbers')
  .max(16, 'should be at most 16 characters')

export const email = yup
  .string()
  .ensure()
  .required(required)
  .email('must be a valid email')

export const password = yup
  .string()
  .ensure()
  .required(required)
  .min(8, 'must be at least 8 characters')
  .max(24, 'must be at most 24 characters')

export const passwordConfirmation = yup
  .string()
  .ensure()
  .required(required)
  .oneOf([yup.ref('password'), null], "passwords don't match")
  .min(8)
  .max(24)

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .ensure()
    .required(required),
  password: yup
    .string()
    .ensure()
    .required(required)
})

export const registerSchema = yup.object().shape({
  username,
  email,
  password,
  passwordConfirmation
})

export const teamName = yup
  .string()
  .ensure()
  .required(required)
  .min(3, 'should be at least 3 characters')
  .matches(ALPHANUMERIC_REGEXP, 'can only contain letters and numbers')
  .max(30, 'should be at most 30 characters')

export const createTeamSchema = yup.object().shape({
  name: teamName
})

export const channelName = yup
  .string()
  .ensure()
  .required(required)
  .min(3, 'should be at least 3 characters')
  .matches(ALPHANUMERIC_REGEXP, 'can only contain letters and numbers')
  .max(30, 'should be at most 30 characters')

export const createChannelSchema = yup.object().shape({
  name: channelName
})
