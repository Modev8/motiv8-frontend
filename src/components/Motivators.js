
import { Component } from "react";
import axios from "axios";
import Images from "./Images";
import Quotes from "./Quotes";
import Buttons from "./Buttons";
import Comments from "./Comments";
import ProductivityScore from "./ProductivityScore";
import CumulativeScore from "./CumulativeScore";
import Loved from "./Loved";
import { Container, Col, Row } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";
import { withAuth0 } from "@auth0/auth0-react";
import Vids from "./Vids";


class Motivators extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quotes: [],
            currentVids: false,
            motivation: null,
            videos: [],
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

    handleSubmit = (e) => {
        e.preventDefault();
        const Answer = { dailyMotivation: e.target.dailyMotivation.value }
        this.setState({ motivation: Answer.dailyMotivation }, () => console.log(this.state.motivation));
        this.displayVids();

    }

    displayVids = (e) => {
        let url = `${process.env.REACT_APP_SERVER}/shorts?q=${this.state.motivation}`;
        axios.get(url)
            .then(res => {
                const vids = res.data.data;
                this.setState({ videos: vids, currentVids: true }, () => console.log(this.state.videos));
            })
            .catch(err => {
                let oops = err.message;
                this.setState({ error: oops })
            })
    }

    render() {
        const vidsArr = this.state.videos.map((vid, idx) =>
            <Vids 
            key={idx}
            name= {vid.name}
            description = {vid.description}
            url = {vid.content.url}
            width = {vid.content.width}
            height = {vid.content.height}
            />)
        return (
            <>
                {
                    this.state.currentVids
                        ?      <Container>
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
                        {vidsArr}
                    </Col>
                    <Col>
                        <Buttons />
                    </Col>
                    <Col>
                        <Loved />
                    </Col>
                </Row>
            </Container>
                        : <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="dailyMotivation">
                                <Form.Control type="text" placeholder="What are you trying to find motivation for today?" />
                            </Form.Group>
                            <Button type="submit">Motiv8 Me</Button>
                        </Form>

                }
            </>
        )
    }
}

export default withAuth0(Motivators);
