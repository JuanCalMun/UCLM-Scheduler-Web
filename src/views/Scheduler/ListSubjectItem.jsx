import React, { Component } from "react";
import PropTypes from "prop-types";
import { SUBJECT_TYPES_STYLES } from "../constants";
import SubjectGroupsList from "./SubjectGroupsList";

class ListSubjectItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
    };
  }

  handleOnClick(isExpanded) {
    this.setState({ isExpanded });
  }

  render() {
    return (
      <div>
        <span
          className="list-item is-clipped clickable"
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
          <SubjectGroupsList subjectId={this.props.subject.id} />
        )}
      </div>
    );
  }
}

ListSubjectItem.propTypes = {
  onSubjecSelected: PropTypes.func,
};

export default ListSubjectItem;
