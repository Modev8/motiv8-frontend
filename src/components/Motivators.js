import React from "react";
import itemData from "../testData/newsItems.json";
import quoteData from "../testData/quotes.json"
import Music from "./Music";
import Images from "./Images";
import Quotes from "./Quotes";
import Buttons from "./Buttons";
import { withAuth0 } from "@auth0/auth0-react";
import { Container, Col, Row } from "react-bootstrap";

class Motivators extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newsItems: itemData.items,
            quotes: quoteData.data,
            images: []
        }
    }

    render() {
        console.log('items that live in state in Motivators', this.state)
        return (
            <Container>
                <Images images={this.state.images} />
                <Quotes quotes={this.state.quotes} />
                <Row>
                    <Col>sm=8</Col>
                    <Col>sm=4</Col>
                </Row>
                <Row>
                    <Col><Music newsItems={this.state.newsItems} /></Col>
                    <Col><Buttons /></Col>
                    <Col>sm=true</Col>
                </Row>
            </Container>
        )
    }
}

export default withAuth0(Motivators);