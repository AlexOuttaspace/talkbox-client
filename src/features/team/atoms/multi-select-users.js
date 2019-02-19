import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Select from 'react-select'

const StyledSelect = styled(Select)`
  width: 100%;
  margin-bottom: 2rem;
`

export const MultiSelectUser = ({ name, options, value, onChange }) => {
  return (
    <StyledSelect
      instanceId={42} // needed for SSR https://github.com/JedWatson/react-select/issues/2629
      isMulti
      name={name}
      options={options}
      value={value}
      onChange={onChange}
    />
  )
}

MultiSelectUser.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
}
