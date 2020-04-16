import React from "react";
import { Component } from "react";
import SchedulerFilter from "./SchedulerFilter";
import Axios from "axios";
import SchedulerGroupsList from "./SchedulerGroupsList";

class Scheduler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: [],
      filteredSubjects: null,
    };
  }

  componentDidMount() {
    Axios.get("http://localhost:8080/api/v1/subjects").then((response) => {
      this.setState({ subjects: response.data });
    });
  }

  handleFilterSubmit(filteredSubjects) {
    console.log(filteredSubjects);
    this.setState({ filteredSubjects });
  }

  render() {
    return (
      <div className="scheduler">
        <p className="uclm-title">Planificador de horarios</p>
        <SchedulerFilter
          subjects={this.state.subjects}
          onSubmit={(filteredSubjects) =>
            this.handleFilterSubmit(filteredSubjects)
          }
        />
        <div className="columns">
          <div className="column is-one-third">
            <SchedulerGroupsList
              subjects={
                this.state.filteredSubjects 
                  ? this.state.filteredSubjects
                  : this.state.subjects
              }
            />
          </div>
          <div className="column">
            <div className="shceduler-diagram"></div>
          </div>
        </div>
        <div className="shceduler-selected-groups"></div>
      </div>
    );
  }
}

export default Scheduler;
