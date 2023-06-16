import React from 'react';
import './App.css';
import Header from './components/Header';
import Profile from './components/Profile';
import Home from './components/Home';
import axios from "axios";
import Data from "./testData/images.json"
import Motivators from './components/Motivators';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { withAuth0 } from '@auth0/auth0-react';
import Photo from './components/Photo';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userQuotes: [],
      carouselImages: Data.images,
      singleQuote: {}
    }
  }

  getToken = () => {
    return this.props.auth0.getIdTokenClaims()
      .then(res => res.__raw)
      .catch(err => console.error(err))
  }

  //this route hits the server and then grabs previously liked quotes from the user's db
  getQuotes = async () => {
    try {
      const jwt = await this.getToken();
      const config = {
        headers: { 'Authorization': `Bearer ${jwt}` }
      };
      const quoteData = await axios.get(`${process.env.REACT_APP_SERVER}/quotes`, config);
      console.log('in try catch',quoteData)
      this.setState({ userQuotes: quoteData.data });
    } catch (err) {
      console.error(err);
    }
  }

  deleteQuote = async (unlikeQuote) => {
    try {
        const res = await this.props.auth0.getIdTokenClaims();
        const jwt = res.__raw;
        const config = {
            headers: { 'Authorization': `Bearer ${jwt}` }
        }
        const url = `${process.env.REACT_APP_SERVER}/quotes/${unlikeQuote._id}`;
        await axios.delete(url, config);
        const updatedQuotes = this.state.userQuotes.filter(quote => quote._id !== unlikeQuote._id);
        this.setState({userQuotes: updatedQuotes});
    } catch(error) {
        console.error(error)
    }
}




  render() {
    const { isAuthenticated } = this.props.auth0;
    const {carouselImages, userQuotes} = this.state;
    return (
      <>
        <Router>
          <Header />
          <Routes>
            <Route
              exact
              path="/"
              element={
                !isAuthenticated
                  ? <Home />
                  : <Motivators
                    getToken={this.getToken} />
                  }></Route>
            {/* <Route
              path="/motivators"
              element={isAuthenticated && <Motivators />}
            >
            </Route> */}
            <Route
              // onClick={this.getQuotes}
              
              path="/profile"
              element={
                isAuthenticated
                && <Profile
                  carouselImages={carouselImages}
                  getQuotes={this.getQuotes}
                  getToken={this.getToken}
                  userQuotes={userQuotes} 
                  deleteQuote={this.deleteQuote}/>
              }
            ></Route>
          </Routes>
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
