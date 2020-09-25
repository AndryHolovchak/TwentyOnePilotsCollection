import React, { Component } from "react";
import { Album } from "../Album/Album.jsx";
import "./albumsCollection.less";

class AlbumsCollection extends Component {
  static albumIds = ["0", "1", "2", "3", "4"];
  render() {
    return (
      <div className="albums-collection">
        <div className="container-fluid">
          <div className="row albums-collection__row">
            {AlbumsCollection.albumIds.map((id) => (
              <div key={id} className="col-12 d-flex justify-content-center">
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
