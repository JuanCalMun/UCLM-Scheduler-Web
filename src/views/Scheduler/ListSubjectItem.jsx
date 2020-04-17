import React, { Component } from "react";
import PropTypes from "prop-types";
import { SUBJECT_TYPES_STYLES } from "../constants";
import SubjectGroupsList from "./SubjectGroupsList";

class ListSubjectItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
      isClickable: true,
    };
    this.handleSelectGroup = this.handleSelectGroup.bind(this);
  }

  handleOnClick(isExpanded) {
    if (this.state.isClickable) {
      this.setState({ isExpanded });
    }
  }

  handleSelectGroup(props) {
    this.setState({ isExpanded: false, isClickable: false });
    this.props.onSelect(props);
  }

  render() {
    return (
      <div>
        <span
          className={
            "list-item is-clipped " +
            (this.state.isClickable ? " clickable " : " selected ")
          }
          onClick={() => this.handleOnClick(!this.state.isExpanded)}
        >
          {this.props.subject.year} - {this.props.subject.name}
          <div
            className={
              "tag is-light is-rounded is-pulled-right " +
              SUBJECT_TYPES_STYLES[this.props.subject.type]
            }
          >
            {this.props.subject.type.replace("Específica de ", "")}
          </div>
        </span>
        {this.state.isExpanded && (
          <SubjectGroupsList
            subjectId={this.props.subject.id}
            onSelect={this.handleSelectGroup}
          />
        )}
      </div>
    );
  }
}

ListSubjectItem.propTypes = {
  onSubjecSelected: PropTypes.func,
};

export default ListSubjectItem;
