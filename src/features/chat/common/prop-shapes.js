import PropTypes from 'prop-types'

export const channel = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
}).isRequired

export const user = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
})
