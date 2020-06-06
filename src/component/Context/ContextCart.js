import React, { PureComponent } from 'react';
export const CartContext = React.createContext();
export class CartProvider extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: []
    }
  }
  addToCart = (book) => {
    this.setState({
      cartItems: this.state.cartItems.concat(book)
    })
    console.log(book)
  }
  removeItem = (book) => {
    console.log(book)
  }
  render() {

    return (
      <CartContext.Provider value={{
        cartItems: this.state.cartItems,
        addToCart: this.addToCart,
        removeItem : this.removeItem
      }}>
        {
          this.props.children
        }
      </CartContext.Provider>
    );
  }
}