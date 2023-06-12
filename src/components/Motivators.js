import React from "react";
import itemData from "../testData/newsItems.json";
import quoteData from "../testData/quotes.json"
import Music from "./Music";
import Images from "./Images";
import Quotes from "./Quotes";
import { withAuth0 } from "@auth0/auth0-react";

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
            <>
                <Music newsItems={this.state.newsItems} />
                <Images images={this.state.images} />
                <Quotes quotes={this.state.quotes} />
            </>
        )
    }
}

export default withAuth0(Motivators);