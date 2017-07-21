import React from 'react'
import {NavigationView, SplitViewCommand} from 'react-uwp'

const navigationTopNodes = [
  <SplitViewCommand label="编写周报" icon={"QuickNote"} />,
  <SplitViewCommand label="查看周报" icon={"CalendarWeek"} />
];

const navigationBottomNode = [
  <SplitViewCommand label="设置" icon={"Settings"} />,
  <SplitViewCommand label="帮助" icon={"Help"} />
];

export default props => <NavigationView className="full-size"
    pageTitle="WEEPORT"
    displayMode="overlay"
    autoResize={false}
    initWidth={0}
    navigationTopNodes={navigationTopNodes}
    navigationBottomNodes={navigationBottomNode}
    focusNavigationNodeIndex={3}
  >
    <div className="content-container">
      <div className="content">
        {props.children}
      </div>
    </div>
</NavigationView>