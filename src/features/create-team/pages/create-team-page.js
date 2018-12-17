import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Form } from 'react-final-form'
import { compose } from 'ramda'
import { graphql } from 'react-apollo'

import { validateForm } from 'src/lib'
import { createTeamSchema } from 'src/common'
import { createTeamMutation } from 'src/services'
import { FormHeader, FormField } from 'src/ui/molecules'
import { SubmitButton } from 'src/ui/atoms'
import { FormRoot } from 'src/ui/templates'

const onSubmit = async (createTeamMutation, values) => {
  console.log('asd')
  try {
    const { name } = values
    const response = await createTeamMutation({ variables: { name } })

    console.log(response)
  } catch (error) {} // TODO: add handling of a bad response
}

export const CreateTeamPageView = ({ createTeamMutation }) => (
  <main>
    <Form
      subscription={{ submitting: true }}
      validate={validateForm({ schema: createTeamSchema })}
      onSubmit={(values) => onSubmit(createTeamMutation, values)}
    >
      {({ handleSubmit }) => (
        <FormRoot onSubmit={handleSubmit}>
          <FormHeader mainHeading={'Create a new team'} />

          <FormField name="name" type="text" placeholder="Team name" />

          <SubmitButton type="submit">Submit</SubmitButton>
        </FormRoot>
      )}
    </Form>
  </main>
)

CreateTeamPageView.propTypes = {
  createTeamMutation: PropTypes.func.isRequired
}

const enhance = compose(
  graphql(createTeamMutation, { name: 'createTeamMutation' })
)

export const CreateTeamPage = enhance(CreateTeamPageView)
