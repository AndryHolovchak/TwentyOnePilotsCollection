import React, { Component } from "react";
import ReactDOM from "react-dom";
import { useTabsSystemListener } from "../../js/hooks/useTabsSystemListener.jsx";
import "./tabSwitcher.less";

function TabSwitcher(props) {
  let handleChildClick = (childIndex) => {
    props.tabsSystem.activeTabIndex = childIndex;
  };
  let generateButtons = () => {
    return props.buttonsContents.map((content, i) => {
      let className = "tabSwitcher__button";
      if (props.tabsSystem.activeTabIndex === i) {
        className += " tabSwitcher__button--active";
      }
      return (
        <div
          key={i}
          onClick={handleChildClick.bind(this, i)}
          className={className}
        >
          {content}
        </div>
      );
    });
  };
  useTabsSystemListener(props.tabsSystem);
  return (
    <div className="tab-switcher">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="tab-switcher__buttons-container">
              {generateButtons()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export { TabSwitcher };
