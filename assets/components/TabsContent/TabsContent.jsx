import React, { Component } from "react";
import ReactDOM from "react-dom";
import { useTabsSystemListener } from "../../js/hooks/useTabsSystemListener.jsx";
import "./tabsContent.less";

function TabsContent({ children, tabsSystem }) {
  let getWrappedChildren = () => {
    return children.map((children, i) => {
      let wrapClassName = `tabs-content__item-wrap`;
      if (tabsSystem.activeTabIndex === i) {
        wrapClassName += " tabs-content__item-wrap--active";
      }
      return (
        <div key={i} className={wrapClassName}>
          {children}
        </div>
      );
    });
  };
  useTabsSystemListener(tabsSystem);

  return <div className="tabs-content">{getWrappedChildren()}</div>;
}

export { TabsContent };
