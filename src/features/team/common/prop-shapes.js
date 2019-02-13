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
  text: (props, propName, componentName) => {
    if (!props.text && !props.url) {
      return new Error(
        `One of props 'text' or 'url' was not specified in '${componentName}'.`
      )
    }

    if (props.text && typeof props.text !== 'string') {
      return new Error(
        `Invalid prop ${propName} of type ${typeof props.text} supplied to ${componentName}. Should be string`
      )
    }
  },

  url: (props, propName, componentName) => {
    if (!props.text && !props.url) {
      return new Error(
        `One of props 'url' or 'text' was not specified in '${componentName}'.`
      )
    }

    if (props.url && typeof props.url !== 'string') {
      return new Error(
        `Invalid prop ${propName} of type ${typeof props.url} supplied to ${componentName}. Should be string`
      )
    }
  },
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
  })
})
