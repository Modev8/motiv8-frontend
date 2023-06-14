import React from "react";
import { Card} from "react-bootstrap";
import { withAuth0 } from "@auth0/auth0-react";

class Quotes extends React.Component {
    render() {
        return (
            <>
                    <Card style={{ maxWidth: '40rem' }}>
                        {
                            this.props.quotes.map((item, idx) =>
                                <Quote key={idx} itemData={item} />)
                        }
                    </Card>
            </>
        )
    }
}

class Quote extends React.Component {
    render() {
        console.log('items that live in the quote component', this.props)
        return (
            <>
                <Card.Header>Quote</Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                        <p>
                            {' '}
                            {this.props.itemData.quoteText}
                            {' '}
                        </p>
                        <footer className="blockquote-footer">
                            {this.props.itemData.quoteAuthor}
                        </footer>
                    </blockquote>
                </Card.Body>
            </>
        )
    }
}
export default withAuth0(Quotes);