import "@babel/polyfill";
import "./homePage.less";
import React, { Component } from "react";
import { Header } from "../Header/Header.jsx";
import { TabsSystem } from "../../js/helpers/TabsSystem.js";
import { TabsContent } from "../TabsContent/TabsContent.jsx";
import { AlbumsCollection } from "../AlbumsCollection/AlbumsCollection.jsx";
import { Player } from "../Player/Player.jsx";
import { VideoCollection } from "../VideoCollection/VideoCollection.jsx";
import { instance as mediaSessionManager } from "../../js/helpers/MediaSessionManager.js";

if ("serviceWorker" in navigator) {
  console.log("CLIENT: service worker registration in progress.");
  navigator.serviceWorker.register("../../../ServiceWorker.js").then(
    function () {
      console.log("CLIENT: service worker registration complete.");
    },
    function () {
      console.log("CLIENT: service worker registration failure.");
    }
  );
} else {
  console.log("CLIENT: service worker is not supported.");
}

class HomePage extends Component {
  constructor() {
    super();
    this.tabsSystem = new TabsSystem(2);
  }

  render() {
    return (
      <>
        <Header tabsSystem={this.tabsSystem}></Header>
        <TabsContent tabsSystem={this.tabsSystem}>
          <AlbumsCollection></AlbumsCollection>
          <VideoCollection></VideoCollection>
        </TabsContent>
        <Player></Player>
      </>
    );
  }
}

export { HomePage };
