import React from 'react';
import './App.css';
import Header from './components/Header';
// import Profile from './components/Profile';
import Home from './components/Home';
import Motivators from './components/Motivators';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { withAuth0 } from '@auth0/auth0-react';
// import Photo from './components/Photo';

class App extends React.Component {
  render() {
    const { isAuthenticated } = this.props.auth0;
    return (
      <>
        <Router>
          <Header />
          <Routes>
            <Route
              exact
              path="/"
              element={!isAuthenticated ? <Home /> : <Motivators />}
              // testing
              // element={isAuthenticated && <Photo />}
            >
            </Route>
            {/* <Route
              path="/motivators"
              element={isAuthenticated && <Motivators />}
            >
            </Route> */}
            {/* <Route
              path="/profile"
              element={isAuthenticated && <Profile />}
            ></Route> */}
          </Routes>
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
