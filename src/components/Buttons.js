import React from "react";
import { Button, Row } from "react-bootstrap";


class Buttons extends React.Component {
    render() {
        return (
            <>
                <Row>
                    <Button variant="primary">Accomplishments</Button>
                </Row>
                <Row>
                    <Button variant="success">Find Motiv8tors</Button>
                </Row>
                <Row>
                    <Button variant="warning">Get Motivational Content</Button>
                </Row>
                <Row>
                    <Button variant="danger">Placeholder</Button>
                </Row>
                <Row>
                    <Button variant="info">Placeholder</Button>
                </Row>
            </>
        )
    }
}

export default Buttons;