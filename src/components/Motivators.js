import { Component } from "react";
import quoteData from "../testData/quotes.json"
import Images from "./Images";
import Quotes from "./Quotes";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { withAuth0 } from "@auth0/auth0-react";
import Vids from "./Vids";

class Motivators extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentVids: false,
            motivation: null,
            quotes: quoteData.data,
            videos: [],
            images: []
        }
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
                        ? <>
                            {vidsArr}
                            <Images images={this.state.images} />
                            <Quotes quotes={this.state.quotes} />
                        </>
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
