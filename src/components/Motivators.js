import React from "react";
import axios from "axios";
import itemData from "../testData/newsItems.json";
import Music from "./Music";
import Images from "./Images";
import Quotes from "./Quotes";
import Buttons from "./Buttons";
import Comments from "./Comments";
import ProductivityScore from "./ProductivityScore";
import CumulativeScore from "./CumulativeScore";
import Loved from "./Loved";
import { withAuth0 } from "@auth0/auth0-react";
import { Container, Col, Row } from "react-bootstrap";

class Motivators extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newsItems: itemData.items,
            quotes: [],
            images: []
        }
    }

    getToken = () => {
        return this.props.auth0.getIdTokenClaims()
        .then(res => res.__raw)
        .catch(err => console.error(err))
    }

    getQuotes = () => {
        this.getToken()
        .then(jwt => {
            const config = {
                headers: {'Authorization': `Bearer ${jwt}`}
            }
            return axios.get(`${process.env.REACT_APP_SERVER}/quotes`, config)
        })
        .then(quoteData => this.setState({quotes: quoteData.data}))
        .catch(err => console.error(err));
    }

    render() {
        console.log('items that live in state in Motivators', this.state)
        return (
            <Container>
                <Row>
                    <Col>
                        <Row>
                            <Col>
                                <ProductivityScore />
                            </Col>
                            <Col>
                                <CumulativeScore />
                            </Col>
                        </Row>
                        <Row>
                            <Quotes quotes={this.state.quotes} />
                        </Row>
                        <Row>
                            <Images images={this.state.images} />
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Comments />
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Music newsItems={this.state.newsItems} />
                    </Col>
                    <Col>
                        <Buttons />
                    </Col>
                    <Col>
                        <Loved />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default withAuth0(Motivators);