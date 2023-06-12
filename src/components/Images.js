import React from "react";
import { withAuth0 } from "@auth0/auth0-react";

class Images extends React.Component {
    render() {
        return (
            <>
                {this.props.images}
            </>
        )
    }
}

export default withAuth0(Images);