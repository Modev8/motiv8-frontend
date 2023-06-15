
import { Component } from "react";
import axios from "axios";
import Quotes from "./Quotes";
import Buttons from "./Buttons";
import Comments from "./Comments";
import Photo from "./Photo";
import images from "../testData/images.json";
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
            staticImages: images.images,
            videos: [],
            singleQuote: {}
        }
    }

    //this route hits the server and then grabs previously liked quotes from the user's db
    componentDidMount(){
        this.getQuotes();
    }

    getToken = () => {
        return this.props.auth0.getIdTokenClaims()
            .then(res => res.__raw)
            // .then(token => console.log(token))
            .catch(err => console.error(err))
    }

    //this route hits the server and then Zen Quotes API
    getZenQuotes = () => {
        this.getToken()
            .then(jwt => {
                const config = {
                    headers: { 'Authorization': `Bearer ${jwt}` }
                }
                return axios.get(`${process.env.REACT_APP_SERVER}/zenquotes`, config)
            })
            .then(quoteData => this.setState({ quotes: quoteData.data.data }))
            .catch(err => console.error(err));
    }

    addQuote = (likedQuote) => {
        const addedQuote = this.state.quotes.filter(quoteObj => quoteObj.quote === likedQuote);
        console.log(addedQuote);
        this.setState({singleQuote: addedQuote}, () => console.log(this.state.singleQuote));

        this.getToken()
            .then(jwt => {
                const config = {
                    headers: { 'Authorization': `Bearer ${jwt}` }
                }
                return axios.post(`${process.env.REACT_APP_SERVER}/quotes`, addedQuote[0], config)
            })
            .catch(err => console.error(err));
    }

    deleteQuote = (unlikedQuote) => {
        const updatedQuotes = this

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
                name={vid.name}
                description={vid.description}
                url={vid.content.url}
                width={vid.content.width}
                height={vid.content.height}
            />)

        return (
            <>
                {
                    this.state.currentVids

                        ? <>
                            <Quotes
                                quotes={this.state.quotes}
                                addQuote={this.addQuote} 
                                images={this.state.staticImages}/>
                            <Buttons getQuotes={this.getQuotes} />
                            <Photo />
                            {vidsArr}
                            <Comments />
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
