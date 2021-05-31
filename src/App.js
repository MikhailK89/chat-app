import './App.css'

import {
  BrowserRouter as Router,
  Switch,
  Route
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

            <Route path="/user/:id">
              <Chat />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  )
}
