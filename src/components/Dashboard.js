import React, { Component } from "react";

import classnames from "classnames";
import Loading from "./Loading";
import Panel from "./Panel";


const data = [
  {
    id: 1,
    label: "Total Interviews",
    value: 6
  },
  {
    id: 2,
    label: "Least Popular Time Slot",
    value: "1pm"
  },
  {
    id: 3,
    label: "Most Popular Day",
    value: "Wednesday"
  },
  {
    id: 4,
    label: "Interviews Per Day",
    value: "2.3"
  }
];

class Dashboard extends Component {
  state = { 
    loading: false,
    focused: null 
  };

  // The binding of 'this' here is not dynamic, so will not work.  The binding is not dynamic; it is is based on where the function is declared.  Only if we pass an arrow function within the prop, will an instance method like this work.
  selectPanel(id) {
    this.setState(previousState => ({
     focused: previousState.focused !== null ? null : id
    }));
   }

  // It must be an arrow function because of how they handle this context. Arrow functions are designed to alter this behaviour in a specific way.
  //  selectPanel = id => {
  //    this.setState({
  //      focused: id
  //    });
  //  };

  render() {
    const dashboardClasses = classnames("dashboard", {
      "dashboard--focused": this.state.focused
    });

    if (this.state.loading) {
      return <Loading />;
    }

    const panels = data
    .filter(panel => 
      this.state.focused === null || this.state.focused === panel.id
    )
    .map(panel => (
      <Panel
        key={panel.id}
        id={panel.id}
        label={panel.label}
        value={panel.value}
        onSelect={() => this.selectPanel(panel.id)}
      />
    ));

    return <main className={dashboardClasses}>{panels}</main>;
  }
}

export default Dashboard;
