import React, { PureComponent } from "react";
import { CartContext } from '../component/Context/ContextCart';
import { Card, Button } from "antd";

const { Meta } = Card;


class Books extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  componentDidMount() {
    this.setState({
      loading: false
    });
  }

  bookCurrent = (event) => {
    return () => {
      console.log(event)
    } 
  }

  render() {
    const { book } = this.props;
    const { loading } = this.state;
    return (
      <div className="Book col-lg-3 col-sm-6 col-12">
        <Card
          hoverable
          cover={<img className="img-avatar" alt="example" src={book.avatar} />}
        >
          <Meta
            className="mb-2"
            title={book.name}
            description={book.type}
          />
          <Button onClick={this.bookCurrent(this)} type="default" href="#">
            View
          </Button>
          <CartContext.Consumer>
            {
              ({ addToCart }) => <Button
                style={{ marginLeft: 15 }}
                onClick={() => addToCart(book)}
                type="default" href="#"
              >
                Add to cart
            </Button>
            }
          </CartContext.Consumer>

        </Card>
      </div>
    );
  }
}

export default Books;
