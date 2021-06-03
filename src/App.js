import './App.css'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import {Provider} from 'react-redux'
import store from './redux/store'

import Chat from './components/pages/chat/Chat'
import Auth from './components/pages/auth/Auth'

export default function App() {
  return (
    <Router>
      <div className="app">
        <div className="container">
          <Switch>
            <Route path="/auth">
              <Provider store={store}>
                <Auth />
              </Provider>
            </Route>

            <Route path="/users/:id">
              <Provider store={store}>
                <Chat />
              </Provider>
            </Route>

            <Redirect from="/" to="/auth" />
          </Switch>
        </div>
      </div>
    </Router>
  )
}
