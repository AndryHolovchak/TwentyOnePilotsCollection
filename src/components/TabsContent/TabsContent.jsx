import React, { Component, useRef } from "react";
import ReactDOM from "react-dom";
import "./tabsContent.less";
import { useTabsSystemListener } from "../../js/hooks/useTabsSystemListener.jsx";

class TabsContent extends Component {
  constructor(props) {
    super(props);
    this.nodeRef = React.createRef(null);
    this.scrollYPositions = []; // scroll positions for each tab
    this.handleActiveTabIndexChange = this.handleActiveTabIndexChange.bind(
      this
    );
    this.props.tabsSystem.addActiveTabIndexListener(
      this.handleActiveTabIndexChange
    );
  }

  handleActiveTabIndexChange(prevTabIndex) {
    if (prevTabIndex != -1 && this.nodeRef.current) {
      this.scrollYPositions[prevTabIndex] = this.nodeRef.current.scrollTop;
    }
    this.forceUpdate();
  }

  getWrappedChildren() {
    return this.props.children.map((children, i) => {
      let className = "tabs-content__item-wrap";
      if (this.props.tabsSystem.activeTabIndex === i) {
        className += " tabs-content__item-wrap--active";
      }
      return (
        <div key={i} className={className}>
          {children}
        </div>
      );
    });
  }

  componentWillUnmount() {
    this.props.tabsSystem.removeActiveTabIndexListener(
      this.handleActiveTabIndexChange
    );
  }

  render() {
    let childs = this.getWrappedChildren();
    if (this.nodeRef.current) {
      //Here we return the scroll to its position for a specific tab
      this.nodeRef.current.scrollTop =
        this.scrollYPositions[this.props.tabsSystem.activeTabIndex] || 0;
    }
    return (
      <div ref={this.nodeRef} className="tabs-content">
        {childs}
      </div>
    );
  }
}
export { TabsContent };
