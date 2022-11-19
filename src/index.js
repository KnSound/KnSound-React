import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store from './app/store'
import { injectStore } from "./app/interceptors/axios";
import { getUserDetails } from "./features/user/userActions";
injectStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
