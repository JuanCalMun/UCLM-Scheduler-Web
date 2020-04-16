import React, { Component } from "react";
import Axios from "axios";
import "./styles/SchedulerGroupsList.css";

class SubjectGroupsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
    };
  }

  componentDidMount() {
    if (this.state.groups.length === 0) {
      Axios.get(
        "http://localhost:8080/api/v1/shifts/subject/" + this.props.subjectId
      ).then((response) => {
        const shifts = response.data;
        const groupList = Array.from(
          shifts.reduce(
            (accumulator, shift) => accumulator.add(shift.subjectGroupId),
            new Set()
          )
        );
        const groups = groupList.map((groupId) => ({
          id: groupId,
          shifts: shifts.filter((shift) => shift.subjectGroupId === groupId),
        }));
        this.setState({ groups });
      });
    }
  }

  render() {
    console.log(this.state);
    return (
      <div className="subject-group-list margin-left-list">
        {this.state.groups.map((group) => (
          <span className="list-item is-clipped clickable">
            {group.id} -
            <p>
              Teoria{" "}
              {group.shifts
                .filter((shift) => shift.lessonType === 1)
                .map((shift) => shift.room)}
            </p>
            <p>
              Laboratorio{" "}
              {group.shifts
                .filter((shift) => shift.lessonType === 2)
                .map((shift) => shift.room)}
            </p>
            {group.id}
          </span>
        ))}
      </div>
    );
  }
}

export default SubjectGroupsList;
