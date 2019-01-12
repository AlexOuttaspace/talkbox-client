import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'
import { compose } from 'ramda'
import { graphql } from 'react-apollo'

import { Router } from 'server/routes'
import { validateForm, handleServerErrors } from 'src/lib'
import { createTeamSchema, storeTokensInCookie } from 'src/common'
import { createTeamMutation, meQuery } from 'src/services'
import { FormHeader, FormField } from 'src/ui/molecules'
import { SubmitButton } from 'src/ui/atoms'
import { FormRoot } from 'src/ui/templates'

const onSubmit = async (createTeamMutation, values) => {
  try {
    const { name } = values
    const {
      data: {
        createTeam: { ok, errors }
      }
    } = await createTeamMutation({
      variables: { name },
      update: (
        store,
        {
          data: {
            createTeam: { team, ok }
          }
        }
      ) => {
        if (!ok || !team) return

        try {
          const data = store.readQuery({ query: meQuery })
          data.me.teams.push(team)

          store.writeQuery({ query: meQuery, data })
        } catch (error) {
          // if cache is empty apollo throws error. for now there's no any other way to handle it.
        } finally {
          return Router.pushRoute(
            `/team/${team.id}/channel/${team.channels[0].id}`
          )
        }
      }
    })

    if (!ok) return handleServerErrors(errors)
  } catch (error) {
    if (error.message.includes('Not authenticated')) {
      storeTokensInCookie(null, null)
      return Router.pushRoute('/login')
    }
    console.log(error)
    // TODO: add handling for error that can occured due to network problems
  }
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
