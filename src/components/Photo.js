import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Button } from 'react-bootstrap';

class Photo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      photos: [],
    };
  }

  updateSearchQuery = (e) => this.setState({ searchQuery: e.target.value });

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log(this.state.searchQuery);
    try {
      const API = process.env.REACT_APP_SERVER;
      const url = `${API}/photos`;

      console.log(url);

      const response = await axios.get(url, {
        params: { searchQuery: this.state.searchQuery },
      });
      console.log(response);
      this.setState({ photos: response.data });
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="searchQuery">
            <Form.Label>Find Photos About...</Form.Label>
            <Form.Control
              onChange={this.updateSearchQuery}
              type="text"
              placeholder="Enter a search term"
            />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>

        {/* {this.state.photos.length > 0 &&
          this.state.photos.map((photo, idx) => (
            <div key={idx}>
              {photo.img_url && (
                <a href={photo.original_image}>
                  <img
                    alt={this.state.searchQuery}
                    width={200}
                    src={photo.img_url}
                  />
                </a>
              )}

              <span>photo by: {photo.photographer} from unsplash</span>
            </div>
          ))} */}
        {this.state.photos.length > 0 &&
          this.state.photos.map((photo, idx) => (
            <div key={idx}>
              {photo.imageURL && (
                <a href={photo.imageURL}>
                  <img
                    alt={photo.description}
                    width={200}
                    src={photo.imageURL}
                  />
                </a>
              )}
              <span>photo by: {photo.creator}</span>
            </div>
          ))
        }
      </>
    );
  }
}

export default Photo;
