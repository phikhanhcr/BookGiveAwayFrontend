import React, { PureComponent } from 'react';
import { Card, Button } from "antd";
import { Input } from "antd";
import { Redirect } from 'react-router-dom'
import Axios from 'axios'
import './Store.css'
import MyProfile from './Profile/Profile';
import EachBook from './EachBook';
import { findAllByAltText } from '@testing-library/react';
const { Meta } = Card
class myStore extends PureComponent {
  constructor(props) {
    super(props);

    let loggedIn = true
    const token = localStorage.getItem('token')
    console.log(token);
    if (!token) {
      loggedIn = false
    }
    this.state = {
      loggedIn,
      myBook: [],
      createBook: false,
      name: "",
      author: "",
      type: "",
      IduserCurrent: "",
      removeSuccess : false
    }
  }
  async componentDidMount() {
    const userCurrent = localStorage.getItem('token')
    const dataUser = await Axios.get('http://localhost:3001/api/user')
    const allUser = dataUser.data;
    const needUser = allUser.filter(ele => {
      return ele.username === userCurrent
    })
    console.log(needUser)
    if(needUser.length) {
      this.setState({
        IduserCurrent: needUser[0]._id
      })
    }
    
    Axios.get('http://localhost:3001/api/store')
      .then(res => {
        let allStore = res.data;
        const currentStore = allStore.filter(ele => {
          return ele.boss === needUser[0]._id
        })
        console.log(currentStore)
        this.setState({
          myBook: currentStore[0].myBook
        })
      }).catch(err => {
        console.log(err)
      })
  }

  onClickCreate = () => {
    this.setState({
      createBook: !this.state.createBook
    })
  }

  displayButton = () => {
    if (this.state.createBook) {
      return <a href="#" onClick={this.onClickCreate} className="btn btn-outline-info">Hidden</a>
    } else {
      return <a href="#" onClick={this.onClickCreate} className="btn btn-outline-info">Create New</a>
    }
  }

  onChangeInput = event => {
    console.log(event.target.value)
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onSubmit = async event => {
    event.preventDefault();
    const userCurrent = localStorage.getItem('token')
    const dataUser = await Axios.get('http://localhost:3001/api/user')
    const allUser = dataUser.data;
    const needUser = allUser.filter(ele => {
      return ele.username === userCurrent
    })
    let newStore = {
      boss: needUser[0]._id,
      myBook: []
    }
    let newBook = {
      name: this.state.name,
      author: this.state.author,
      type: this.state.type
    }
    // nếu trong db store đã tồn tại thì ko thêm nữa , ngược lại thêm newStore
    const allStore = await Axios.get('http://localhost:3001/api/store')
    const checkStore = allStore.data.filter(ele => {
      return ele.boss === needUser[0]._id
    })
    if (!checkStore.length) {
      await Axios.post('http://localhost:3001/api/store', { newStore })
    }

    const id = needUser[0]._id;
    console.log(id)
    // put len 
    Axios.put(`http://localhost:3001/api/store/${id}`, { newBook })
      .then(async res => {
        console.log("success " + res)
      }).catch(err => {
        console.log("fail " + err);
      })
    this.setState({
      name: "",
      author: "",
      type: ""
    })
    // Axios.get(`http://localhost:3001/api/store/${id}`)
    //   .then(res => {
    //     console.log(res.data)
    //   }).catch(err => {
    //     console.log(err)
    //   })
  }




  onClickRemove = (item) => {
    return () => {
      const myBook = this.state.myBook;
      const index = myBook.indexOf(item)
      this.setState({
        myBook: [
          ...this.state.myBook.slice(0, index),
          ...myBook.slice(index + 1)
        ]
      })  
      Axios.delete(`http://localhost:3001/api/store/${this.state.IduserCurrent}/${item._id}`)
        .then(res => {
          console.log(res.data)
          this.setState({
            removeSuccess: true
          })
        }).catch(err => {
          console.log(err);
        })
    }
  }

  render() {
    const { Search } = Input;
    const { loggedIn, removeSuccess, createBook, myBook, name, author, type, IduserCurrent } = this.state;
    if (!loggedIn) {
      return <Redirect to="/login" />
    }
    let classNameCreate = "form-group createNewBook display";
    if (createBook) {
      classNameCreate = "form-group createNewBook";
    }
    if(removeSuccess) {
      return <Redirect to="/giveaway"/>
    }
    console.log(removeSuccess)
    return (
      <div className="MyStore">
        <div className="wrapperStore">
          <MyProfile />
          <div className="container">
            <div className="myOption">
              {
                this.displayButton()
              }
              <Search
                type="text"
                placeholder="để làm cảnh chứ chả có tác dụng cmm gì đâu "
                style={{ width: 350 }}
              />
            </div>
            <form onSubmit={this.onSubmit} className={classNameCreate}>
              <input className="form-control" onChange={this.onChangeInput} value={name} type="text" placeholder="name" name="name" required />
              <input className="form-control" onChange={this.onChangeInput} value={author} type="text" placeholder="author" name="author" required />
              <input className="form-control" onChange={this.onChangeInput} value={type} type="text" placeholder="type" name="type" required />
              <button className="btn btn-secondary"> Add </button>
            </form>
            <div className="row">
              {
                myBook.length ? myBook.map((ele, index) => (
                  <EachBook onClickRemove={this.onClickRemove(ele)} userCurrent={IduserCurrent} item={ele} key={index} />
                )) : <h3>When you are nothing at all </h3>
              }
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default myStore;