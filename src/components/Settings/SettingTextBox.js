import React from 'react'
import PropTypes from 'prop-types'
import {TextBox} from 'react-uwp'

const Component = props => <div className={'form-control'}>
  <label className={'input-label'}>{props.label}</label>
  <TextBox value={props.value} placeholder={props.placeholder} onChange={props.onChange} />
</div>

Component.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string
}

export default Component
