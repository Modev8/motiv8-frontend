import React from "react";
import { withAuth0 } from "@auth0/auth0-react";
// import { ListGroup } from "react-bootstrap";

class Music extends React.Component {
    render() {
        return (
            <>
                {/* <ListGroup style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {this.props.newsItems.map((item, index) => (
                        <ListGroup.Item key={index}>{item}</ListGroup.Item>
                    ))}
                </ListGroup> */}
            </>
        )
    }
}

export default withAuth0(Music);