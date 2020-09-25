import "@babel/polyfill";
import "../style/home-page.less";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Header } from "../components/Header/Header.jsx";
import { TabsSystem } from "./helpers/TabsSystem";
import { TabsContent } from "../components/TabsContent/TabsContent.jsx";
import { Album } from "../components/Album/Album.jsx";
import { AlbumsCollection } from "../components/AlbumsCollection/AlbumsCollection.jsx";
import { Player } from "../components/Player/Player.jsx";
import { VideoCollection } from "../components/VideoCollection/VideoCollection.jsx";

class HomePage extends Component {
  constructor() {
    super();
    this.tabsSystem = new TabsSystem(2);
  }

  render() {
    return (
      <>
        <Header tabsSystem={this.tabsSystem}></Header>
        <TabsContent
          tabsSystem={this.tabsSystem}
          className="root__main-content"
        >
          <AlbumsCollection></AlbumsCollection>
          <VideoCollection></VideoCollection>
        </TabsContent>
        <Player></Player>
      </>
    );
  }
}

ReactDOM.render(<HomePage></HomePage>, document.getElementById("root"));
