import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import { store, persistor } from './store'
import Routes from './routes'
import { PersistGate } from 'redux-persist/integration/react'

// establishes socket connection
import './socket'

console.log('store', store)

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Routes />
    </PersistGate>
  </Provider>,
  document.getElementById('app')
)
