import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'react-final-form'

import { Input, ValidationError } from '../atoms'

export const FormField = ({ placeholder, name, type }) => (
  <Field name={name}>
    {({ input, meta }) => (
      <Fragment>
        <Input type={type} {...input} placeholder={placeholder} />
        <ValidationError>{meta.touched && meta.error}</ValidationError>
      </Fragment>
    )}
  </Field>
)

FormField.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}

FormField.defaultProps = {
  placeholder: ''
}
