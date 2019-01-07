import React from 'react'
import styled from 'styled-components'
import { lighten } from 'polished'
import { compose } from 'ramda'
import { intlShape, defineMessages } from 'react-intl'

import { ModalConsumer } from '../common'

import { withIntl } from 'src/common'
import { PlusIcon } from 'src/ui/atoms'

const i18n = defineMessages({
  inviteUsers: {
    id: 'sidebar.invite-users-button',
    defaultMessage: 'Invite users'
  }
})

const IconWrapper = styled.div`
  border: none;
  background: none;
  display: block;
  align-items: center;
  justify-content: center;
  padding: 4px;
  width: 24px;
  height: 24px;
  border-radius: 50%;

  svg {
    transition: fill 0.1s;
    fill: ${(p) => p.theme.purpleWhite};
  }
`

const Root = styled.button`
  cursor: pointer;
  display: block;
  border: none;
  background-color: transparent;
  color: inherit;
  width: 100%;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.75rem 0 1rem;
  font-size: 1rem;
  font-weight: 700;

  :hover {
    svg {
      fill: ${(p) => lighten(0.7, p.theme.purpleWhite)};
    }

    background-color: ${(p) => p.theme.purpleHover};
  }
`

const InviteUserButtonView = ({ intl }) => {
  return (
    <ModalConsumer>
      {(setModalComponentTo) => (
        <Root
          onClick={(e) => {
            e.target.blur()
            setModalComponentTo('invite-user')
          }}
        >
          {intl.formatMessage(i18n.inviteUsers)}
          <IconWrapper>
            <PlusIcon />
          </IconWrapper>
        </Root>
      )}
    </ModalConsumer>
  )
}

InviteUserButtonView.propTypes = {
  intl: intlShape
}

const enhance = compose(withIntl)

export const InviteUserButton = enhance(InviteUserButtonView)
