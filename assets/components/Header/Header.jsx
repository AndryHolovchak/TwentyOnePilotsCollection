import "./header.less";
import React, { Component } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap-grid.min.css";
import { TabSwitcher } from "../TabSwitcher/TabSwitcher.jsx";

function Header(props) {
  return (
    <header className="header">
      <div className="container-xl">
        <div className="row header__row">
          <div className="col d-flex align-items-center header__inner">
            <img
              className="header__logo"
              src="assets/img/logo.png"
              width="32px"
              alt="|-/"
            />
            <TabSwitcher
              buttonsContents={[<span>Albums</span>, <span>Videos</span>]}
              tabsSystem={props.tabsSystem}
            ></TabSwitcher>
          </div>
        </div>
      </div>
    </header>
  );
}

export { Header };
