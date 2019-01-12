import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Form, Field } from 'react-final-form'

const Root = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
`

const Input = styled.input`
  width: 100%;
  height: 44px;
  padding-left: 8px;

  border: 1.5px solid ${(p) => p.theme.gray300};
  border-radius: 6px;

  :focus {
    outline: none;
    box-shadow: none;
    border-color: ${(p) => p.theme.gray500};
  }
`

const FormRoot = styled.form`
  width: 100%;
  margin: 0 1.125rem;
`

export const MessageInput = ({ placeholder, onSubmit }) => {
  return (
    <Root>
      <Form subscription={{ submitting: true }} onSubmit={onSubmit}>
        {({ handleSubmit, form: { reset } }) => (
          <FormRoot
            autoComplete="off"
            onSubmit={(event) => {
              handleSubmit(event)
              reset()
            }}
          >
            <Field name="message">
              {({ input }) => (
                <Input type="text" {...input} placeholder={placeholder} />
              )}
            </Field>
          </FormRoot>
        )}
      </Form>
    </Root>
  )
}

MessageInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}
