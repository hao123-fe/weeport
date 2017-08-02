import React from 'react'
import PropTypes from 'prop-types'

// export default props => <div {...props} className={'placeholder'}>{props.children}</div>

const Component = props => <div {...props} className={'placeholder'}>{props.children}</div>

Component.propTypes = {
  children: PropTypes.string
}

export default Component
