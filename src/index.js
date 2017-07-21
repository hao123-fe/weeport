import React from 'react'
import ReactDOM from 'react-dom'
import App from '@/components/App.js'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from '@/store/reducers.js'
import '@/stylus/main.styl'

const $root = document.createElement('div')
$root.classList.add('root')
document.body.appendChild($root)

ReactDOM.render(<Provider store={createStore(reducer)}><App /></Provider>, $root)
