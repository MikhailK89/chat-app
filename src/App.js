import './App.css'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import Chat from './components/pages/chat/Chat'
import Auth from './components/pages/auth/Auth'

export default function App() {
  return (
    <Router>
      <div className="app">
        <div className="container">
          <Switch>
            <Route path="/auth">
              <Auth />
            </Route>

            <Route path="/users/:id">
              <Chat />
            </Route>

            <Redirect from="/" to="/auth" />
          </Switch>
        </div>
      </div>
    </Router>
  )
}
