import React, { Component } from "react";
import { Album } from "../Album/Album.jsx";
import "./albumsCollection.less";

class AlbumsCollection extends Component {
  static albumIds = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
  render() {
    return (
      <div className="albums-collection">
        <div className="container-fluid">
          <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 albums-collection__row">
            {AlbumsCollection.albumIds.map((id) => (
              // <div key={id} className="col-12 d-flex justify-content-center">
              <div key={id} className="col d-flex justify-content-center">
                <Album albumId={id}></Album>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export { AlbumsCollection };
