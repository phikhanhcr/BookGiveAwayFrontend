import React, { PureComponent } from 'react';
import { CartContext } from './Context/ContextCart'
import { Card, Button } from "antd";

const { Meta } = Card;

class MyCart extends PureComponent {
  render() {
    return (
      <div className="container">
        <div className="row">
          <CartContext.Consumer>
            {
              ({ cartItems, removeItem }) =>
                cartItems.map((ele, index) =>
                <div className="Book col-lg-3 col-sm-6 col-12">
                  <Card
                    hoverable
                    cover={<img className="img-avatar" alt="example" src={ele.avatar} />}
                  >
                    <Meta
                      className="mb-2"
                      title={ele.name}
                      description={ele.type}
                    />
                    <Button type="default">
                      Remove
                    </Button>
                  </Card>
                  </div>
                )
            }
          </CartContext.Consumer>
        </div>
      </div>
    );
  }
}

export default MyCart;