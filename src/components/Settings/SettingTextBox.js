import React from 'react'
import PropTypes from 'prop-types'
import {TextBox} from 'react-uwp'

const Component = props => <div style={{marginTop: '10px'}}>
  <label className={'input-label'}>{props.label}</label>
  <TextBox value={props.value} onChange={props.onChange} />
</div>

Component.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.number
}

export default Component
