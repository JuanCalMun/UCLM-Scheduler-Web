import React from "react";
import { SUBJECT_TYPES_STYLES } from "../constants";
import SubjectGroupsList from "./SubjectGroupsList";

const ListSubjectItem = ({
  subject,
  isExpanded,
  isClickable,
  onSelectGroup,
  onSelectSubject,
}) => {
  const handleOnClick = () => {
    if (isClickable) {
      onSelectSubject(subject);
    }
  };

  const handleOnSelectGroup = (shifts) => {
    onSelectGroup(shifts);
  };

  return (
    <div>
      <span
        className={
          "list-item is-clipped " +
          (isClickable ? " clickable " : " selected ") +
          (isExpanded && " is-expanded ")
        }
        onClick={() => handleOnClick()}
      >
        {subject.year} - {subject.name}
        <div
          className={
            "tag is-light is-rounded is-pulled-right " +
            SUBJECT_TYPES_STYLES[subject.type]
          }
        >
          {subject.type.replace("Específica de ", "")}
        </div>
      </span>
      {isExpanded && (
        <SubjectGroupsList
          subjectId={subject.id}
          onSelect={(shifts) => handleOnSelectGroup(shifts)}
        />
      )}
    </div>
  );
};

export default ListSubjectItem;
