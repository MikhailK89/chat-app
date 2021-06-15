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
import Register from './components/pages/register/Register'

export default function App() {
  return (
    <Router>
      <div className="app">
        <div className="container">
          <Provider store={store}>
            <Switch>
              <Route path="/auth">
                <Auth />
              </Route>

              <Route path="/register">
                <Register />
              </Route>

              <Route path="/users/:id">
                <Chat />
              </Route>

              <Redirect from="/" to="/auth" />
            </Switch>
          </Provider>
        </div>
      </div>
    </Router>
  )
}
