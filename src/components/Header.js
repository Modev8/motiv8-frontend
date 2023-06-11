import React from "react";
import { withAuth0 } from "@auth0/auth0-react";
import LoginButton from "./Login";
import LogoutButton from "./Logout";

class Header extends React.Component{
    render(){
        const {isAuthenticated} = this.props.auth0;
        return(
            <>
                {isAuthenticated ? <LogoutButton/> : <LoginButton/>}
            </>
        )
    }
}

export default withAuth0(Header);