import { curry } from 'ramda'
import { setIn } from 'final-form'

const yupToFormErrors = (yupError) => {
  let errors = {}
  for (let err of yupError.inner) {
    if (!errors[err.path]) {
      errors = setIn(errors, err.path, err.message)
    }
  }

  return errors
}

export const validateForm = curry(async ({ schema, context = {} }, values) => {
  try {
    let validateData = {}

    for (let k in values) {
      if (values.hasOwnProperty(k)) {
        const key = String(k)
        validateData[key] = values[key] !== '' ? values[key] : undefined
      }
    }

    await schema.validate(validateData, {
      abortEarly: false,
      context
    })
  } catch (error) {
    return yupToFormErrors(error)
  }
})

// accepts an array of errors in format of [ { path: String, message: String } ]
// ouputs them in format: { path: message, anotherPath: anotherMessage }
// this format is accepted as a return value of onSubmit function for react-final-form
export const handleServerErrors = (errors) =>
  errors.reduce((acc, error) => {
    acc[error.path] = error.message
    return acc
  }, {})
