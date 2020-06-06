import React, { PureComponent } from 'react';
import './ViewBook.css'
class ViewProduct extends PureComponent {
  render() {
    return (
      <div className="container">
        <div className="ViewBook">
          <div className="wrapper">
            <div>
              <img
                src="https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-9/73244435_2997608627131456_2957342681333760000_n.jpg?_nc_cat=108&_nc_sid=85a577&_nc_ohc=G-KGxZGnds0AX8twITo&_nc_ht=scontent.fhan2-3.fna&oh=67c0862a7d6d6d1eef1bff12a6ef85f4&oe=5EFE8FBC" 
                alt="img"/>
            </div>
            <div className="infor">
              <div className="wrap-infor">
                <h3 className="title">Conan</h3>
                <p className="author">Aoyama Ghoso</p>
              </div>
              <div className="btn btn-primary">
                Mua ko em
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewProduct;