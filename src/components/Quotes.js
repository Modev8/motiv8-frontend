import React from "react";
import { Card, Button} from "react-bootstrap";
import { withAuth0 } from "@auth0/auth0-react";

class Quotes extends React.Component {

    render() {
        // console.log('this.props.quotes contains', this.props.quotes)
        // const quoteInfo = this.props.quotes;
        return (
            <>
                {
                    this.props.quotes.map((item, idx) =>
                        <Card>
                            <Card.Header>Quote #{idx + 1}</Card.Header>
                            <Card.Body>
                                <blockquote className="blockquote mb-0">
                                    <p>
                                        {' '}
                                        {item.quote}
                                        {' '}
                                    </p>
                                    <footer className="blockquote-footer">
                                        <cite>{item.author}</cite>
                                    </footer>
                                </blockquote>
                            <Button onClick={ () => this.props.addQuote(item.author)}>❤️</Button>
                            </Card.Body>
                        </Card>)}

            </>
        )
    }
}
// class Quote extends React.Component {
//     render() {
//         console.log('items that live in the quote component', this.props)
//         return (
//             <>
//             </>
//         )
//     }
// }
export default withAuth0(Quotes);