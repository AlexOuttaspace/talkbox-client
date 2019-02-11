import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Form, Field } from 'react-final-form'
import { lighten } from 'polished'

import { PlusIcon } from 'src/ui/atoms'

const Root = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
`

const Input = styled.input`
  flex-grow: 1;
  height: 100%;
  padding-left: 8px;
  border: none;
  background: none;

  :focus {
    box-shadow: none;
  }
`

const UploadButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;

  border-right: 1.5px solid ${(p) => p.theme.gray300};
  flex-shrink: 0;

  width: 44px;
  height: 100%;
  border-top-left-radius: 4.5px;
  border-bottom-left-radius: 4.5px;

  svg {
    fill: ${(p) => p.theme.gray500};
  }

  :hover,
  :focus {
    background-color: ${(p) => lighten(0.2, p.theme.green)};
    svg {
      fill: ${(p) => p.theme.white};
    }
  }
`

const FormRoot = styled.form`
  width: 100%;
  height: 44px;
  margin: 0 1.125rem;

  display: flex;

  border: 1.5px solid ${(p) => p.theme.gray300};
  border-radius: 6px;

  :focus-within {
    outline: none;
    box-shadow: none;
    border-color: ${(p) => p.theme.gray500};

    ${UploadButton} {
      border-color: ${(p) => p.theme.gray500};
    }
  }
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
            <UploadButton type="button">
              <PlusIcon withCircle={false} />
            </UploadButton>
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
