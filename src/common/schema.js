import * as yup from 'yup'

export const required = 'field is required'

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

export const registerSchema = yup.object().shape({
  email,
  password,
  passwordConfirmation
})
