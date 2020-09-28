import React, { useRef } from "react";
import ReactDOM from "react-dom";
import "./tabsContent.less";
import { useTabsSystemListener } from "../../js/hooks/useTabsSystemListener.jsx";

function TabsContent({ children, tabsSystem }) {
  const nodeRef = useRef(null);
  useTabsSystemListener(tabsSystem);

  let getWrappedChildren = () => {
    return children.map((children, i) => {
      let className = "tabs-content__item-wrap";
      if (tabsSystem.activeTabIndex === i) {
        className += " tabs-content__item-wrap--active";
      }
      return (
        <div key={i} className={className}>
          {children}
        </div>
      );
    });
  };

  let childs = getWrappedChildren();

  if (nodeRef.current) {
    nodeRef.current.scrollTop = 0;
  }

  return (
    <div ref={nodeRef} className="tabs-content">
      {childs}
    </div>
  );
}
export { TabsContent };
