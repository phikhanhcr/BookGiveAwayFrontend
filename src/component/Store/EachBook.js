import React, { PureComponent } from 'react';
import { Card, Button } from "antd";
const { Meta } = Card

class EachBook extends PureComponent {
  constructor(props) {
    super(props)
  }
  
  render() {
    const { item, onClickRemove, userCurrent } = this.props;
    return (
      <div className="Book col-lg-4 col-12">
        <Card
          hoverable
          cover={<img className="img-avatar" alt="example" src={item.avatar} />}
        >
          <Meta
            className="mb-2"
            title={item.name}
            description={item.type}
          />
          {/* href= {`/cart/`+ userCurrent + "/" + item._id} */}
          <Button type="default" onClick={onClickRemove} >
            Remove
          </Button>
        </Card>
      </div>
    );
  }
}

export default EachBook;