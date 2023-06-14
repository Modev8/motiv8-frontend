import React from "react";
import { Button, Row } from "react-bootstrap";


class Buttons extends React.Component {
    render() {
        return (
            <div className="custom-buttons">
                <Row>
                    <Button variant="primary">Get Quotes</Button>
                </Row>
                <Row>
                    <Button variant="success">Get Videos</Button>
                </Row>
                <Row>
                    <Button variant="warning">Get Images</Button>
                </Row>
                <Row>
                    <Button variant="danger">Find Motiv8tors</Button>
                </Row>
                <Row>
                    <Button variant="info">Placeholder</Button>
                </Row>
            </div>
        )
    }
}

export default Buttons;