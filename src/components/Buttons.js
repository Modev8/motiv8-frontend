import React from "react";
import { Button, Row } from "react-bootstrap";


class Buttons extends React.Component {
    render() {
        console.log('props that live in the Buttons component', this.props)
        return (
            <div className="custom-buttons">
                <Row>
                    <Button variant="primary" onClick={this.props.getZenQuotes}>Find More Quotes</Button>
                </Row>
                {/* <Row>
                    <Button variant="warning" onClick={this.props.deleteQuote}>👎</Button> //this button needs to move to Profile
                </Row> */}
                {/* <Row>
                    <Button variant="success" >Get Videos</Button>
                </Row>
                <Row>
                    <Button variant="danger">Find Motiv8tors</Button>
                </Row>
                <Row>
                    <Button variant="info">Placeholder</Button>
                </Row> */}
            </div>
        )
    }
}

export default Buttons;