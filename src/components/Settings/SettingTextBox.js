import React from 'react'
import {TextBox} from 'react-uwp'

export default props => <div style={{marginTop: '10px'}}>
  <label className="input-label">{props.label}</label>
  <TextBox value={props.value} onChange={props.onChange}/>
</div>