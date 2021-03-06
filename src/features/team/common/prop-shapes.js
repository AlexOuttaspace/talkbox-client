import PropTypes from 'prop-types'

export const channel = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
}).isRequired

export const user = PropTypes.shape({
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired
})

export const team = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
})

export const message = PropTypes.shape({
  created_at: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  text: PropTypes.string,
  url: PropTypes.string,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
  })
})
