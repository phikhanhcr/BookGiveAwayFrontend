import React, { PureComponent } from "react";
import Home from './component/Home'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './component/Login/Login'
import MyStore from "./component/Store/MyStore";
import { CartProvider, CartContext } from './component/Context/ContextCart'
import MyCart from "./component/Cart";
import SettingProfile from './component/Store/Profile/SettingProfile'

class App extends PureComponent {
  constructor(props) {
    super(props)
    var currentUser = localStorage.getItem('token')
    console.log(currentUser)
    this.state = {
      currentUser: currentUser
    }
  }

  render() {
    const { currentUser } = this.state;
    let current = currentUser;
    if (currentUser === null) {
      current = "Login"
    }
    return (
      <CartProvider>
        <Router>
          <div className="Menu-top">
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/store">Give away</Link>
                </li>
                <CartContext.Consumer>
                  {
                    ({ cartItems }) => (
                      <li>
                        <Link to="/cart">Cart {cartItems.length}</Link>
                      </li>
                    )
                  }
                </CartContext.Consumer>
              </ul>
            </nav>

            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/store">
                <MyStore />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/cart">
                <MyCart />
              </Route>
              <Route exact path="/store/profile">
                <SettingProfile />
              </Route>
            </Switch>
          </div>
        </Router>
      </CartProvider>

    );
  }
}

export default App;
