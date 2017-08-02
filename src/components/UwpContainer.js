import React from 'react'
import {Theme as UWPThemeProvider, getTheme} from 'react-uwp/Theme'
import Navigator from '@/components/Navigator.js'
import bg from '@/assets/bg.jpg'
import PropTypes from 'prop-types'

const Component = props => <UWPThemeProvider
  theme={getTheme({
    themeName: 'dark', // set custom theme
    accent: '#0aa770', // set accent color
    useFluentDesign: true, // sure you want use new fluent design.
    desktopBackgroundImage: bg // set global desktop background image
  })}
>
  <Navigator>
    {props.children}
  </Navigator>
</UWPThemeProvider>

Component.propTypes = {
  children: PropTypes.array
}

export default Component
