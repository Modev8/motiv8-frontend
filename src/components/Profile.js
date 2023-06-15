import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';

class Profile extends React.Component {
  render() {
    const { isAuthenticated, user } = this.props.auth0;
    return (
      isAuthenticated && (
        <>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </>
      )
    );
  }
}

export default withAuth0(Profile);
