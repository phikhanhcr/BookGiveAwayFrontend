import React, { PureComponent } from "react";
import axios from "axios";
import "../App.css";
import { Input } from "antd";
import removeDuplicate from '../removeDuplicate'
import Book from "./Book";

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      allBook: [],
      bookFind: [],
      inputSearch: "",
      cart: 0,
      typeOfBook: []
    };
  }
  async getDataBook() {
    axios.get('http://localhost:3001/api/store', //proxy uri
      {
        headers: {
          authorization: ' oke em oi',
          'Content-Type': 'application/json'
        }
      }).then(res => {
        const allStore = res.data;
        console.log(allStore)
        const allBook = allStore.map(ele => {
          return ele.myBook
        }).reduce((a, b) => {
          return a.concat(b)
        } ,[])
        console.log(allBook)
        this.setState({
          allBook: allBook
        })
        const typeBook = allBook.map(ele => ele.type)
        this.setState({
          typeOfBook: removeDuplicate(typeBook)
        })
      }).catch(err => {
        console.log(err)
      })
  }
  componentDidMount() {
    return this.getDataBook();
  }
  SearchBook(value) {
    this.setState({
      inputSearch: value
    });
    console.log(value);
  }



  selectKind = (event) => {
    const type = event.target.value;
    const allBook = this.state.allBook;
    console.log(allBook)
    const findBook = allBook.filter(ele => {
      return ele.type === type
    });
    console.log(findBook)
    this.setState({
      bookFind: findBook,
      inputSearch : type
    });

  }
  render() {
    const { Search } = Input;
    const { allBook, inputSearch, bookFind, typeOfBook } = this.state;
    return (
      <div className="Home">
        <div className="container">
          <div className="wrapper-search">
            <Search
              type="text"
              placeholder="để làm cảnh chứ chả có tác dụng cmm gì đâu "
              style={{ width: 350 }}
            />
            <select className="form-control" onChange={this.selectKind}>
              <option>All</option>
              {
                typeOfBook.length && typeOfBook.map((ele, index) =>
                  <option key={index}>{ele}</option>
                )
              }
            </select>
          </div>
          <div className="row">
            {inputSearch === 'All' || inputSearch === ""
              ? allBook.length &&
              allBook.map((ele, index) => <Book key={index} book={ele} />)
              : bookFind.length &&
              bookFind.map((ele, index) => <Book key={index} book={ele} />)}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
