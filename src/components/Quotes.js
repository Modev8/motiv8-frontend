import React from "react";
import { Card} from "react-bootstrap";
import { withAuth0 } from "@auth0/auth0-react";

class Quotes extends React.Component {
    render() {
        console.log('this.props.quotes contains', this.props.quotes)
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
                            {this.props.itemData.quote}
                            {' '}
                        </p>
                        <footer className="blockquote-footer">
                            {this.props.itemData.author}
                        </footer>
                    </blockquote>
                </Card.Body>
            </>
        )
    }
}
export default withAuth0(Quotes);