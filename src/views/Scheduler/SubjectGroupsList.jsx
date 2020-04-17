import React, { Component } from "react";
import Axios from "axios";
import "./styles/SchedulerGroupsList.css";
import ListGroupItem from "./ListGroupItem";

class SubjectGroupsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
    };
    this.handleSelectItem = this.handleSelectItem.bind(this);
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

  handleSelectItem(groupId) {
    const selectedGroup = this.state.groups.find(
      (group) => group.id === groupId
    );
    const response = selectedGroup.shifts.reduce(
      (accumulator, shift) =>
        accumulator.concat({
          subject: selectedGroup.shifts[0].subjectId,
          group: selectedGroup.shifts[0].subjectGroupId,
          groupCode: selectedGroup.shifts[0].subjectGroupCode,
          weekday: shift.weekday,
          shifts: shift.timeSlot,
          lessonType: shift.lessonType,
          room: shift.room,
        }),
      []
    );
    this.props.onSelect(response);
  }

  render() {
    return (
      <div className="subject-group-list margin-left-list">
        {this.state.groups.map((group) => (
          <ListGroupItem
            key={group.id}
            group={group}
            onSelect={this.handleSelectItem}
          />
        ))}
      </div>
    );
  }
}

export default SubjectGroupsList;
